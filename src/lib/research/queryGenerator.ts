import { callLLM } from '@/lib/llm/callLLM';
import { loadPrompts } from '@/lib/prompts/loadPrompts';
import { QUERY_GENERATION_SCHEMA } from '@/lib/prompts/schemas';
import { safeJsonParse } from '@/lib/llm/safeJsonParse';

const EXPECTED_QUERY_COUNT = 12;
const MAX_ATTEMPTS = 3;

/**
 * Generic structural decomposition applied to ALL drivers.
 * This avoids driver hardcoding and guarantees query diversity.
 */
function structuralDecomposition(): string {
  return `
You MUST decompose the driver into DISTINCT real-world external-event categories.

Generate queries across DIFFERENT dimensions such as (examples only):
- company expansion announcements
- infrastructure buildouts
- regulatory or government actions
- capital expenditure disclosures
- long-term contracts or pre-commitments
- regional or geographic expansion
- supply chain investments
- mergers, acquisitions, or joint ventures
- technology or capacity upgrades
- utility, power, or energy infrastructure
- public filings or earnings disclosures
- industry partnerships or alliances

RULES:
- Each query must represent a DISTINCT real-world event
- Do NOT repeat companies unless the event is materially different
- Do NOT merge multiple events into one query
- Do NOT generate abstract or generic statements
`;
}

export async function generateQueriesForDriver({
  companyContext,
  metric,
  driver,
}: {
  companyContext: string;
  metric: string;
  driver: string;
}): Promise<string[]> {
  console.log(`\n[QUERY] ▶ Generating queries for driver: "${driver}"`);

  const prompts = loadPrompts();
  const instructions = prompts.PROMPT_BUILDER_INSTRUCTIONS;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    console.log(`[QUERY] Attempt ${attempt}/${MAX_ATTEMPTS}`);

    const prompt = `
${instructions}

You are generating SEARCH QUERIES for an AI search engine (Brave).

Each query MUST describe a REAL-WORLD EXTERNAL EVENT.

STRICT RULES (NON-NEGOTIABLE):
- Generate EXACTLY ${EXPECTED_QUERY_COUNT} queries
- Each query must be 10–15 words
- Mention REAL companies, operators, facilities, or infrastructure
- Focus on EXTERNAL signals only
- No placeholders
- No numbering
- No explanations
- Queries must represent DISTINCT events

Company Context:
${companyContext}

Target Metric:
${metric}

Driver:
${driver}

${structuralDecomposition()}

OUTPUT FORMAT (STRICT JSON ONLY):
${QUERY_GENERATION_SCHEMA}
`.trim();

    // 1️⃣ Call LLM
    const raw = await callLLM(prompt);

    // 2️⃣ Safe JSON parse (handles ```json fences)
    const parsed = safeJsonParse(raw);

    const queries: string[] = Array.isArray(parsed?.queries)
      ? parsed.queries
      : [];

    // 3️⃣ Clean + validate
    const cleaned = queries
      .filter((q) => typeof q === 'string')
      .map((q) => q.trim())
      .filter((q) => q.split(' ').length >= 10);

    console.log(
      `[QUERY] Generated ${cleaned.length}/${EXPECTED_QUERY_COUNT} valid queries`
    );

    cleaned.forEach((q, idx) => {
      console.log(`   ${idx + 1}. ${q}`);
    });

    if (cleaned.length === EXPECTED_QUERY_COUNT) {
      console.log(
        `[QUERY] ✅ Query generation successful for driver "${driver}"`
      );
      return cleaned;
    }

    console.warn(
      `⚠️ Query generation attempt ${attempt} failed for driver "${driver}". Got ${cleaned.length}/${EXPECTED_QUERY_COUNT}`
    );
  }

  // 🔴 FINAL HARD FAIL (CORRECT BEHAVIOR)
  throw new Error(
    `Driver "${driver}" failed to generate exactly ${EXPECTED_QUERY_COUNT} queries after ${MAX_ATTEMPTS} attempts`
  );
}
