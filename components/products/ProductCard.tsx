"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/productos.module.css";
import { usePermissions } from "@/components/permission/useUserGuard";

type ProductCardProps = {
  id: string | number;
  name: string;
  image: string | null;
  price?: string | number;
  variant?: "catalog" | "featured";
};

export default function ProductCard({
  id,
  name,
  image,
  price,
  variant = "catalog",
}: ProductCardProps) {
  const { isAuthenticated, loading } = usePermissions();

  const hasPrice =
    isAuthenticated &&
    !loading &&
    price !== undefined &&
    price !== null &&
    price !== "";

    const imageSrc = image || "/images/product-placeholder.png";

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
        />
      </Link>
      <p>{name}</p>
      {hasPrice && (
        <strong>
          $ {Number(price).toLocaleString("es-AR")}
        </strong>
      )}
      <Link href={`/productos/${id}`} className={styles.verDetalle}>
        Ver detalle →
      </Link>
    </article>
  );
}
