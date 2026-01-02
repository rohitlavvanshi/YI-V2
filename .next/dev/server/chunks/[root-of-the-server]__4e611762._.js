module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/supabase/admin.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabaseAdmin",
    ()=>supabaseAdmin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-route] (ecmascript) <locals>");
;
const supabaseAdmin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(("TURBOPACK compile-time value", "https://ccdutqsjidhhqhkmnmwt.supabase.co"), process.env.SUPABASE_SERVICE_ROLE_KEY);
}),
"[project]/src/lib/llm/callLLM.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "callLLM",
    ()=>callLLM
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/openai/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__OpenAI__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/openai/client.mjs [app-route] (ecmascript) <export OpenAI as default>");
;
if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is missing');
}
const client = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__OpenAI__as__default$3e$__["default"]({
    apiKey: process.env.OPENAI_API_KEY
});
async function callLLM(prompt) {
    const res = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            {
                role: 'user',
                content: prompt
            }
        ],
        temperature: 0
    });
    return res.choices[0].message.content || '';
}
}),
"[project]/src/lib/prompts/loadPrompts.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "loadPrompts",
    ()=>loadPrompts
]);
function loadPrompts() {
    return {
        PROMPT_BUILDER_INSTRUCTIONS: `
You are a senior market intelligence analyst.
Follow instructions strictly.
Never hallucinate.
`,
        ARTICLE_EVALUATION_INSTRUCTIONS: `
Focus only on external market signals.
Do not speculate.
`
    };
}
}),
"[project]/src/lib/prompts/schemas.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QUERY_GENERATION_SCHEMA",
    ()=>QUERY_GENERATION_SCHEMA
]);
const QUERY_GENERATION_SCHEMA = `
{
  "queries": [
    "string",
    "string"
  ]
}
`;
}),
"[project]/src/lib/llm/safeJsonParse.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "safeJsonParse",
    ()=>safeJsonParse
]);
function safeJsonParse(text) {
    if (!text) {
        throw new Error('Empty LLM response');
    }
    let cleaned = text.trim();
    // Remove markdown fences
    if (cleaned.startsWith('```')) {
        cleaned = cleaned.replace(/^```(json)?/i, '').replace(/```$/, '').trim();
    }
    try {
        return JSON.parse(cleaned);
    } catch  {
        // Attempt to extract JSON substring
        const start = cleaned.indexOf('{');
        const end = cleaned.lastIndexOf('}');
        if (start !== -1 && end !== -1) {
            const jsonSubstring = cleaned.slice(start, end + 1);
            return JSON.parse(jsonSubstring);
        }
        throw new Error('Invalid JSON returned by LLM');
    }
}
}),
"[project]/src/lib/research/queryGenerator.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateQueriesForDriver",
    ()=>generateQueriesForDriver
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$llm$2f$callLLM$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/llm/callLLM.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prompts$2f$loadPrompts$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prompts/loadPrompts.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prompts$2f$schemas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prompts/schemas.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$llm$2f$safeJsonParse$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/llm/safeJsonParse.ts [app-route] (ecmascript)");
;
;
;
;
const EXPECTED_QUERY_COUNT = 12;
const MAX_ATTEMPTS = 3;
/**
 * Generic structural decomposition applied to ALL drivers.
 * This avoids driver hardcoding and guarantees query diversity.
 */ function structuralDecomposition() {
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
async function generateQueriesForDriver({ companyContext, metric, driver }) {
    console.log(`\n[QUERY] ▶ Generating queries for driver: "${driver}"`);
    const prompts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prompts$2f$loadPrompts$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadPrompts"])();
    const instructions = prompts.PROMPT_BUILDER_INSTRUCTIONS;
    for(let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++){
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
${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prompts$2f$schemas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QUERY_GENERATION_SCHEMA"]}
`.trim();
        // 1️⃣ Call LLM
        const raw = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$llm$2f$callLLM$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["callLLM"])(prompt);
        // 2️⃣ Safe JSON parse (handles ```json fences)
        const parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$llm$2f$safeJsonParse$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["safeJsonParse"])(raw);
        const queries = Array.isArray(parsed?.queries) ? parsed.queries : [];
        // 3️⃣ Clean + validate
        const cleaned = queries.filter((q)=>typeof q === 'string').map((q)=>q.trim()).filter((q)=>q.split(' ').length >= 10);
        console.log(`[QUERY] Generated ${cleaned.length}/${EXPECTED_QUERY_COUNT} valid queries`);
        cleaned.forEach((q, idx)=>{
            console.log(`   ${idx + 1}. ${q}`);
        });
        if (cleaned.length === EXPECTED_QUERY_COUNT) {
            console.log(`[QUERY] ✅ Query generation successful for driver "${driver}"`);
            return cleaned;
        }
        console.warn(`⚠️ Query generation attempt ${attempt} failed for driver "${driver}". Got ${cleaned.length}/${EXPECTED_QUERY_COUNT}`);
    }
    // 🔴 FINAL HARD FAIL (CORRECT BEHAVIOR)
    throw new Error(`Driver "${driver}" failed to generate exactly ${EXPECTED_QUERY_COUNT} queries after ${MAX_ATTEMPTS} attempts`);
}
}),
"[project]/src/lib/search/braveClient.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "searchBrave",
    ()=>searchBrave
]);
async function searchBrave(query, days) {
    const apiKey = process.env.BRAVE_API_KEY;
    if (!apiKey) throw new Error('BRAVE_API_KEY missing');
    const params = new URLSearchParams({
        q: query,
        recency: days.toString()
    });
    const res = await fetch(`https://api.search.brave.com/res/v1/news/search?${params}`, {
        headers: {
            'X-Subscription-Token': apiKey,
            Accept: 'application/json'
        }
    });
    const json = await res.json();
    return json?.results || [];
}
}),
"[project]/src/lib/search/searchExecutor.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runSearch",
    ()=>runSearch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$search$2f$braveClient$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/search/braveClient.ts [app-route] (ecmascript)");
;
async function runSearch(queriesByDriver, days) {
    console.log(`\n[SEARCH] 🔍 Starting Brave search (recency: ${days} days)`);
    const allResults = {};
    for (const [driver, queries] of Object.entries(queriesByDriver)){
        console.log(`\n[SEARCH] ▶ Driver: "${driver}"`);
        // 🔒 Hard enforcement (should never fail if generator works)
        if (queries.length !== 12) {
            throw new Error(`Driver "${driver}" must have exactly 12 queries (got ${queries.length})`);
        }
        const driverResults = {};
        for (const query of queries){
            console.log(`[SEARCH] → Query: ${query}`);
            try {
                const results = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$search$2f$braveClient$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["searchBrave"])(query, days);
                console.log(`[SEARCH] ← ${results.length} articles returned`);
                driverResults[query] = results;
            } catch (err) {
                console.error(`[SEARCH] ❌ Brave search failed for query: "${query}"`, err);
                // Fail fast — bad search means unreliable research
                throw err;
            }
        }
        allResults[driver] = driverResults;
    }
    console.log(`[SEARCH] ✅ Brave search completed`);
    return allResults;
}
}),
"[project]/src/lib/research/evaluateArticle.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "evaluateArticle",
    ()=>evaluateArticle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$llm$2f$callLLM$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/llm/callLLM.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$llm$2f$safeJsonParse$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/llm/safeJsonParse.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prompts$2f$loadPrompts$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prompts/loadPrompts.ts [app-route] (ecmascript)");
;
;
;
const MAX_ARTICLE_CHARS = 8000;
const MIN_ARTICLE_CHARS = 500;
async function evaluateArticle({ article, context, metric, driver }) {
    // 🚫 Skip junk articles
    if (!article || article.length < MIN_ARTICLE_CHARS) {
        return {
            score: 1,
            summary: 'Article content unavailable or insufficient for reliable evaluation.'
        };
    }
    const prompts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prompts$2f$loadPrompts$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadPrompts"])();
    const userInstruction = prompts.ARTICLE_EVALUATION_INSTRUCTIONS || '';
    const systemPrompt = `
You are an expert equity research and market intelligence analyst.

You must evaluate the article strictly as an EXTERNAL SIGNAL.

Context:
${context}

Target Metric:
${metric}

Driver:
${driver}

Article Content:
"""
${article.slice(0, MAX_ARTICLE_CHARS)}
"""

Evaluation Rules:
- Assign a relevance score from 1 to 5
- Score reflects how strongly the article indicates movement in the metric via the driver
- Generate a concise executive summary (max 3 sentences)
- Do NOT speculate or add external knowledge
- Base judgment ONLY on the article

User Guidance:
${userInstruction}

OUTPUT FORMAT (STRICT JSON ONLY):
{
  "score": <integer 1-5>,
  "summary": "<short summary>"
}
`.trim();
    try {
        const raw = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$llm$2f$callLLM$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["callLLM"])(systemPrompt);
        const parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$llm$2f$safeJsonParse$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["safeJsonParse"])(raw);
        const score = Math.min(Math.max(Number(parsed.score) || 1, 1), 5);
        const summary = typeof parsed.summary === 'string' && parsed.summary.trim() ? parsed.summary.trim() : 'No summary returned.';
        return {
            score,
            summary
        };
    } catch (err) {
        console.error('Article evaluation failed:', err);
        // ✅ Never crash pipeline
        return {
            score: 1,
            summary: 'Article could not be reliably evaluated.'
        };
    }
}
}),
"[project]/src/lib/research/processArticles.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "processAndStoreArticles",
    ()=>processAndStoreArticles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/admin.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$research$2f$evaluateArticle$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/research/evaluateArticle.ts [app-route] (ecmascript)");
;
;
async function processAndStoreArticles({ companyId, context, metric, searchResults }) {
    console.log(`\n[PROCESS] 🧠 Starting article processing for company ${companyId}`);
    let totalArticles = 0;
    let evaluatedArticles = 0;
    let savedArticles = 0;
    let skippedArticles = 0;
    /* --------------------------------------------------
     Loop per DRIVER (driverId is numeric by design)
  -------------------------------------------------- */ for (const [driverIdStr, queriesByQuery] of Object.entries(searchResults)){
        const driverId = Number(driverIdStr);
        console.log(`\n[PROCESS] ▶ Driver ID: ${driverId}`);
        /* --------------------------------------------------
       Loop per QUERY
    -------------------------------------------------- */ for (const [query, articles] of Object.entries(queriesByQuery)){
            console.log(`[PROCESS] Query → ${articles.length} articles`);
            /* --------------------------------------------------
         Loop per ARTICLE
      -------------------------------------------------- */ for (const article of articles){
                totalArticles++;
                const rawContent = article.description?.trim() || '';
                // 🚫 Skip weak / empty content
                if (!rawContent) {
                    skippedArticles++;
                    console.log(`[SKIP] ❌ Empty content → "${article.title}"`);
                    continue;
                }
                evaluatedArticles++;
                /* ----------------------------------------------
           Evaluate article via OpenAI
        ---------------------------------------------- */ const evaluation = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$research$2f$evaluateArticle$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["evaluateArticle"])({
                    article: rawContent,
                    context,
                    metric,
                    driver: String(driverId)
                });
                console.log(`[EVALUATION] "${article.title}" → score=${evaluation.score}`);
                // 🚫 Save ONLY strong signals
                if (evaluation.score < 4) {
                    skippedArticles++;
                    console.log(`[SKIP] ⛔ Score too low (${evaluation.score})`);
                    continue;
                }
                /* ----------------------------------------------
           Persist to database
        ---------------------------------------------- */ const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabaseAdmin"].from('articles').insert({
                    company_id: companyId,
                    title: article.title,
                    url: article.url,
                    snippet: article.description || '',
                    article_content: rawContent,
                    summary: evaluation.summary,
                    score: evaluation.score,
                    driver: driverId
                });
                if (error) {
                    console.error(`[DB] ❌ Failed to save article "${article.title}"`, error);
                    continue;
                }
                savedArticles++;
                console.log(`[DB] ✅ Saved article: "${article.title}"`);
            }
        }
    }
    console.log(`\n[PROCESS] ✅ Processing completed`);
    console.log(`[PROCESS] Total: ${totalArticles}, Evaluated: ${evaluatedArticles}, Saved: ${savedArticles}, Skipped: ${skippedArticles}`);
}
}),
"[project]/src/lib/research/startCompanyResearch.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "startCompanyResearch",
    ()=>startCompanyResearch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$research$2f$queryGenerator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/research/queryGenerator.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$search$2f$searchExecutor$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/search/searchExecutor.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$research$2f$processArticles$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/research/processArticles.ts [app-route] (ecmascript)");
;
;
;
async function startCompanyResearch({ companyId, companyContext, drivers, metric }) {
    console.log(`\n[RESEARCH] 🚀 Starting research for company ${companyId}`);
    if (!drivers || drivers.length === 0) {
        throw new Error('[RESEARCH] No drivers provided');
    }
    /**
   * driverId → queries[]
   * (ID is the ONLY thing that flows into DB)
   */ const queriesByDriver = {};
    /* --------------------------------------------------
     1️⃣ Generate queries per driver
  -------------------------------------------------- */ console.log(`[RESEARCH] 🧩 Generating queries`);
    for (const driver of drivers){
        console.log(`\n[QUERY] ▶ Generating queries for driver: "${driver.name}" (id=${driver.id})`);
        const queries = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$research$2f$queryGenerator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateQueriesForDriver"])({
            companyContext,
            metric,
            driver: driver.name
        });
        console.log(`[QUERY] ✅ Generated ${queries.length}/12 valid queries`);
        queriesByDriver[driver.id] = queries;
    }
    /* --------------------------------------------------
     2️⃣ Execute Brave search
  -------------------------------------------------- */ console.log(`\n[RESEARCH] 🔍 Executing Brave search`);
    const searchResults = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$search$2f$searchExecutor$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["runSearch"])(queriesByDriver, 30 // days
    );
    console.log(`[RESEARCH] ✅ Brave search completed`);
    /* --------------------------------------------------
     3️⃣ Evaluate + store articles
  -------------------------------------------------- */ console.log(`\n[RESEARCH] 🧠 Evaluating and storing articles`);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$research$2f$processArticles$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["processAndStoreArticles"])({
        companyId,
        context: companyContext,
        metric,
        searchResults
    });
    console.log(`\n[RESEARCH] 🎉 Research completed successfully for company ${companyId}`);
}
}),
"[project]/src/app/api/manager/companies/[id]/start-research/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/admin.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$research$2f$startCompanyResearch$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/research/startCompanyResearch.ts [app-route] (ecmascript)");
;
;
;
async function POST(_req, context) {
    try {
        const { id } = await context.params;
        const companyId = Number(id);
        if (!companyId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Invalid company ID'
            }, {
                status: 400
            });
        }
        /* --------------------------------------------------
       1️⃣ Fetch company context
    -------------------------------------------------- */ const { data: company, error: companyError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabaseAdmin"].from('companies').select('company_context').eq('id', companyId).single();
        if (companyError || !company) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Company not found'
            }, {
                status: 404
            });
        }
        if (!company.company_context) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Company context is missing'
            }, {
                status: 400
            });
        }
        /* --------------------------------------------------
       2️⃣ Fetch drivers (ID + NAME)
    -------------------------------------------------- */ const { data: drivers, error: driversError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabaseAdmin"].from('drivers').select('id, driver').eq('company_id', companyId);
        if (driversError || !drivers || drivers.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'No drivers found for company'
            }, {
                status: 400
            });
        }
        /* --------------------------------------------------
       3️⃣ Start research (CORRECT SHAPE)
    -------------------------------------------------- */ await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$research$2f$startCompanyResearch$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["startCompanyResearch"])({
            companyId,
            companyContext: company.company_context,
            metric: 'Revenue Growth',
            drivers: drivers.map((d)=>({
                    id: d.id,
                    name: d.driver
                }))
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true
        });
    } catch (err) {
        console.error('Start research failed:', err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: err.message || 'Failed to start research'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__4e611762._.js.map