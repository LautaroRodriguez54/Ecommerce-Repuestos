type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
};

type ApiCartItem = {
  id: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    image: string | null;
    price: number | string;
    stock: number;
  };
};

type ApiCart = {
  id: string;
  items: ApiCartItem[];
};

export type CartItem = {
  id: string;
  productId: string;
  nombre: string;
  imagen: string;
  precio: number;
  cantidad: number;
  stock: number;
};

export type Cart = {
  id: string;
  items: CartItem[];
};

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    credentials: "same-origin",
    ...init,
  });
  const result = (await response.json()) as ApiResponse<T>;

  if (!response.ok || !result.success || !result.data) {
    throw new Error(result.message ?? "No se pudo procesar el carrito.");
  }

  return result.data;
}

function toCartItem(item: ApiCartItem): CartItem {
  return {
    id: item.id,
    productId: item.productId,
    nombre: item.product.name,
    imagen: item.product.image ?? "/horquilla1.webp",
    precio: Number(item.product.price),
    cantidad: item.quantity,
    stock: item.product.stock,
  };
}

function toCart(cart: ApiCart): Cart {
  return { id: cart.id, items: cart.items.map(toCartItem) };
}

export async function getCarrito(): Promise<Cart> {
  return toCart(await request<ApiCart>("/api/carrito"));
}

export async function addItemCarrito(
  productId: string,
  quantity: number,
): Promise<CartItem> {
  const item = await request<ApiCartItem>("/api/carrito/items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, quantity }),
  });

  return toCartItem(item);
}

export async function updateItemCarrito(
  itemId: string,
  quantity: number,
): Promise<CartItem> {
  const item = await request<ApiCartItem>(`/api/carrito/items/${itemId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
  });

  return toCartItem(item);
}

export async function removeItemCarrito(itemId: string): Promise<void> {
  await request<{ message: string }>(`/api/carrito/items/${itemId}`, {
    method: "DELETE",
  });
}
