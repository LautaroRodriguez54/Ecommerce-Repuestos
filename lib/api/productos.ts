export type Producto = {
  id: string;
  name: string;
  sku: string;
  description: string | null;
  price: string | number;
  stock: number;
  image: string | null;
  compatibleYear: number | null;
  category: { name: string } | null;
  model: {
    name: string;
    brand: { name: string } | null;
  } | null;
  createdAt: string;
};

export type CatalogProduct = {
  id: string;
  name: string;
  sku: string;
  image: string | null;
  price: number;
  stock: number;
  brand: string;
  category: string;
};

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
};

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...options,
    credentials: "same-origin",
  });
  const result: ApiResponse<T> = await response.json();

  if (!response.ok || !result.success || result.data === undefined) {
    throw new Error(result.message ?? "No se pudo procesar la solicitud.");

  }

  return result.data;
}

export function getProductos(signal?: AbortSignal) {
  return request<Producto[]>("/api/productos", {
    signal,
    cache: "no-store",
  });
}

export async function getProductosCatalogo(signal?: AbortSignal) {
  const products = await getProductos(signal);

  return products.map<CatalogProduct>((product) => ({
    id: product.id,
    name: product.name,
    sku: product.sku,
    image: product.image ?? "/horquilla1.webp",
    price: Number(product.price),
    stock: product.stock,
    brand: product.model?.brand?.name ?? "",
    category: product.category?.name ?? "",
  }));
}

export function getProducto(id: string, signal?: AbortSignal) {
  return request<Producto>(`/api/productos/${encodeURIComponent(id)}`, {
    signal,
    cache: "no-store",
  });
}

export function createProducto(data: unknown) {
  return request<Producto>("/api/productos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export function updateProducto(id: string, data: unknown) {
  return request<Producto>(`/api/productos/${encodeURIComponent(id)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export function deleteProducto(id: string) {
  return request<{ message: string }>(
    `/api/productos/${encodeURIComponent(id)}`,
    { method: "DELETE" },
  );
}
export async function getProductsLastMonth() {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);

  return (await getProductos()).filter(
    (product) => new Date(product.createdAt) >= date
  );
}
