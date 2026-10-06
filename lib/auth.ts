export async function login(email: string, password: string) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const result = await response.json();
  
  if (!response.ok) {
    throw new Error(result.error ?? result.message ?? "No se pudo iniciar sesión");
  }

  return result.data;
}

export async function getCurrentUser() {
  const response = await fetch("/api/auth/me");

  if (!response.ok) {
    return null;
  }

  const result = await response.json();

  return result.data;
}

export async function logout() {
  const response = await fetch("/api/auth/logout", {
    method: "POST",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error ?? "No se pudo cerrar sesión");
  }

  return result.data;
}

export async function register(
  name: string,
  email: string,
  password: string
) {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error ?? result.message ?? "No se pudo registrar el usuario");
  }

  return result.data;
}