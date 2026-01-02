import { generateQueriesForDriver } from './queryGenerator';
import { runSearch } from '@/lib/search/searchExecutor';
import { processAndStoreArticles } from './processArticles';

/**
 * Driver object MUST contain both:
 * - id   → used for DB storage (bigint)
 * - name → used for LLM + search
 */
type DriverInput = {
  id: number;
  name: string;
};

export async function startCompanyResearch({
  companyId,
  companyContext,
  drivers,
  metric,
}: {
  companyId: number;
  companyContext: string;
  drivers: DriverInput[];
  metric: string;
}) {
  console.log(
    `\n[RESEARCH] 🚀 Starting research for company ${companyId}`
  );

  if (!drivers || drivers.length === 0) {
    throw new Error('[RESEARCH] No drivers provided');
  }

  /**
   * driverId → queries[]
   * (ID is the ONLY thing that flows into DB)
   */
  const queriesByDriver: Record<number, string[]> = {};

  /* --------------------------------------------------
     1️⃣ Generate queries per driver
  -------------------------------------------------- */
  console.log(`[RESEARCH] 🧩 Generating queries`);

  for (const driver of drivers) {
    console.log(
      `\n[QUERY] ▶ Generating queries for driver: "${driver.name}" (id=${driver.id})`
    );

    const queries = await generateQueriesForDriver({
      companyContext,
      metric,
      driver: driver.name, // 👈 NAME ONLY for LLM
    });

    console.log(
      `[QUERY] ✅ Generated ${queries.length}/12 valid queries`
    );

    queriesByDriver[driver.id] = queries;
  }

  /* --------------------------------------------------
     2️⃣ Execute Brave search
  -------------------------------------------------- */
  console.log(`\n[RESEARCH] 🔍 Executing Brave search`);

  const searchResults = await runSearch(
    queriesByDriver,
    30 // days
  );

  console.log(`[RESEARCH] ✅ Brave search completed`);

  /* --------------------------------------------------
     3️⃣ Evaluate + store articles
  -------------------------------------------------- */
  console.log(`\n[RESEARCH] 🧠 Evaluating and storing articles`);

  await processAndStoreArticles({
    companyId,
    context: companyContext,
    metric,
    searchResults,
  });

  console.log(
    `\n[RESEARCH] 🎉 Research completed successfully for company ${companyId}`
  );
}
