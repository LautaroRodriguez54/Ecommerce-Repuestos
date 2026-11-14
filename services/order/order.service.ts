
import "server-only";

import {
  createOrderTransaction,
  findOrderById,
  findOrdersByUserId,
  findAllOrders,
  updateOrderStatus as updateOrderStatusRepository,
} from "@/repositories/order/order.repository";

import { getOrCreateCart } from "@/services/cart/cart.service";
import { getAuthenticatedUser } from "@/services/auth/authenticated-user.service";
import { requireAdmin } from "@/services/auth/authorization.service";

import type { CreateOrderInput } from "@/validators/order/order.schema";

export type OrderStatus =
  | "PENDING"
  | "PAID"
  | "PREPARING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export async function getAllOrders() {
  await requireAdmin();
  return findAllOrders();
}

export async function getOrderById(id: string) {
  const user = await getAuthenticatedUser();
  if (!user) throw new Error("UNAUTHORIZED");

  const order = await findOrderById(id);

  return order && (user.role === "ADMIN" || order.userId === user.id)
    ? order
    : null;
}

export async function getOrdersByUserId(userId: string) {
  const user = await getAuthenticatedUser();
  if (!user) throw new Error("UNAUTHORIZED");

  if (user.role !== "ADMIN" && user.id !== userId) {
    throw new Error("FORBIDDEN");
  }

  return findOrdersByUserId(userId);
}

function calculatePaymentDiscount(
  baseAmount: number,
  paymentTerm: CreateOrderInput["paymentTerm"]
) {
  switch (paymentTerm) {
    case "DAYS_7":
      return baseAmount * (1 - 0.8 * 0.95);
    case "DAYS_30":
      return baseAmount * 0.2;
    case "DAYS_45":
      return baseAmount * 0.1;
    case "DAYS_60":
      return 0;
  }
}

export async function createOrder(
  userId: string,
  data: CreateOrderInput
) {
  const user = await getAuthenticatedUser();
  if (!user) throw new Error("UNAUTHORIZED");
  if (user.id !== userId) throw new Error("FORBIDDEN");

  const cart = await getOrCreateCart(userId);
  if (!cart.items.length) throw new Error("El carrito está vacío.");

  // Los precios siempre se obtienen de la base de datos.
  const netTotal = cart.items.reduce(
    (total, item) => total + Number(item.product.price) * item.quantity,
    0
  );

  const bonusAmount = netTotal * 0.25;
  const vatAmount = netTotal * 0.21;
  const paymentDiscountAmount = calculatePaymentDiscount(
    netTotal + vatAmount,
    data.paymentTerm
  );

  const total = netTotal - bonusAmount + vatAmount - paymentDiscountAmount;

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

export async function updateOrderStatus(
  id: string,
  status: OrderStatus
) {
  const user = await getAuthenticatedUser();
  if (!user) throw new Error("UNAUTHORIZED");

  const order = await findOrderById(id);
  if (!order) return null;

  if (user.role === "ADMIN") {
    if (status === "CANCELLED") {
      throw new Error("ADMIN_CANNOT_CANCEL_ORDER");
    }

    return updateOrderStatusRepository(id, status);
  }

  if (order.userId !== user.id || status !== "CANCELLED") {
    throw new Error("FORBIDDEN");
  }

  if (order.status === "CANCELLED") {
    throw new Error("ORDER_ALREADY_CANCELLED");
  }

  return updateOrderStatusRepository(id, "CANCELLED");
}
