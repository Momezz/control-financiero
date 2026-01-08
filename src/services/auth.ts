const URI = process.env.NEXT_PUBLIC_BASE_URL

interface LoginResponse {
  accessToken: string;
}

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const res = await fetch(`${URI}/auth/local/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Invalid credentials");
  return res.json();
}

export async function getProfile(accessToken: string) {
  const res = await fetch(`${URI}/auth/local/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
}
