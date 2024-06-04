const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const createCategory = async (category) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(category),
  };
  const response = await fetch(`${BASE_URL}/api/categories`, options);
  const jsonData = await response.json();
  return jsonData;
}

export const getCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/categories`);
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error(error);
  }
};
