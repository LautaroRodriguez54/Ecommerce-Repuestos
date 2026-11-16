import "server-only";

import {
  findAllProducts,
  findActiveProducts,
  findProductById,
  findProductBySku,
  createProduct as repositoryCreateProduct,
  updateProduct as repositoryUpdateProduct,
  deleteProduct as repositoryDeleteProduct,
} from "@/repositories/product/product.repository";

import type { ProductInput } from "@/validators/product/product.schema";
import { ERROR_MESSAGES } from "@/constants/messages";
import { requireAdmin } from "@/services/auth/authorization.service";

export async function getAllProducts() {
  return findAllProducts();
}

export async function getActiveProducts() {
  return findActiveProducts();
}

export async function getProductById(id: string) {
  return findProductById(id);
}

export async function createProduct(data: ProductInput) {
  await requireAdmin();

  if (await findProductBySku(data.sku)) {
    throw new Error(ERROR_MESSAGES.PRODUCT_ALREADY_EXISTS);
  }

  return repositoryCreateProduct(data);
}

export async function updateProduct(id: string, data: Partial<ProductInput>) {
  await requireAdmin();

  const product = await findProductById(id);
  if (!product) return null;

  if (data.sku && data.sku !== product.sku) {
    const existingProduct = await findProductBySku(data.sku);

    if (existingProduct) {
      throw new Error(ERROR_MESSAGES.PRODUCT_ALREADY_EXISTS);
    }
  }

  return repositoryUpdateProduct(id, data);
}

export async function deleteProduct(id: string) {
  await requireAdmin();

  if (!(await findProductById(id))) return null;

  return repositoryDeleteProduct(id);
}
