import { searchBrave } from '@/lib/search/braveClient';

/**
 * Normalized Brave article shape
 */
type SearchArticle = {
  title: string;
  url: string;
  description?: string;
  source?: string;
  published_date?: string;
};

/**
 * Executes Brave search for each query of each driver
 * and returns results grouped by driver → query → articles
 */
export async function runSearch(
  queriesByDriver: Record<string, string[]>,
  days: number
): Promise<Record<string, Record<string, SearchArticle[]>>> {
  console.log(`\n[SEARCH] 🔍 Starting Brave search (recency: ${days} days)`);

  const allResults: Record<
    string,
    Record<string, SearchArticle[]>
  > = {};

  for (const [driver, queries] of Object.entries(queriesByDriver)) {
    console.log(`\n[SEARCH] ▶ Driver: "${driver}"`);

    // 🔒 Hard enforcement (should never fail if generator works)
    if (queries.length !== 12) {
      throw new Error(
        `Driver "${driver}" must have exactly 12 queries (got ${queries.length})`
      );
    }

    const driverResults: Record<string, SearchArticle[]> = {};

    for (const query of queries) {
      console.log(`[SEARCH] → Query: ${query}`);

      try {
        const results = await searchBrave(query, days);

        console.log(
          `[SEARCH] ← ${results.length} articles returned`
        );

        driverResults[query] = results;
      } catch (err) {
        console.error(
          `[SEARCH] ❌ Brave search failed for query: "${query}"`,
          err
        );

        // Fail fast — bad search means unreliable research
        throw err;
      }
    }

    allResults[driver] = driverResults;
  }

  console.log(`[SEARCH] ✅ Brave search completed`);
  return allResults;
}
