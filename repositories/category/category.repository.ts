import prisma from "@/lib/prisma";

import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "@/validators/category/category.schema";

/**
 * Obtiene todas las categorías.
 */
export async function findAllCategories() {
  return prisma.category.findMany({
    include: {
      products: true,
    },
    orderBy: {
      name: "asc",
    },
  });
}

/**
 * Busca una categoría por ID.
 */
export async function findCategoryById(id: string) {
  return prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      products: true,
    },
  });
}

/**
 * Busca una categoría por nombre.
 */
export async function findCategoryByName(name: string) {
  return prisma.category.findFirst({
    where: {
      name: {
        equals: name,
        mode: "insensitive",
      },
    },
  });
}

/**
 * Verifica si existe una categoría.
 */
export async function existsCategory(id: string) {
  const category = await prisma.category.findUnique({
    where: { id },
    select: { id: true },
  });

  return Boolean(category);
}

/**
 * Crea una categoría.
 */
export async function createCategory(
  data: CreateCategoryInput
) {
  return prisma.category.create({
    data,
  });
}

/**
 * Actualiza una categoría.
 */
export async function updateCategory(
  id: string,
  data: UpdateCategoryInput
) {
  return prisma.category.update({
    where: {
      id,
    },
    data,
  });
}

/**
 * Elimina una categoría.
 */
export async function deleteCategory(id: string) {
  return prisma.category.delete({
    where: {
      id,
    },
  });
}

/**
 * Verifica si la categoría tiene productos asociados.
 */
export async function categoryHasProducts(id: string) {
  const count = await prisma.product.count({
    where: {
      categoryId: id,
    },
  });

  return count > 0;
}