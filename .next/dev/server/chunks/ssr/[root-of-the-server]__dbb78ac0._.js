module.exports = [
"[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/app/manager/companies/[id]/edit/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

const saveAll = async ()=>{
    setSaving(true);
    setError(null);
    try {
        const res = await fetch(`/api/manager/companies/${companyId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                company_context: companyContext,
                drivers
            })
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.error || 'Save failed');
        }
        // ✅ Redirect ONLY after successful save
        router.push('/manager/dashboard');
    } catch (err) {
        setError(err.message);
    } finally{
        setSaving(false);
    }
};
}),
"[project]/src/app/manager/companies/[id]/edit/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/manager/companies/[id]/edit/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__dbb78ac0._.js.map