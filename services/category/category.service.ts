import {
  findAllCategories,
  findCategoryById,
  findCategoryByName,
  existsCategory,
  createCategory as repositoryCreateCategory,
  updateCategory as repositoryUpdateCategory,
  deleteCategory as repositoryDeleteCategory,
  categoryHasProducts as repositoryCategoryHasProducts,
} from "@/repositories/category/category.repository";

import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "@/validators/category.schema";

import { ERROR_MESSAGES } from "@/constants/messages";

/**
 * Obtiene todas las categorías.
 */
export async function getAllCategories() {
  return findAllCategories();
}

/**
 * Obtiene una categoría por ID.
 * Devuelve null si no existe.
 */
export async function getCategoryById(id: string) {
  return findCategoryById(id);
}

/**
 * Crea una nueva categoría.
 */
export async function createCategory(
  data: CreateCategoryInput
) {
  const existingCategory = await findCategoryByName(data.name);

  if (existingCategory) {
    throw new Error(ERROR_MESSAGES.CATEGORY_ALREADY_EXISTS);
  }

  return repositoryCreateCategory(data);
}

/**
 * Actualiza una categoría existente.
 */
export async function updateCategory(
  id: string,
  data: UpdateCategoryInput
) {
  const exists = await existsCategory(id);

  if (!exists) {
    return null;
  }

  if (data.name) {
    const existingCategory = await findCategoryByName(data.name);

    if (existingCategory && existingCategory.id !== id) {
      throw new Error(ERROR_MESSAGES.CATEGORY_ALREADY_EXISTS);
    }
  }

  return repositoryUpdateCategory(id, data);
}

/**
 * Elimina una categoría.
 */
export async function deleteCategory(id: string) {
  const exists = await existsCategory(id);

  if (!exists) {
    return null;
  }

  const hasProducts = await repositoryCategoryHasProducts(id);

  if (hasProducts) {
    throw new Error(ERROR_MESSAGES.CATEGORY_HAS_PRODUCTS);
  }

  return repositoryDeleteCategory(id);
}