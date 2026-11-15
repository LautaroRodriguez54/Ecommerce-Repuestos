"use client";

import { useRef } from "react";

import CartConfirmationDialog from "@/components/cart/CartConfirmationDialog";
import CartItemsPanel from "@/components/cart/CartItemsPanel";
import CartRelatedProducts from "@/components/cart/CartRelatedProducts";
import CartShippingNotice from "@/components/cart/CartShippingNotice";
import CartSummary from "@/components/cart/CartSummary";
import { useCart } from "@/components/cart/cart.hooks";
import styles from "@/styles/carrito.module.css";

export default function Page() {
  const confirmationRef = useRef<HTMLDialogElement>(null);
  const {
    items,
    selectedIds,
    loaded,
    changeQuantity,
    removeItem,
    toggleItem,
    selectedItems,
    subtotal,
    shipping,
    total,
  } = useCart();

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
            selectedIds={selectedIds}
            onToggleItem={toggleItem}
            onChangeQuantity={changeQuantity}
            onRemoveItem={removeItem}
          />
          <CartShippingNotice />
        </div>

        <CartSummary
          subtotal={subtotal}
          shipping={shipping}
          total={total}
          canSubmit={selectedItems.length > 0}
          onSubmit={() => confirmationRef.current?.showModal()}
        />
      </div>

      <CartRelatedProducts />
    </main>
  );
}
