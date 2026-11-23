import type { CatalogProduct, Producto } from "@/lib/api/productos";
import type { ProductFiltersValue } from "./product.constants";

export function getProductFilterOptions(products: CatalogProduct[]) {
  return {
    brands: Array.from(
      new Set(products.map((product) => product.brand).filter(Boolean)),
    ).sort(),
    categories: Array.from(
      new Set(products.map((product) => product.category).filter(Boolean)),
    ).sort(),
  };
}

export function filterProducts(
  products: CatalogProduct[],
  search: string,
  filters: ProductFiltersValue,
) {
  const normalizedSearch = search.trim().toLowerCase();
  function normalizeText(text: string): string {
    return text
      .toLocaleLowerCase("es")
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .trim();
  }

  return products.filter((product) => {
    const matchesSearch =
      normalizeText(product.name).includes(normalizedSearch) ||
      normalizeText(product.sku).includes(normalizedSearch);

    const matchesBrand =
      filters.brands.length === 0 || filters.brands.includes(product.brand);
      
    const matchesCategory =
      filters.categories.length === 0 ||
      filters.categories.includes(product.category);

    return matchesSearch && matchesBrand && matchesCategory;
  });
}

export function getRelatedProducts(
  products: CatalogProduct[],
  product: Producto,
) {
  return products
    .filter(
      (item) =>
        item.id !== product.id && item.category === product.category?.name,
    )
    .slice(0, 3);
}

export function getProductDetailFields(product: Producto) {
  return [
    product.model?.brand && { label: "Marca", value: product.model.brand.name },
    product.model && { label: "Modelo", value: product.model.name },
    product.compatibleYear != null && {
      label: "Año compatible",
      value: String(product.compatibleYear),
    },
    { label: "Código SKU", value: product.sku },
    product.category && { label: "Rubro", value: product.category.name },
    { label: "Stock", value: String(product.stock) },
  ].filter(
    (field): field is { label: string; value: string } => Boolean(field),
  );
}
