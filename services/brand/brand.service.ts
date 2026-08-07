import {
  findAllBrands,
  findBrandById,
  findBrandByName,
  existsBrand,
  brandHasModels,

  createBrand as repositoryCreateBrand,
  updateBrand as repositoryUpdateBrand,
  deleteBrand as repositoryDeleteBrand,
} from "@/repositories/brand/brand.repository";

import {
  CreateBrandInput,
  UpdateBrandInput,
} from "@/validators/brand.schema";

import { ERROR_MESSAGES } from "@/constants/messages";

/**
 * Obtiene todas las marcas.
 */
export async function getAllBrands() {
  return findAllBrands();
}

/**
 * Obtiene una marca por ID.
 * Devuelve null si no existe.
 */
export async function getBrandById(id: string) {
  return findBrandById(id);
}

/**
 * Crea una nueva marca.
 */
export async function createBrand(
  data: CreateBrandInput
) {
  const existingBrand = await findBrandByName(data.name);

  if (existingBrand) {
    throw new Error(ERROR_MESSAGES.BRAND_ALREADY_EXISTS);
  }

  return repositoryCreateBrand(data);
}

/**
 * Actualiza una marca existente.
 */
export async function updateBrand(
  id: string,
  data: UpdateBrandInput
) {
  if (!(await existsBrand(id))) {
    return null;
  }

  if (data.name) {
    const existingBrand = await findBrandByName(data.name);

    if (existingBrand && existingBrand.id !== id) {
      throw new Error(ERROR_MESSAGES.BRAND_ALREADY_EXISTS);
    }
  }

  return repositoryUpdateBrand(id, data);
}

/**
 * Elimina una marca.
 */
export async function deleteBrand(id: string) {
  if (!(await existsBrand(id))) {
    return null;
  }

  if (await brandHasModels(id)) {
    throw new Error(ERROR_MESSAGES.BRAND_HAS_MODELS);
  }

  return repositoryDeleteBrand(id);
}