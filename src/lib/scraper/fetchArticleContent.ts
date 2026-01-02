import { Readable } from 'stream';

const MAX_BYTES = 1_500_000; // 1.5MB hard stop
const FETCH_TIMEOUT = 12_000;

export async function fetchArticleContent(
  url: string
): Promise<string | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; ResearchBot/1.0)',
      },
    });

    if (!res.ok || !res.body) return null;

    const reader = res.body.getReader();
    let received = 0;
    let text = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      received += value.length;
      if (received > MAX_BYTES) {
        console.warn('[SCRAPER] ⛔ HTML too large, skipping');
        return null;
      }

      text += Buffer.from(value).toString('utf-8');
    }

    // 🔥 CRITICAL: NO DOM PARSING
    const cleaned = text
      .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    return cleaned.length > 800 ? cleaned : null;
  } catch (err: any) {
    if (err.name === 'AbortError') {
      console.warn('[SCRAPER] ⏰ Fetch aborted');
      return null;
    }

    console.error('[SCRAPER] ❌ Failed:', err.message);
    return null;
  } finally {
    clearTimeout(timeout);
  }
}
