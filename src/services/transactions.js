const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const createTransaction = async (publication) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(publication),
  };
  const res = await fetch(`${BASE_URL}/api/financial-item`, options);
  const result = await res.json();
  return result;
};
