import {
  createCart,
  createCartItem,
  deleteCartItem,
  findCartByUserId,
  findCartItem,
  findCartItemById,
  updateCartItem,
} from "@/repositories/cart/cart.repository";

import { findProductById } from "@/repositories/product/product.repository";

import { ERROR_MESSAGES } from "@/constants/messages";

/**
 * Obtiene el carrito del usuario.
 * Si no existe, lo crea automáticamente.
 */
export async function getOrCreateCart(userId: string) {
  const existingCart = await findCartByUserId(userId);

  if (existingCart) {
    return existingCart;
  }

  return createCart(userId);
}

/**
 * Agrega un producto al carrito.
 *
 * Si el producto ya existe en el carrito,
 * suma la cantidad solicitada a la existente.
 *
 * La cantidad final nunca puede superar el stock disponible.
 */
export async function addItem(
  userId: string,
  productId: string,
  requestedQuantity: number
) {
  const product = await findProductById(productId);

  if (!product) {
    throw new Error(ERROR_MESSAGES.PRODUCT_NOT_FOUND);
  }

  if (!product.isActive) {
    throw new Error(ERROR_MESSAGES.PRODUCT_INACTIVE);
  }

  if (product.stock <= 0) {
    throw new Error(ERROR_MESSAGES.PRODUCT_OUT_OF_STOCK);
  }

  const cart = await getOrCreateCart(userId);

  const existingItem = await findCartItem(
    cart.id,
    productId
  );

  if (!existingItem) {
    const quantity = Math.min(
      requestedQuantity,
      product.stock
    );

    return createCartItem(
      cart.id,
      productId,
      quantity
    );
  }

  const availableStock =
    product.stock - existingItem.quantity;

  if (availableStock <= 0) {
    throw new Error(ERROR_MESSAGES.PRODUCT_OUT_OF_STOCK);
  }

  const quantityToAdd = Math.min(
    requestedQuantity,
    availableStock
  );

  return updateCartItem(
    existingItem.id,
    existingItem.quantity + quantityToAdd
  );
}

/**
 * Actualiza la cantidad de un item del carrito.
 *
 * La cantidad solicitada representa la cantidad final
 * que tendrá el item, no una cantidad adicional.
 */
export async function updateItem(
  userId: string,
  itemId: string,
  requestedQuantity: number
) {
  const cart = await getOrCreateCart(userId);

  const item = await findCartItemById(
    cart.id,
    itemId
  );

  if (!item) {
    throw new Error(ERROR_MESSAGES.CART_ITEM_NOT_FOUND);
  }

  if (!item.product.isActive) {
    throw new Error(ERROR_MESSAGES.PRODUCT_INACTIVE);
  }

  if (item.product.stock <= 0) {
    throw new Error(ERROR_MESSAGES.PRODUCT_OUT_OF_STOCK);
  }

  const quantity = Math.min(
    requestedQuantity,
    item.product.stock
  );

  return updateCartItem(
    item.id,
    quantity
  );
}

/**
 * Elimina un item del carrito.
 */
export async function removeItem(
  userId: string,
  itemId: string
) {
  const cart = await getOrCreateCart(userId);

  const item = await findCartItemById(
    cart.id,
    itemId
  );

  if (!item) {
    throw new Error(ERROR_MESSAGES.CART_ITEM_NOT_FOUND);
  }

  return deleteCartItem(item.id);
}