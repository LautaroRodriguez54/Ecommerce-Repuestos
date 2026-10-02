export async function getProductos() {
  const response = await fetch("/api/productos");

  if (!response.ok) {
    throw new Error("No se pudieron obtener los productos");
  }

  const result = await response.json();

  return result.data;
}

export async function getProducto(id: string) {
  const response = await fetch(`/api/productos/${id}`);

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error ?? "No se pudo obtener el producto");
  }

  return result.data;
}

export async function createProducto(data: unknown) {
  const response = await fetch("/api/productos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error ?? "No se pudo crear el producto");
  }

  return result.data;
}

export async function updateProducto(
  id: string,
  data: unknown
) {
  const response = await fetch(`/api/productos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error ?? "No se pudo actualizar el producto");
  }

  return result.data;
}

export async function deleteProducto(id: string) {
  const response = await fetch(`/api/productos/${id}`, {
    method: "DELETE",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error ?? "No se pudo eliminar el producto");
  }

  return result.data;
}