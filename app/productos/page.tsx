"use client";
import { useEffect, useState } from "react";
import { SideBarLayout } from "@/components/ui/sideBarLayout/SideBarLayout";
import { SearchBox } from "@/components/ui/form/SearchBox";
import styles from "../../styles/productos.module.css";
import ProductList from "../../components/product/ProductList";
import { Pagination } from "@/components/ui/Pagination";
import ProductFilters, {
  type ProductFiltersValue,
} from "../../components/product/ProductFilters";
import { getProductos } from "@/lib/api/productos";
import type { CatalogProduct } from "../../services/product/product.api";
import { getProductImage } from "@/components/product/productImages/getProductImage";


type ApiProduct = {
  id: string;
  name: string;
  image: string | null;
  price: string | number;
  model?: { brand?: { name: string } | null } | null;
  category?: { name: string } | null;
};

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
        const data: ApiProduct[] = await getProductos();

        if (!controller.signal.aborted) {
          setProducts(
            data.map((product) => ({
              id: product.id,
              name: product.name,
              image: getProductImage(product.id),
              price: Number(product.price),
              brand: product.model?.brand?.name ?? "",
              category: product.category?.name ?? "",
            })),
          );
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
    <SideBarLayout
      page="client"
      sidebarChildren={
        <ProductFilters
          filters={filters}
          brands={brands}
          categories={categories}
          onChange={setFilters}
        />
      }
    >
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
          <Pagination<CatalogProduct>
            itemsPerPage={16}
            maxPageButtons={3}
            data={filteredProducts}
            totalRecords={filteredProducts.length}
          >
            {(currentProducts) => <ProductList products={currentProducts} />}
          </Pagination>
        )}
      </div>
    </SideBarLayout>
  );
}
