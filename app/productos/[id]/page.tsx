"use client";

import { useParams } from "next/navigation";

import ProductDetailView from "@/components/products/ProductDetailView";
import RelatedProductList from "@/components/products/RelatedProductList";
import {
  ProductDetailError,
  ProductDetailLoading,
} from "@/components/products/ProductDetailState";
import { useProductDetail } from "@/components/products/product.hooks";
import styles from "@/styles/detalleProducto.module.css";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const {
    product,
    relatedProducts,
    loading,
    error,
    cartError,
    quantity,
    decreaseQuantity,
    increaseQuantity,
    addToCart,
  } = useProductDetail(id);

  if (loading) return <ProductDetailLoading />;
  if (error || !product) {
    return <ProductDetailError message={error || "Producto no encontrado."} />;
  }

  return (
    <main className={styles.pagina}>
      <ProductDetailView
        product={product}
        quantity={quantity}
        onDecreaseQuantity={decreaseQuantity}
        onIncreaseQuantity={increaseQuantity}
        onAddToCart={addToCart}
        cartError={cartError}
      />
      <RelatedProductList products={relatedProducts} />
    </main>
  );
}
