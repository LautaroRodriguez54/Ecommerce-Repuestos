import prisma from "@/lib/prisma";

import type {
  CreateProductInput,
  UpdateProductInput,
} from "@/validators/product/product.schema";

const productInclude = {
  category: true,
  model: {
    include: {
      brand: true,
    },
  },
};

/**
 * Obtiene todos los productos (incluyendo inactivos).
 * Uso: Panel de administración.
 */
export async function findAllProducts() {
  return prisma.product.findMany({
    include: productInclude,
    orderBy: {
      createdAt: "desc",
    },
  });
}

/**
 * Obtiene únicamente los productos activos.
 * Uso: Catálogo público.
 */
export async function findActiveProducts() {
  return prisma.product.findMany({
    where: {
      isActive: true,
    },
    include: productInclude,
    orderBy: {
      createdAt: "desc",
    },
  });
}

/**
 * Busca un producto por ID.
 */
export async function findProductById(id: string) {
  return prisma.product.findUnique({
    where: {
      id,
    },
    include: productInclude,
  });
}

/**
 * Busca un producto por SKU.
 */
export async function findProductBySku(sku: string) {
  return prisma.product.findUnique({
    where: {
      sku,
    },
    include: productInclude,
  });
}

/**
 * Verifica si un producto existe.
 */
export async function existsProduct(id: string) {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });

  return Boolean(product);
}

/**
 * Crea un producto.
 */
export async function createProduct(
  data: CreateProductInput
) {
  const { categoryId, modelId, ...productData } = data;

  return prisma.product.create({
    data: {
      ...productData,

      category: {
        connect: {
          id: categoryId,
        },
      },

      model: {
        connect: {
          id: modelId,
        },
      },
    },

    include: productInclude,
  });
}

/**
 * Actualiza un producto.
 */
export async function updateProduct(
  id: string,
  data: UpdateProductInput
) {
  const { categoryId, modelId, ...productData } = data;

  return prisma.product.update({
    where: {
      id,
    },

    data: {
      ...productData,

      ...(categoryId
        ? {
            category: {
              connect: {
                id: categoryId,
              },
            },
          }
        : {}),

      ...(modelId
        ? {
            model: {
              connect: {
                id: modelId,
              },
            },
          }
        : {}),
    },

    include: productInclude,
  });
}

/**
 * Realiza un Soft Delete.
 */
export async function deleteProduct(id: string) {
  return prisma.product.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
  });
}