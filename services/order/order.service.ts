import {
  createOrderTransaction,
  findOrderById,
  findOrdersByUserId,
} from "@/repositories/order/order.repository";

import { getOrCreateCart } from "@/services/cart/cart.service";

import type { CreateOrderInput } from "@/validators/order/order.schema";

/**
 * Obtiene una orden por ID.
 */
export async function getOrderById(id: string) {
  return findOrderById(id);
}

/**
 * Obtiene todas las órdenes de un usuario.
 */
export async function getOrdersByUserId(userId: string) {
  return findOrdersByUserId(userId);
}

/**
 * Calcula el descuento correspondiente al plazo de pago.
 *
 * El descuento se aplica sobre:
 *
 * precio neto + IVA
 *
 * DAYS_7:
 * 20% y luego 5% sobre el resultado.
 */
function calculatePaymentDiscount(
  baseAmount: number,
  paymentTerm: CreateOrderInput["paymentTerm"]
) {
  switch (paymentTerm) {
    case "DAYS_7": {
      const amountAfterTwentyPercent = baseAmount * 0.8;

      const amountAfterFivePercent =
        amountAfterTwentyPercent * 0.95;

      return baseAmount - amountAfterFivePercent;
    }

    case "DAYS_30":
      return baseAmount * 0.2;

    case "DAYS_45":
      return baseAmount * 0.1;

    case "DAYS_60":
      return 0;
  }
}

/**
 * Crea una orden a partir del carrito del usuario.
 */
export async function createOrder(
  userId: string,
  data: CreateOrderInput
) {
  const cart = await getOrCreateCart(userId);

  if (cart.items.length === 0) {
    throw new Error("El carrito está vacío.");
  }

  /*
   * El precio siempre se obtiene desde Product.price.
   *
   * Nunca utilizamos precios enviados por el cliente.
   */
  const netTotal = cart.items.reduce((total, item) => {
    return total + Number(item.product.price) * item.quantity;
  }, 0);

  /*
   * Bonificación comercial fija del 25%.
   */
  const bonusAmount = netTotal * 0.25;

  /*
   * IVA del 21% sobre el precio neto.
   */
  const vatAmount = netTotal * 0.21;

  /*
   * El descuento por plazo se calcula sobre:
   *
   * precio neto + IVA
   */
  const paymentDiscountBase = netTotal + vatAmount;

  const paymentDiscountAmount = calculatePaymentDiscount(
    paymentDiscountBase,
    data.paymentTerm
  );

  /*
   * Total final:
   *
   * neto
   * - bonificación
   * + IVA
   * - descuento por plazo
   */
  const total =
    netTotal -
    bonusAmount +
    vatAmount -
    paymentDiscountAmount;

  return createOrderTransaction({
    userId,
    cartId: cart.id,
    paymentTerm: data.paymentTerm,
    netTotal,
    bonusAmount,
    paymentDiscountAmount,
    vatAmount,
    total,
    comment: data.comment,
    items: cart.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: Number(item.product.price),
    })),
  });
}