export async function getCarrito() {
  const response = await fetch("/api/carrito");
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error ?? "No se pudo obtener el carrito");
  }

  return result.data;
}

export async function addItemCarrito(
  productId: string,
  quantity: number
) {
  const response = await fetch("/api/carrito/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId,
      quantity,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error ?? "No se pudo agregar el producto");
  }

  return result.data;
}

export async function updateItemCarrito(
  itemId: string,
  quantity: number
) {
  const response = await fetch(`/api/carrito/items/${itemId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      quantity,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error ?? "No se pudo actualizar el carrito");
  }

  return result.data;
}

export async function removeItemCarrito(itemId: string) {
  const response = await fetch(`/api/carrito/items/${itemId}`, {
    method: "DELETE",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error ?? "No se pudo eliminar el producto");
  }

  return result.data;
}