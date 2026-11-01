export type CatalogProduct = {
  id: string;
  name: string;
  image: string;
  price: number;
  brand: string;
  category: string;
};

type ApiProduct = {
  id: string;
  name: string;
  image: string | null;
  price: string | number;
  category: {
    name: string;
  } | null;
  model: {
    brand: {
      name: string;
    } | null;
  } | null;
};

type ProductsResponse = {
  success: boolean;
  data?: ApiProduct[];
};

export async function fetchProducts(
  signal?: AbortSignal,
): Promise<CatalogProduct[]> {
  const response = await fetch("/api/productos", {
    signal,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("No se pudieron cargar los productos.");
  }

  const result: ProductsResponse = await response.json();

  if (!result.success || !Array.isArray(result.data)) {
    throw new Error("La respuesta de productos no es válida.");
  }

  return result.data.map((product) => ({
    id: product.id,
    name: product.name,
    image: product.image || "/horquilla1.webp",
    price: Number(product.price),
    brand: product.model?.brand?.name ?? "",
    category: product.category?.name ?? "",
  }));
}
