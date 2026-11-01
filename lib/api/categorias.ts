export async function getCategorias() {
  const response = await fetch("/api/categorias");
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error ?? "No se pudieron obtener las categorías");
  }

  return result.data;
}

export async function getCategoria(id: string) {
  const response = await fetch(`/api/categorias/${id}`);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error ?? "No se pudo obtener la categoría");
  }

  return result.data;
}

export async function createCategoria(data: { name: string }) {
  const response = await fetch("/api/categorias", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error ?? "No se pudo crear la categoría");
  }

  return result.data;
}

export async function updateCategoria(
  id: string,
  data: { name?: string }
) {
  const response = await fetch(`/api/categorias/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error ?? "No se pudo actualizar la categoría");
  }

  return result.data;
}

export async function deleteCategoria(id: string) {
  const response = await fetch(`/api/categorias/${id}`, {
    method: "DELETE",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error ?? "No se pudo eliminar la categoría");
  }

  return result.data;
}