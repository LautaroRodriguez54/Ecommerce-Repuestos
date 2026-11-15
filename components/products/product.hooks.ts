"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { agregarAlCarrito } from "@/lib/carrito";
import {
  getProducto,
  getProductosCatalogo,
  type CatalogProduct,
  type Producto,
} from "@/lib/api/productos";
import {
  initialProductFilters,
  type ProductFiltersValue,
} from "./product.constants";
import {
  filterProducts,
  getProductFilterOptions,
  getRelatedProducts,
} from "./product.helpers";

export function useProductsCatalog() {
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<ProductFiltersValue>(
    initialProductFilters,
  );

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        const data = await getProductosCatalogo(controller.signal);

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

    void loadProducts();

    return () => controller.abort();
  }, []);

  const filterOptions = getProductFilterOptions(products);
  const filteredProducts = filterProducts(products, search, filters);

  return {
    loading,
    error,
    search,
    setSearch,
    filters,
    setFilters,
    filteredProducts,
    ...filterOptions,
  };
}

export function useProductDetail(id: string) {
  const router = useRouter();
  const [product, setProduct] = useState<Producto | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<CatalogProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProduct() {
      setLoading(true);
      setError("");
      setProduct(null);
      setRelatedProducts([]);
      setQuantity(1);

      try {
        const product = await getProducto(id, controller.signal);

        if (!Number.isFinite(Number(product.price))) {
          throw new Error("La respuesta del producto no es válida.");
        }

        if (!controller.signal.aborted) {
          setProduct(product);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setError(
            error instanceof Error
              ? error.message
              : "Ocurrió un error al cargar el producto.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadProduct();

    return () => controller.abort();
  }, [id]);

  useEffect(() => {
    if (!product) return;

    const controller = new AbortController();

    async function loadRelatedProducts() {
      try {
        const products = await getProductosCatalogo(controller.signal);

        if (!controller.signal.aborted) {
          setRelatedProducts(getRelatedProducts(products, product));
        }
      } catch {
        if (!controller.signal.aborted) {
          setRelatedProducts([]);
        }
      }
    }

    void loadRelatedProducts();

    return () => controller.abort();
  }, [product]);

  function decreaseQuantity() {
    setQuantity((current) => Math.max(1, current - 1));
  }

  function increaseQuantity() {
    if (!product) return;
    setQuantity((current) => Math.min(product.stock, current + 1));
  }

  function addToCart() {
    if (!product || product.stock < 1) return;

    agregarAlCarrito({
      id: product.id,
      nombre: product.name,
      imagen: product.image ?? "",
      precio: Number(product.price),
      cantidad: quantity,
    });

    router.push("/carrito");
  }

  return {
    product,
    relatedProducts,
    loading,
    error,
    quantity,
    decreaseQuantity,
    increaseQuantity,
    addToCart,
  };
}
