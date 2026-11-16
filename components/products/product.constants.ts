export type ProductFiltersValue = {
  brands: string[];
  categories: string[];
};

export const initialProductFilters: ProductFiltersValue = {
  brands: [],
  categories: [],
};

export const priceFormat = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
});
