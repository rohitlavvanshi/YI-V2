export function safeJsonParse(text: string): any {
  if (!text) {
    throw new Error('Empty LLM response');
  }

  let cleaned = text.trim();

  // Remove markdown fences
  if (cleaned.startsWith('```')) {
    cleaned = cleaned
      .replace(/^```(json)?/i, '')
      .replace(/```$/, '')
      .trim();
  }

  try {
    return JSON.parse(cleaned);
  } catch {
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
