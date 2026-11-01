export async function getUsuarios() {
  const response = await fetch("/api/usuarios");
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error ?? "No se pudieron obtener los usuarios");
  }

  return result.data;
}

export async function getUsuario(id: string) {
  const response = await fetch(`/api/usuarios/${id}`);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error ?? "No se pudo obtener el usuario");
  }

  return result.data;
}

export async function createUsuario(data: unknown) {
  const response = await fetch("/api/usuarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error ?? "No se pudo crear el usuario");
  }

  return result.data;
}

export async function updateUsuario(
  id: string,
  data: unknown
) {
  const response = await fetch(`/api/usuarios/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error ?? "No se pudo actualizar el usuario");
  }

  return result.data;
}

export async function deleteUsuario(id: string) {
  const response = await fetch(`/api/usuarios/${id}`, {
    method: "DELETE",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error ?? "No se pudo eliminar el usuario");
  }

  return result.data;
}