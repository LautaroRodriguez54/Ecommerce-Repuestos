"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/productos.module.css";
import { useAuth } from "@/components/auth/AuthContext";
import { useState } from "react";
import { addItemCarrito } from "@/lib/api/carrito";

type ProductCardProps = {
  id: string | number;
  name: string;
  sku?: string;
  image: string | null;
  price?: string | number;
  stock?: number;
  variant?: "catalog" | "featured";
};

export default function ProductCard({
  id,
  name,
  sku,
  image,
  price,
  stock,
  variant = "catalog",
}: ProductCardProps) {
  const { user, loading } = useAuth();

  const hasPrice =
    !loading && !!user && price !== undefined && price !== null && price !== "";

  const [imageError, setImageError] = useState(false);
  const [adding, setAdding] = useState(false);
  const [cartMessage, setCartMessage] = useState("");
  const [cartError, setCartError] = useState("");

  const placeholder = "/images/product-placeholder.webp";
  const imageSrc = !image || imageError ? placeholder : image;

  async function handleAddToCart() {
    if (stock === undefined || stock < 1 || adding) return;

    try {
      setAdding(true);
      setCartMessage("");
      setCartError("");

      await addItemCarrito(String(id), 1);

      setCartMessage("Producto agregado al carrito ✓");
    } catch (error) {
      setCartError(
        error instanceof Error
          ? error.message
          : "No se pudo agregar el producto al carrito.",
      );
    } finally {
      setAdding(false);
    }
  }

  return (
    <article className={`${styles.tarjeta} ${styles[variant]}`}>
      <Link
        href={`/productos/${id}`}
        className={styles.imagenProducto}
        aria-label={`Ver detalle de ${name}, producto ${id}`}
      >
        <Image
          src={imageSrc}
          alt={name}
          fill
          sizes="250px"
          className={styles.foto}
          onError={() => setImageError(true)}
        />
      </Link>

      <p className={styles.nombreProducto}>{name}</p>

      {sku && (
        <small className={styles.skuProducto}>
          SKU: {sku}
        </small>
      )}

      {hasPrice && (
        <strong className={styles.precioProducto}>
          $ {Number(price).toLocaleString("es-AR")}
        </strong>
      )}

      {stock !== undefined && (
        <button
          type="button"
          className={styles.botonCarrito}
          onClick={handleAddToCart}
          disabled={stock < 1 || adding}
        >
          {stock < 1
            ? "Sin stock"
            : adding
              ? "Agregando..."
              : "Agregar al carrito"}
        </button>
      )}

      {cartMessage && (
        <p
          role="status"
          className={`${styles.mensajeCarrito} ${styles.exitoCarrito}`}
        >
          {cartMessage}
        </p>
      )}

      {cartError && (
        <p
          role="alert"
          className={`${styles.mensajeCarrito} ${styles.errorCarrito}`}
        >
          {cartError}
        </p>
      )}

      <Link href={`/productos/${id}`} className={styles.verDetalle}>
        Ver detalle →
      </Link>
    </article>
  );
}