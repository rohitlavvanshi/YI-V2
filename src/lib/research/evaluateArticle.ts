import { callLLM } from '@/lib/llm/callLLM';
import { safeJsonParse } from '@/lib/llm/safeJsonParse';
import { loadPrompts } from '@/lib/prompts/loadPrompts';

const MAX_ARTICLE_CHARS = 8000;
const MIN_ARTICLE_CHARS = 500;

export async function evaluateArticle({
  article,
  context,
  metric,
  driver,
}: {
  article: string;
  context: string;
  metric: string;
  driver: string;
}) {
  // 🚫 Skip junk articles
  if (!article || article.length < MIN_ARTICLE_CHARS) {
    return {
      score: 1,
      summary:
        'Article content unavailable or insufficient for reliable evaluation.',
    };
  }

  const prompts = loadPrompts();
  const userInstruction =
    prompts.ARTICLE_EVALUATION_INSTRUCTIONS || '';

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
    const raw = await callLLM(systemPrompt);
    const parsed = safeJsonParse(raw);

    const score = Math.min(
      Math.max(Number(parsed.score) || 1, 1),
      5
    );

    const summary =
      typeof parsed.summary === 'string' && parsed.summary.trim()
        ? parsed.summary.trim()
        : 'No summary returned.';

    return { score, summary };
  } catch (err) {
    console.error('Article evaluation failed:', err);

    // ✅ Never crash pipeline
    return {
      score: 1,
      summary: 'Article could not be reliably evaluated.',
    };
  }
}
