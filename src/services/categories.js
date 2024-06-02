const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const createCategory = async (category) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(category),
  };
  const res = await fetch(`${BASE_URL}/api/categories`, options);
  const result = await res.json();
  return result;
}

