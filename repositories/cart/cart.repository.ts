import prisma from "@/lib/prisma";

/**
 * Obtiene el carrito de un usuario.
 */
export async function findCartByUserId(userId: string) {
  return prisma.cart.findUnique({
    where: {
      userId,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
}

/**
 * Crea un carrito para un usuario.
 */
export async function createCart(userId: string) {
  return prisma.cart.create({
    data: {
      userId,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
}

/**
 * Busca un producto dentro de un carrito.
 */
export async function findCartItem(
  cartId: string,
  productId: string
) {
  return prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId,
        productId,
      },
    },
    include: {
      product: true,
    },
  });
}

/**
 * Busca un item específico perteneciente a un carrito.
 */
export async function findCartItemById(
  cartId: string,
  itemId: string
) {
  return prisma.cartItem.findFirst({
    where: {
      id: itemId,
      cartId,
    },
    include: {
      product: true,
    },
  });
}

/**
 * Agrega un producto al carrito.
 */
export async function createCartItem(
  cartId: string,
  productId: string,
  quantity: number
) {
  return prisma.cartItem.create({
    data: {
      cartId,
      productId,
      quantity,
    },
    include: {
      product: true,
    },
  });
}

/**
 * Actualiza la cantidad de un item del carrito.
 */
export async function updateCartItem(
  itemId: string,
  quantity: number
) {
  return prisma.cartItem.update({
    where: {
      id: itemId,
    },
    data: {
      quantity,
    },
    include: {
      product: true,
    },
  });
}

/**
 * Elimina un item del carrito.
 */
export async function deleteCartItem(itemId: string) {
  return prisma.cartItem.delete({
    where: {
      id: itemId,
    },
  });
}