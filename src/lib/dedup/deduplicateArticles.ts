import { embedText } from './embedText';
import { cosineSimilarity } from './similarity';

const DUPLICATE_THRESHOLD = 0.85;

type ArticleInput = {
  title: string;
  content: string;
};

export async function deduplicateArticles(
  articles: ArticleInput[]
): Promise<ArticleInput[]> {
  console.log(`[DEDUP] 🔎 Deduplicating ${articles.length} articles`);

  const embeddings: number[][] = [];
  const kept: ArticleInput[] = [];

  for (const article of articles) {
    const emb = await embedText(article.content);
    let isDuplicate = false;

    for (let i = 0; i < embeddings.length; i++) {
      const sim = cosineSimilarity(emb, embeddings[i]);
      if (sim >= DUPLICATE_THRESHOLD) {
        isDuplicate = true;
        break;
      }
    }

    if (!isDuplicate) {
      embeddings.push(emb);
      kept.push(article);
    }
  }

  console.log(
    `[DEDUP] ✅ Reduced ${articles.length} → ${kept.length}`
  );

  return kept;
}
