import { supabaseAdmin } from '@/lib/supabase/admin';
import { evaluateArticle } from './evaluateArticle';
import { fetchArticleContent } from '@/lib/scraper/fetchArticleContent';

import { deduplicateArticles } from '@/lib/dedup/deduplicateArticles';
import { embedText } from '@/lib/dedup/embedText';
import { cosineSimilarity } from '@/lib/dedup/similarity';

/* ================= TYPES ================= */

type SearchArticle = {
  title: string;
  url: string;
};

type SearchResultsByDriver = Record<
  number,
  Record<string, SearchArticle[]>
>;

type ScrapedArticle = {
  title: string;
  url: string;
  content: string;
  driverId: number;
};

/* ================= CONFIG ================= */

const MAX_PARALLEL = 5;
const SCRAPE_TIMEOUT_MS = 15_000;
const EVAL_TIMEOUT_MS = 25_000;
const MAX_EVAL_RETRIES = 2;
const DB_BATCH_SIZE = 20;
const DB_SIMILARITY_THRESHOLD = 0.85;

/* ================= UTILS ================= */

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
  label: string
): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = setTimeout(
      () => reject(new Error(`${label} timeout (${ms}ms)`)),
      ms
    );

    promise
      .then((v) => {
        clearTimeout(t);
        resolve(v);
      })
      .catch((e) => {
        clearTimeout(t);
        reject(e);
      });
  });
}

/* ================= OPENAI SAFE WRAPPER ================= */

async function evaluateWithRetry(input: {
  article: string;
  context: string;
  metric: string;
  driver: string;
}) {
  let lastError: any;

  for (let attempt = 1; attempt <= MAX_EVAL_RETRIES + 1; attempt++) {
    try {
      return await withTimeout(
        evaluateArticle(input),
        EVAL_TIMEOUT_MS,
        'OpenAI'
      );
    } catch (err: any) {
      lastError = err;
      console.warn(
        `[EVAL] ⚠️ Retry ${attempt}/${MAX_EVAL_RETRIES + 1}: ${err.message}`
      );

      if (attempt <= MAX_EVAL_RETRIES) {
        await sleep(1000 * attempt);
      }
    }
  }

  throw lastError;
}

/* ================= MAIN ================= */

export async function processAndStoreArticles({
  companyId,
  context,
  metric,
  searchResults,
}: {
  companyId: number;
  context: string;
  metric: string;
  searchResults: SearchResultsByDriver;
}) {
  console.log(`\n[PROCESS] 🚀 Start for company ${companyId}`);

  let total = 0;
  let scraped = 0;
  let evaluated = 0;
  let saved = 0;
  let skipped = 0;

  const scrapedArticles: ScrapedArticle[] = [];

  /* --------------------------------------------------
     1️⃣ SCRAPE ARTICLES (NO OpenAI YET)
  -------------------------------------------------- */

  const scrapeTasks: (() => Promise<void>)[] = [];

  for (const [driverIdStr, queries] of Object.entries(searchResults)) {
    const driverId = Number(driverIdStr);

    for (const articles of Object.values(queries)) {
      for (const article of articles) {
        scrapeTasks.push(async () => {
          total++;

          try {
            console.log(`[SCRAPE] 🌐 ${article.title}`);

            const content = await withTimeout(
              fetchArticleContent(article.url),
              SCRAPE_TIMEOUT_MS,
              'Scrape'
            );

            if (!content || content.length < 500) {
              skipped++;
              return;
            }

            scraped++;

            scrapedArticles.push({
              title: article.title,
              url: article.url,
              content,
              driverId,
            });
          } catch (err: any) {
            skipped++;
            console.error(
              `[SCRAPE ERROR] ❌ ${article.title}: ${err.message}`
            );
          }
        });
      }
    }
  }

  console.log(
    `[PROCESS] ⚙️ Scraping ${scrapeTasks.length} articles`
  );

  for (let i = 0; i < scrapeTasks.length; i += MAX_PARALLEL) {
    const chunk = scrapeTasks.slice(i, i + MAX_PARALLEL);
    await Promise.all(chunk.map((t) => t()));
  }

  console.log(
    `[PROCESS] ✅ Scraped ${scrapedArticles.length} articles`
  );

  /* --------------------------------------------------
     2️⃣ DEDUP CURRENT RUN (SEMANTIC)
  -------------------------------------------------- */

  console.log(`[DEDUP] 🔎 Deduplicating current batch`);

  const deduped = await deduplicateArticles(
    scrapedArticles.map((a) => ({
      title: a.title,
      content: a.content,
    }))
  );

  const dedupedArticles = scrapedArticles.filter((a) =>
    deduped.some((d) => d.content === a.content)
  );

  console.log(
    `[DEDUP] ✅ Reduced ${scrapedArticles.length} → ${dedupedArticles.length}`
  );

  /* --------------------------------------------------
     3️⃣ LOAD EXISTING ARTICLES FOR DB DEDUP
  -------------------------------------------------- */

  const { data: existing } = await supabaseAdmin
    .from('articles')
    .select('article_content')
    .eq('company_id', companyId)
    .limit(200);

  const existingEmbeddings = existing
    ? await Promise.all(
        existing.map((a) => embedText(a.article_content))
      )
    : [];

  /* --------------------------------------------------
     4️⃣ EVALUATE + STORE
  -------------------------------------------------- */

  const rowsToUpsert: any[] = [];

  for (const article of dedupedArticles) {
    evaluated++;

    const evaluation = await evaluateWithRetry({
      article: article.content,
      context,
      metric,
      driver: String(article.driverId),
    });

    console.log(
      `[EVAL] "${article.title}" → score=${evaluation.score}`
    );

    if (evaluation.score < 4) {
      skipped++;
      continue;
    }

    const embedding = await embedText(article.content);

    const isDuplicateInDB = existingEmbeddings.some(
      (e) => cosineSimilarity(e, embedding) >= DB_SIMILARITY_THRESHOLD
    );

    if (isDuplicateInDB) {
      skipped++;
      console.log(
        `[DEDUP-DB] ⛔ Skipping duplicate "${article.title}"`
      );
      continue;
    }

    rowsToUpsert.push({
      company_id: companyId,
      title: article.title,
      url: article.url,
      snippet: article.content.slice(0, 500),
      article_content: article.content,
      summary: evaluation.summary,
      score: evaluation.score,
      driver: article.driverId,
    });

    if (rowsToUpsert.length >= DB_BATCH_SIZE) {
      await flushUpsert(rowsToUpsert);
      saved += rowsToUpsert.length;
      rowsToUpsert.length = 0;
    }
  }

  if (rowsToUpsert.length > 0) {
    await flushUpsert(rowsToUpsert);
    saved += rowsToUpsert.length;
  }

  console.log(`\n[PROCESS] ✅ DONE`);
  console.log(
    `[STATS] Total=${total}, Scraped=${scraped}, Evaluated=${evaluated}, Saved=${saved}, Skipped=${skipped}`
  );
}

/* ================= DB ================= */

async function flushUpsert(rows: any[]) {
  console.log(`[DB] 💾 Upserting ${rows.length} articles`);

  const { error } = await supabaseAdmin
    .from('articles')
    .upsert(rows, {
      onConflict: 'company_id,driver,url',
    });

  if (error) {
    console.error('[DB] ❌ Upsert failed', error);
  } else {
    console.log('[DB] ✅ Upsert success');
  }
}
