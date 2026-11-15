import type { ItemCarrito } from "@/lib/carrito";
import { SHIPPING_COST } from "./cart.constants";

export function getCartSummary(
  items: ItemCarrito[],
  selectedIds: string[],
) {
  const selectedItems = items.filter((item) => selectedIds.includes(item.id));
  const subtotal = selectedItems.reduce(
    (total, item) => total + item.precio * item.cantidad,
    0,
  );
  const shipping = selectedItems.length > 0 ? SHIPPING_COST : 0;

  return {
    selectedItems,
    subtotal,
    shipping,
    total: subtotal + shipping,
  };
}
