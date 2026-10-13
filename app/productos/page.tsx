"use client";
import { useEffect, useState } from "react";
import styles from "../../styles/productos.module.css";
import ProductList from "../../components/products/ProductList";
import ProductFilters, {
  type ProductFiltersValue,
} from "../../components/products/ProductFilters";
import {
  fetchProducts,
  type CatalogProduct,
} from "../../services/product/product.api";

export default function Page() {
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState<ProductFiltersValue>({
    brands: [],
    categories: [],
  });

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        const data = await fetchProducts(controller.signal);

        if (!controller.signal.aborted) {
          setProducts(data);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setError(
            error instanceof Error
              ? error.message
              : "Ocurrió un error al cargar el catálogo.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => controller.abort();
  }, []);

  const brands = Array.from(
    new Set(products.map((product) => product.brand).filter(Boolean)),
  ).sort();

  const categories = Array.from(
    new Set(products.map((product) => product.category).filter(Boolean)),
  ).sort();

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    const matchesBrand =
      filters.brands.length === 0 || filters.brands.includes(product.brand);

    const matchesCategory =
      filters.categories.length === 0 ||
      filters.categories.includes(product.category);

    return matchesSearch && matchesBrand && matchesCategory;
  });

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

