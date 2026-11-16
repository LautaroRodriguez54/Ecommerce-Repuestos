import {
  paymentTermOptions,
  priceFormat,
  type PaymentTerm,
} from "./cart.constants";
import type { OrderSummary } from "@/lib/api/ordenes";
import styles from "@/styles/carrito.module.css";

type CartSummaryProps = {
  summary: OrderSummary | null;
  paymentTerm: PaymentTerm;
  onPaymentTermChange: (paymentTerm: PaymentTerm) => void;
  canSubmit: boolean;
  isSubmitting: boolean;
  onSubmit: () => void;
};

export default function CartSummary({
  summary,
  paymentTerm,
  onPaymentTermChange,
  canSubmit,
  isSubmitting,
  onSubmit,
}: CartSummaryProps) {
  return (
    <aside className={styles.panel}>
      <h2>Resumen de compra</h2>

      <div className={styles.lineaResumen}>
        <span>Subtotal</span>
        <span>{priceFormat.format(summary?.netTotal ?? 0)}</span>
      </div>

      <div className={styles.lineaResumen}>
        <span>Bonificación</span>
        <span>-{priceFormat.format(summary?.bonusAmount ?? 0)}</span>
      </div>

      <div className={styles.lineaResumen}>
        <span>IVA</span>
        <span>{priceFormat.format(summary?.vatAmount ?? 0)}</span>
      </div>

      <label className={styles.plazoPago}>
        <span>Plazo de pago</span>
        <select
          value={paymentTerm}
          onChange={(event) =>
            onPaymentTermChange(event.target.value as PaymentTerm)
          }
        >
          {paymentTermOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <div className={styles.lineaResumen}>
        <span>Descuento por plazo</span>
        <span>-{priceFormat.format(summary?.paymentDiscountAmount ?? 0)}</span>
      </div>

      <div className={styles.total}>
        <span>TOTAL</span>
        <strong>{priceFormat.format(summary?.total ?? 0)}</strong>
      </div>

      <button
        type="button"
        className={styles.realizarPedido}
        disabled={!canSubmit || !summary || isSubmitting}
        onClick={onSubmit}
      >
        {isSubmitting ? "Generando pedido..." : "Realizar pedido"}
      </button>
    </aside>
  );
}
