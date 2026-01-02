import { supabaseAdmin } from '@/lib/supabase/admin';
import { evaluateArticle } from './evaluateArticle';
import { fetchArticleContent } from '@/lib/scraper/fetchArticleContent';

/* ================= TYPES ================= */

type SearchArticle = {
  title: string;
  url: string;
};

type SearchResultsByDriver = Record<
  number,
  Record<string, SearchArticle[]>
>;

/* ================= CONFIG ================= */

const MAX_PARALLEL = 5;
const SCRAPE_TIMEOUT_MS = 15_000;
const EVAL_TIMEOUT_MS = 25_000;
const MAX_EVAL_RETRIES = 2;
const DB_BATCH_SIZE = 20;

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

  const pendingRows: any[] = [];
  const tasks: (() => Promise<void>)[] = [];

  /* -------- Build tasks -------- */
  for (const [driverIdStr, queries] of Object.entries(searchResults)) {
    const driverId = Number(driverIdStr);

    for (const articles of Object.values(queries)) {
      for (const article of articles) {
        tasks.push(async () => {
          total++;

          try {
            console.log(`[SCRAPE] 🌐 ${article.title}`);

            const content = await withTimeout(
              fetchArticleContent(article.url),
              SCRAPE_TIMEOUT_MS,
              'Scrape'
            );

            if (!content) {
              skipped++;
              return;
            }

            scraped++;

            const evaluation = await evaluateWithRetry({
              article: content,
              context,
              metric,
              driver: String(driverId),
            });

            evaluated++;

            console.log(
              `[EVAL] "${article.title}" → score=${evaluation.score}`
            );

            if (evaluation.score < 4) {
              skipped++;
              return;
            }

            pendingRows.push({
              company_id: companyId,
              title: article.title,
              url: article.url,
              snippet: content.slice(0, 500),
              article_content: content,
              summary: evaluation.summary,
              score: evaluation.score,
              driver: driverId,
            });

            if (pendingRows.length >= DB_BATCH_SIZE) {
              console.log(
                `[DB] ⏳ Threshold reached (${pendingRows.length})`
              );
              await flushUpsert(pendingRows);
              saved += pendingRows.length;
              pendingRows.length = 0;
            }
          } catch (err: any) {
            skipped++;
            console.error(
              `[ERROR] ❌ ${article.title}: ${err.message}`
            );
          }
        });
      }
    }
  }

  /* -------- Execute in chunks -------- */
  console.log(
    `[PROCESS] ⚙️ ${tasks.length} tasks | concurrency=${MAX_PARALLEL}`
  );

  for (let i = 0; i < tasks.length; i += MAX_PARALLEL) {
    const chunk = tasks.slice(i, i + MAX_PARALLEL);
    console.log(
      `[PROCESS] ▶ Running tasks ${i + 1}–${i + chunk.length} / ${tasks.length}`
    );

    await Promise.all(chunk.map((t) => t()));

    console.log(
      `[PROCESS] ✔ Completed ${Math.min(
        i + MAX_PARALLEL,
        tasks.length
      )}/${tasks.length}`
    );
  }

  /* -------- Final DB flush -------- */
  if (pendingRows.length > 0) {
    console.log(
      `[DB] ⏳ Final flush (${pendingRows.length})`
    );
    await flushUpsert(pendingRows);
    saved += pendingRows.length;
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

