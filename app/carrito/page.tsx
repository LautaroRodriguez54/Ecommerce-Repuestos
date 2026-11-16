"use client";

import { useRef, useState } from "react";

import CartConfirmationDialog from "@/components/cart/CartConfirmationDialog";
import CartItemsPanel from "@/components/cart/CartItemsPanel";
import CartRelatedProducts from "@/components/cart/CartRelatedProducts";
import CartShippingNotice from "@/components/cart/CartShippingNotice";
import CartSummary from "@/components/cart/CartSummary";
import type { PaymentTerm } from "@/components/cart/cart.constants";
import { useCart } from "@/components/cart/cart.hooks";
import styles from "@/styles/carrito.module.css";

export default function Page() {
  const confirmationRef = useRef<HTMLDialogElement>(null);
  const [paymentTerm, setPaymentTerm] = useState<PaymentTerm>("DAYS_30");
  const {
    items,
    loaded,
    error,
    changeQuantity,
    removeItem,
    summary,
    isSubmitting,
    submitOrder,
  } = useCart(paymentTerm);

  async function handleSubmitOrder() {
    if (await submitOrder()) {
      confirmationRef.current?.showModal();
    }
  }

  if (!loaded) {
    return <div className={styles.pagina}>Cargando carrito...</div>;
  }

  return (
    <main className={styles.pagina}>
      <CartConfirmationDialog dialogRef={confirmationRef} />

      <div className={styles.distribucion}>
        <div className={styles.columna}>
          <CartItemsPanel
            items={items}
            onChangeQuantity={changeQuantity}
            onRemoveItem={removeItem}
          />
          {error && <p role="alert">{error}</p>}
          <CartShippingNotice />
        </div>

        <CartSummary
          summary={summary}
          paymentTerm={paymentTerm}
          onPaymentTermChange={setPaymentTerm}
          canSubmit={items.length > 0}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmitOrder}
        />
      </div>

      <CartRelatedProducts />
    </main>
  );
}
