import prisma from "@/lib/prisma";

import {
  CreateBrandInput,
  UpdateBrandInput,
} from "@/validators/brand.schema";

/**
 * Obtiene todas las marcas.
 */
export async function findAllBrands() {
  return prisma.brand.findMany({
    include: {
      models: true,
    },
    orderBy: {
      name: "asc",
    },
  });
}

/**
 * Busca una marca por ID.
 */
export async function findBrandById(id: string) {
  return prisma.brand.findUnique({
    where: {
      id,
    },
    include: {
      models: true,
    },
  });
}

/**
 * Busca una marca por nombre.
 */
export async function findBrandByName(name: string) {
  return prisma.brand.findUnique({
    where: {
      name,
    },
  });
}

/**
 * Verifica si una marca existe.
 */
export async function existsBrand(id: string) {
  const brand = await prisma.brand.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });

  return Boolean(brand);
}

/**
 * Verifica si la marca tiene modelos asociados.
 */
export async function brandHasModels(id: string) {
  const count = await prisma.model.count({
    where: {
      brandId: id,
    },
  });

  return count > 0;
}

/**
 * Crea una marca.
 */
export async function createBrand(
  data: CreateBrandInput
) {
  return prisma.brand.create({
    data,
  });
}

/**
 * Actualiza una marca.
 */
export async function updateBrand(
  id: string,
  data: UpdateBrandInput
) {
  return prisma.brand.update({
    where: {
      id,
    },
    data,
  });
}

/**
 * Elimina una marca.
 */
export async function deleteBrand(id: string) {
  return prisma.brand.delete({
    where: {
      id,
    },
  });
}