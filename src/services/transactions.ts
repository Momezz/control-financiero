const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const createTransaction = async (transaction) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transaction),
  };
  const res = await fetch(`${BASE_URL}/api/financial-item`, options);
  const result = await res.json();
  return result;
};
