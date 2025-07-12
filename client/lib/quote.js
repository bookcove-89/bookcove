const url = process.env.EXPO_PUBLIC_QUOTE_URL;

export const getQuote = async () => {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || `HTTP error! status ${res.status}`);
  }

  return await res.json();
}