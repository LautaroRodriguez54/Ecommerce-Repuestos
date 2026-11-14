
async function request<T = any>(
  url: string,
  options?: RequestInit,
  defaultError = "Error al realizar la solicitud"
): Promise<T> {
  const response = await fetch(url, options);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error ?? defaultError);
  }

  return result.data;
}

export function getProductos() {
  return request("/api/productos", undefined, "No se pudieron obtener los productos");
}

export function getProducto(id: string) {
  return request(`/api/productos/${id}`, undefined, "No se pudo obtener el producto");
}

export function createProducto(data: unknown) {
  return request("/api/productos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }, "No se pudo crear el producto");
}

export function updateProducto(id: string, data: unknown) {
  return request(`/api/productos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }, "No se pudo actualizar el producto");
}

export function deleteProducto(id: string) {
  return request(`/api/productos/${id}`, {
    method: "DELETE",
  }, "No se pudo eliminar el producto");
}

export async function getProductsLastMonth() {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);

  return (await getProductos()).filter(
    (product: any) => new Date(product.createdAt) >= date
  );
}
