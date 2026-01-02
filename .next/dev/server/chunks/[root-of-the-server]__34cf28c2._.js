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
const client = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__OpenAI__as__default$3e$__["default"]({
    apiKey: process.env.OPENAI_API_KEY
});
async function callLLM(prompt) {
    const res = await client.chat.completions.create({
        model: 'gpt-4.1',
        messages: [
            {
                role: 'user',
                content: prompt
            }
        ],
        temperature: 0.3
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
"[project]/src/lib/research/queryGenerator.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateQueriesForDriver",
    ()=>generateQueriesForDriver
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$llm$2f$callLLM$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/llm/callLLM.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prompts$2f$loadPrompts$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prompts/loadPrompts.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prompts$2f$schemas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prompts/schemas.ts [app-route] (ecmascript)");
;
;
;
const EXPECTED_COUNT = 12;
async function generateQueriesForDriver({ companyContext, metric, driver }) {
    const prompts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prompts$2f$loadPrompts$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadPrompts"])();
    const instructions = prompts.PROMPT_BUILDER_INSTRUCTIONS;
    const prompt = `
${instructions}

You are generating SEARCH QUERIES for an AI search engine (Brave).

Each query MUST describe a REAL-WORLD EXTERNAL EVENT.

STRICT RULES:
- Generate EXACTLY ${EXPECTED_COUNT} queries
- Each query must be 10–15 words
- Mention REAL companies, operators, facilities, or infrastructure
- Focus on EXTERNAL signals only
- No placeholders
- No numbering
- No explanations
- No generic language

Company Context:
${companyContext}

Metric:
${metric}

Driver:
${driver}

OUTPUT FORMAT (STRICT JSON ONLY):
${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prompts$2f$schemas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QUERY_GENERATION_SCHEMA"]}
`.trim();
    const raw = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$llm$2f$callLLM$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["callLLM"])(prompt);
    let parsed;
    try {
        parsed = JSON.parse(raw);
    } catch  {
        throw new Error('Query generation failed: invalid JSON');
    }
    const queries = Array.isArray(parsed?.queries) ? parsed.queries : [];
    const cleaned = queries.filter((q)=>typeof q === 'string').map((q)=>q.trim()).filter((q)=>q.split(' ').length >= 10);
    if (cleaned.length !== EXPECTED_COUNT) {
        throw new Error(`Query generation failed: expected ${EXPECTED_COUNT}, got ${cleaned.length}`);
    }
    return cleaned;
}
}),
"[project]/src/lib/research/startCompanyResearch.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "startCompanyResearch",
    ()=>startCompanyResearch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$research$2f$queryGenerator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/research/queryGenerator.ts [app-route] (ecmascript)");
;
async function startCompanyResearch({ companyId, companyContext, drivers, metric }) {
    const result = {};
    for (const driver of drivers){
        const queries = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$research$2f$queryGenerator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateQueriesForDriver"])({
            companyContext,
            metric,
            driver
        });
        result[driver] = queries;
    }
    // 🔌 INTEGRATE WITH YOUR EXISTING PIPELINE HERE
    // Examples:
    // - save to DB
    // - enqueue to worker
    // - trigger search jobs
    return {
        companyId,
        queries: result
    };
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
        // 1️⃣ Fetch company context
        const { data: company } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabaseAdmin"].from('companies').select('company_context').eq('id', companyId).single();
        // 2️⃣ Fetch drivers
        const { data: driversData } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabaseAdmin"].from('drivers').select('driver').eq('company_id', companyId);
        if (!company || !driversData?.length) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Company context or drivers missing'
            }, {
                status: 400
            });
        }
        // 3️⃣ Start research
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$research$2f$startCompanyResearch$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["startCompanyResearch"])({
            companyId,
            companyContext: company.company_context,
            drivers: driversData.map((d)=>d.driver),
            metric: 'Revenue Growth'
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true
        });
    } catch (err) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: err.message || 'Failed to start research'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__34cf28c2._.js.map