import Image from "next/image";
import Link from "next/link";

import type { CartItem } from "@/lib/api/carrito";
import { priceFormat } from "./cart.constants";
import styles from "@/styles/carrito.module.css";

type CartItemsPanelProps = {
  items: CartItem[];
  onChangeQuantity: (id: string, change: number) => void;
  onRemoveItem: (id: string) => void;
};

export default function CartItemsPanel({
  items,
  onChangeQuantity,
  onRemoveItem,
}: CartItemsPanelProps) {
  return (
    <section className={styles.panel}>
      <h1>Carrito</h1>

      {items.length === 0 ? (
        <div className={styles.vacio}>
          <p>Tu carrito está vacío.</p>
          <Link href="/productos">Ver productos →</Link>
        </div>
      ) : (
        <>
          <div className={styles.encabezado}>
            <span>Producto</span>
            <span>Cantidad</span>
            <span>Precio unitario</span>
            <span />
          </div>

          {items.map((item) => (
            <article className={styles.fila} key={item.id}>
              <Link href={`/productos/${item.productId}`} className={styles.producto}>
                <Image
                  src={item.imagen}
                  alt={item.nombre}
                  width={70}
                  height={70}
                  className={styles.foto}
                />
                <div>
                  <p>{item.nombre}</p>
                  <small>Producto {item.productId}</small>
                </div>
              </Link>

              <div className={styles.cantidad}>
                <button
                  type="button"
                  disabled={item.cantidad === 1}
                  onClick={() => onChangeQuantity(item.id, -1)}
                  aria-label="Disminuir cantidad"
                >
                  −
                </button>
                <span>{item.cantidad}</span>
                <button
                  type="button"
                  disabled={item.cantidad >= item.stock}
                  onClick={() => onChangeQuantity(item.id, 1)}
                  aria-label="Aumentar cantidad"
                >
                  +
                </button>
              </div>

              <span className={styles.precio}>
                {priceFormat.format(item.precio)}
              </span>

              <button
                type="button"
                className={styles.eliminar}
                onClick={() => onRemoveItem(item.id)}
                aria-label={`Eliminar producto ${item.id}`}
              >
                ×
              </button>
            </article>
          ))}
        </>
      )}
    </section>
  );
}
