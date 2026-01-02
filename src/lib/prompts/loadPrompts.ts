export function loadPrompts() {
  return {
    PROMPT_BUILDER_INSTRUCTIONS: `
You are a senior market intelligence analyst.
Follow instructions strictly.
Never hallucinate.
`,
    ARTICLE_EVALUATION_INSTRUCTIONS: `
Focus only on external market signals.
Do not speculate.
`,
  };
}
