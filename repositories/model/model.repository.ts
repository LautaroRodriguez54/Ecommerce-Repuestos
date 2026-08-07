import prisma from "@/lib/prisma";

import type {
  CreateModelInput,
  UpdateModelInput,
} from "@/validators/model.schema";

const modelInclude = {
  brand: true,
  products: true,
};

/**
 * Obtiene todos los modelos.
 */
export async function findAllModels() {
  return prisma.model.findMany({
    include: modelInclude,
    orderBy: [
      {
        brand: {
          name: "asc",
        },
      },
      {
        name: "asc",
      },
    ],
  });
}

/**
 * Busca un modelo por ID.
 */
export async function findModelById(id: string) {
  return prisma.model.findUnique({
    where: {
      id,
    },
    include: modelInclude,
  });
}

/**
 * Busca un modelo por nombre dentro de una marca.
 */
export async function findModelByNameAndBrand(
  name: string,
  brandId: string
) {
  return prisma.model.findUnique({
    where: {
      brandId_name: {
        brandId,
        name,
      },
    },
  });
}

/**
 * Verifica si un modelo existe.
 */
export async function existsModel(id: string) {
  const model = await prisma.model.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });

  return Boolean(model);
}

/**
 * Verifica si el modelo tiene productos asociados.
 */
export async function modelHasProducts(id: string) {
  const count = await prisma.product.count({
    where: {
      modelId: id,
    },
  });

  return count > 0;
}

/**
 * Crea un modelo.
 */
export async function createModel(
  data: CreateModelInput
) {
  const { brandId, ...modelData } = data;

  return prisma.model.create({
    data: {
      ...modelData,
      brand: {
        connect: {
          id: brandId,
        },
      },
    },
    include: modelInclude,
  });
}

/**
 * Actualiza un modelo.
 */
export async function updateModel(
  id: string,
  data: UpdateModelInput
) {
  const { brandId, ...modelData } = data;

  return prisma.model.update({
    where: {
      id,
    },
    data: {
      ...modelData,

      ...(brandId
        ? {
            brand: {
              connect: {
                id: brandId,
              },
            },
          }
        : {}),
    },
    include: modelInclude,
  });
}

/**
 * Elimina un modelo.
 */
export async function deleteModel(id: string) {
  return prisma.model.delete({
    where: {
      id,
    },
  });
}