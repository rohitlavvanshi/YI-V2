export async function searchBrave(
  query: string,
  days: number
) {
  const apiKey = process.env.BRAVE_API_KEY;
  if (!apiKey) throw new Error('BRAVE_API_KEY missing');

  const params = new URLSearchParams({
    q: query,
    recency: days.toString(),
  });

  const res = await fetch(
    `https://api.search.brave.com/res/v1/news/search?${params}`,
    {
      headers: {
        'X-Subscription-Token': apiKey,
        Accept: 'application/json',
      },
    }
  );

  const json = await res.json();
  return json?.results || [];
}
