"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./home.module.css";
import ProductCard from "../products/ProductCard";
import { getProductsLastMonth, type Producto } from "@/lib/api/productos";
import ChevronLeft from "../icon/ChevronLeft";
import ChevronRight from "../icon/ChevronRight";

export const NewSection = () => {
  const productsContainerRef = useRef<HTMLDivElement>(null);
  const [productsPerPage, setProductsPerPage] = useState(5);
  const [products, setProducts] = useState<Producto[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const productsPerPageRef = useRef(5);

  useEffect(() => {
    const container = productsContainerRef.current;
    if (!container) return;

    const updateProductsPerPage = () => {
      const containerWidth = container.clientWidth;
      const cardWidth = Math.min(200, Math.max(150, window.innerWidth * 0.15));
      const gap = 20;

      const quantity = Math.max(
        1,
        Math.floor((containerWidth + gap) / (cardWidth + gap)),
      );

      if (productsPerPageRef.current !== quantity) {
        productsPerPageRef.current = quantity;
        setProductsPerPage(quantity);
        setCurrentPage(0);
      }
    };
    
    const observer = new ResizeObserver(updateProductsPerPage);
    observer.observe(container);
    updateProductsPerPage();

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductsLastMonth();
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };

    fetchProducts();
  }, []);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const currentProducts = products.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage,
  );

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className={styles.new}>
      <div className={styles.newHeader}>
        <h1>NUEVO INGRESO</h1>

        <div className={styles.pagination}>
          <button
            className={styles.chevron}
            onClick={previousPage}
            disabled={currentPage === 0}
          >
            <ChevronLeft />
          </button>

          <span>
            {currentPage + 1} / {totalPages || 1}
          </span>

          <button
            className={styles.chevron}
            onClick={nextPage}
            disabled={currentPage >= totalPages - 1}
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <div className={styles.productsContainer} ref={productsContainerRef}>
        {currentProducts.map((product) => (
          <div className={styles.productWrapper} key={product.id}>
            <ProductCard
              id={product.id}
              name={product.name}
              image={product.image ?? "/images/product-placeholder.png"}
              price={product.price}
              variant="featured"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
