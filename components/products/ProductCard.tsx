import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/productos.module.css";

type ProductCardProps = {
  id: string | number;
  name: string;
  image: string;
  price: number;
};

export default function ProductCard({
  id,
  name,
  image,
  price,
}: ProductCardProps) {
  return (
    <article className={styles.tarjeta}>
      <Link
        href={`/productos/${id}`}
        className={styles.imagenProducto}
        aria-label={`Ver detalle de ${name}, producto ${id}`}
      >
        <Image
          src={image}
          alt={name}
          fill
          sizes="250px"
          className={styles.foto}
        />
      </Link>

      <p>{name}</p>
      <strong>$ {price.toLocaleString("es-AR")}</strong>

      <Link href={`/productos/${id}`} className={styles.verDetalle}>
        Ver detalle →
      </Link>
    </article>
  );
}
