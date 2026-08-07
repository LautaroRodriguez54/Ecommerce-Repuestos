import {
  findAllModels,
  findModelById,
  findModelByNameAndBrand,

  existsModel,
  modelHasProducts,

  createModel as repositoryCreateModel,
  updateModel as repositoryUpdateModel,
  deleteModel as repositoryDeleteModel,
} from "@/repositories/model/model.repository";

import { existsBrand } from "@/repositories/brand/brand.repository";

import {
  CreateModelInput,
  UpdateModelInput,
} from "@/validators/model.schema";

import { ERROR_MESSAGES } from "@/constants/messages";

/**
 * Obtiene todos los modelos.
 */
export async function getAllModels() {
  return findAllModels();
}

/**
 * Obtiene un modelo por ID.
 * Devuelve null si no existe.
 */
export async function getModelById(id: string) {
  return findModelById(id);
}

/**
 * Crea un nuevo modelo.
 */
export async function createModel(
  data: CreateModelInput
) {
  if (!(await existsBrand(data.brandId))) {
    throw new Error(ERROR_MESSAGES.BRAND_NOT_FOUND);
  }

  const existingModel = await findModelByNameAndBrand(
    data.name,
    data.brandId
  );

  if (existingModel) {
    throw new Error(ERROR_MESSAGES.MODEL_ALREADY_EXISTS);
  }

  return repositoryCreateModel(data);
}

/**
 * Actualiza un modelo existente.
 */
export async function updateModel(
  id: string,
  data: UpdateModelInput
) {
  const currentModel = await findModelById(id);

  if (!currentModel) {
    return null;
  }

  const finalName = data.name ?? currentModel.name;
  const finalBrandId = data.brandId ?? currentModel.brandId;

  if (!(await existsBrand(finalBrandId))) {
    throw new Error(ERROR_MESSAGES.BRAND_NOT_FOUND);
  }

  const existingModel = await findModelByNameAndBrand(
    finalName,
    finalBrandId
  );

  if (existingModel && existingModel.id !== id) {
    throw new Error(ERROR_MESSAGES.MODEL_ALREADY_EXISTS);
  }

  return repositoryUpdateModel(id, data);
}

/**
 * Elimina un modelo.
 */
export async function deleteModel(id: string) {
  if (!(await existsModel(id))) {
    return null;
  }

  if (await modelHasProducts(id)) {
    throw new Error(ERROR_MESSAGES.MODEL_HAS_PRODUCTS);
  }

  return repositoryDeleteModel(id);
}