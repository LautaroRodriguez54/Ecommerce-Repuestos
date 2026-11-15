"use client";

import ProductFilters from "@/components/products/ProductFilters";
import ProductList from "@/components/products/ProductList";
import { useProductsCatalog } from "@/components/products/product.hooks";
import styles from "@/styles/productos.module.css";

export default function Page() {
  const {
    loading,
    error,
    search,
    setSearch,
    filters,
    setFilters,
    filteredProducts,
    brands,
    categories,
  } = useProductsCatalog();

  return (
    <main className={styles.catalogo}>
      <ProductFilters
        filters={filters}
        brands={brands}
        categories={categories}
        onChange={setFilters}
      />

      <div>
        <input
          className={styles.buscador}
          type="search"
          placeholder="Buscar repuestos..."
          aria-label="Buscar repuestos"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        {loading ? (
          <p role="status">Cargando productos...</p>
        ) : error ? (
          <p role="alert">{error}</p>
        ) : filteredProducts.length === 0 ? (
          <p role="status">No se encontraron productos con esos filtros.</p>
        ) : (
          <ProductList products={filteredProducts} />
        )}
      </div>
    </main>
  );
}
