"use client";
import { SideBarLayout } from "@/components/ui/sideBarLayout/SideBarLayout";
import { Pagination } from "@/components/ui/Pagination";
import {
  type CatalogProduct,
} from "../../services/product/product.api";

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
