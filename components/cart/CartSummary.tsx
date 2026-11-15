import { priceFormat } from "./cart.constants";
import styles from "@/styles/carrito.module.css";

type CartSummaryProps = {
  subtotal: number;
  shipping: number;
  total: number;
  canSubmit: boolean;
  onSubmit: () => void;
};

export default function CartSummary({
  subtotal,
  shipping,
  total,
  canSubmit,
  onSubmit,
}: CartSummaryProps) {
  return (
    <aside className={styles.panel}>
      <h2>Resumen de compra</h2>

      <div className={styles.lineaResumen}>
        <span>Productos</span>
        <span>{priceFormat.format(subtotal)}</span>
      </div>

      <div className={styles.lineaResumen}>
        <span>Envío</span>
        <span>{priceFormat.format(shipping)}</span>
      </div>

      <div className={styles.total}>
        <span>TOTAL</span>
        <strong>{priceFormat.format(total)}</strong>
      </div>

      <button
        type="button"
        className={styles.realizarPedido}
        disabled={!canSubmit}
        onClick={onSubmit}
      >
        Realizar pedido
      </button>
    </aside>
  );
}
