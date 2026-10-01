export async function getProductos() {
  const response = await fetch("/api/productos");

  if (!response.ok) {
    throw new Error("No se pudieron obtener los productos");
  }

  const result = await response.json();

  return result.data;
}