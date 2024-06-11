const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const createUser = async (user) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  };
  const res = await fetch(`${BASE_URL}/api/users`, options);
  const result = await res.json();
  return result;
};
