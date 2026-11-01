import prisma from "@/lib/prisma";

/**
 * Obtiene todas las órdenes.
 *
 * Uso: Panel de administración.
 */
export async function findAllOrders() {
  return prisma.order.findMany({
    include: {
      items: {
        include: {
          product: true,
        },
      },
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

/**
 * Obtiene una orden por ID.
 */
export async function findOrderById(id: string) {
  return prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
      user: true,
    },
  });
}

/**
 * Obtiene todas las órdenes de un usuario.
 */
export async function findOrdersByUserId(userId: string) {
  return prisma.order.findMany({
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
    orderBy: {
      createdAt: "desc",
    },
  });
}

/**
 * Crea una orden, descuenta el stock de sus productos
 * y elimina el carrito dentro de una única transacción.
 *
 * El descuento de stock se realiza de forma atómica:
 * solamente se descuenta si el producto sigue activo
 * y dispone de stock suficiente en ese momento.
 *
 * Si alguna operación falla, toda la transacción se revierte.
 */
export async function createOrderTransaction(data: {
  userId: string;
  cartId: string;
  paymentTerm:
    | "DAYS_7"
    | "DAYS_30"
    | "DAYS_45"
    | "DAYS_60";
  netTotal: number;
  bonusAmount: number;
  paymentDiscountAmount: number;
  vatAmount: number;
  total: number;
  comment?: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
}) {
  return prisma.$transaction(async (tx) => {
    /*
     * Descontamos el stock antes de crear la orden.
     *
     * La operación solamente se ejecuta si:
     *
     * - El producto existe.
     * - El producto está activo.
     * - Hay stock suficiente.
     *
     * La comprobación y el decremento ocurren
     * dentro de una única operación de base de datos.
     */
    for (const item of data.items) {
      const stockUpdate = await tx.product.updateMany({
        where: {
          id: item.productId,
          isActive: true,
          stock: {
            gte: item.quantity,
          },
        },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });

      /*
       * Si no se modificó ninguna fila, necesitamos
       * determinar el motivo para devolver el mensaje
       * correspondiente.
       */
      if (stockUpdate.count !== 1) {
        const product = await tx.product.findUnique({
          where: {
            id: item.productId,
          },
          select: {
            id: true,
            isActive: true,
            stock: true,
          },
        });

        if (!product) {
          throw new Error("Producto no encontrado.");
        }

        if (!product.isActive) {
          throw new Error("El producto está inactivo.");
        }

        throw new Error(
          "El stock disponible de uno de los productos es insuficiente."
        );
      }
    }

    /*
     * Creamos la orden y sus items.
     *
     * Como el stock ya fue reservado/descontado dentro
     * de esta misma transacción, si la creación falla
     * los decrementos anteriores también se revierten.
     */
    const order = await tx.order.create({
      data: {
        userId: data.userId,
        paymentTerm: data.paymentTerm,
        netTotal: data.netTotal,
        bonusAmount: data.bonusAmount,
        paymentDiscountAmount: data.paymentDiscountAmount,
        vatAmount: data.vatAmount,
        total: data.total,
        comment: data.comment,
        items: {
          create: data.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    /*
     * Eliminamos el carrito una vez creada la orden.
     */
    await tx.cart.delete({
      where: {
        id: data.cartId,
      },
    });

    return order;
  });
}

/**
 * Actualiza el estado de una orden.
 */
export async function updateOrderStatus(
  id: string,
  status:
    | "PENDING"
    | "PAID"
    | "PREPARING"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED"
) {
  return prisma.order.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
}