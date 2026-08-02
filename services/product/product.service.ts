import {
  findAllProducts,
  findActiveProducts,
  findProductById,
  findProductBySku,

  createProduct as repositoryCreateProduct,
  updateProduct as repositoryUpdateProduct,
  deleteProduct as repositoryDeleteProduct,
} from "@/repositories/product/product.repository";

import { ERROR_MESSAGES } from "@/constants/messages";

/**
 * Verifica que un producto exista.
 * Lanza un error si no existe.
 */
async function requireProduct(id: string) {
  const product = await findProductById(id);

  if (!product) {
    throw new Error(ERROR_MESSAGES.PRODUCT_NOT_FOUND);
  }

  return product;
}

/**
 * Obtiene todos los productos.
 * Uso: Panel de administración.
 */
export async function getAllProducts() {
  return findAllProducts();
}

/**
 * Obtiene únicamente los productos activos.
 * Uso: Catálogo público.
 */
export async function getActiveProducts() {
  return findActiveProducts();
}

/**
 * Obtiene un producto por ID.
 */
export async function getProductById(id: string) {
  return requireProduct(id);
}

/**
 * Crea un nuevo producto.
 */
export async function createProduct(data: any) {
  const existingProduct = await findProductBySku(data.sku);

  if (existingProduct) {
    throw new Error(ERROR_MESSAGES.PRODUCT_ALREADY_EXISTS);
  }

  return repositoryCreateProduct(data);
}

/**
 * Actualiza un producto existente.
 */
export async function updateProduct(
  id: string,
  data: any
) {
  const product = await requireProduct(id);

  if (data.sku && data.sku !== product.sku) {
    const existingProduct = await findProductBySku(data.sku);

    if (existingProduct && existingProduct.id !== id) {
      throw new Error(ERROR_MESSAGES.PRODUCT_ALREADY_EXISTS);
    }
  }

  return repositoryUpdateProduct(id, data);
}

/**
 * Realiza un Soft Delete del producto.
 */
export async function deleteProduct(id: string) {
  await requireProduct(id);

  return repositoryDeleteProduct(id);
}