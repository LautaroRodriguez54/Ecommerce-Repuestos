import { productSchema } from "@/validators/product.schema";
import { ERROR_MESSAGES } from "@/constants/messages";
import {
  getProductById,
  updateProduct,
  deleteProduct,
} from "@/services/product/product.service";


import {
  success,
  badRequest,
  notFound,
  serverError,
  conflict,
} from "@/utils/apiResponse";

/**
 * GET /api/productos/:id
 * Obtiene un producto por ID.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const product = await getProductById(id);

    if (!product) {
      return notFound("Producto no encontrado.");
    }

    return success(product);
  } catch (error) {
  console.error(error);

  return serverError();
    }
}

/**
 * PUT /api/productos/:id
 * Actualiza un producto existente.
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const validation = productSchema.safeParse(body);

    if (!validation.success) {
      return badRequest(validation.error.issues[0].message);
    }

    const product = await updateProduct(id, validation.data);

    if (!product) {
      return notFound("Producto no encontrado.");
    }

    return success(product);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === ERROR_MESSAGES.PRODUCT_ALREADY_EXISTS
    ) {
      return conflict(error.message);
    }

    return serverError();
  }
}

/**
 * DELETE /api/productos/:id
 * Soft Delete.
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await deleteProduct(id);

    return success({
      message: "Producto eliminado correctamente.",
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === ERROR_MESSAGES.PRODUCT_NOT_FOUND
    ) {
      return notFound(error.message);
    }

    return serverError();
  }
}