import Image from "next/image";
import Link from "next/link";

import { relatedProducts } from "./cart.constants";
import styles from "@/styles/carrito.module.css";

export default function CartRelatedProducts() {
  return (
    <section className={styles.relacionados}>
      <h2>Artículos relacionados</h2>

      <div className={styles.grillaRelacionados}>
        {relatedProducts.map((product) => (
          <Link
            href={`/productos/${product.id}`}
            className={styles.tarjetaRelacionada}
            key={product.imagen}
          >
            <Image
              src={product.imagen}
              alt={product.nombre}
              width={180}
              height={150}
              className={styles.fotoRelacionada}
            />
            <p>{product.nombre}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
