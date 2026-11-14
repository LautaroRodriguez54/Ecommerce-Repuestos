
import { updateProductSchema } from "@/validators/product/product.schema";
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
  unauthorized,
  forbidden,
} from "@/utils/apiResponse";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const product = await getProductById((await params).id);

    if (!product) return notFound(ERROR_MESSAGES.PRODUCT_NOT_FOUND);

    return success(product);
  } catch {
    return serverError();
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const validation = updateProductSchema.safeParse(await request.json());

    if (!validation.success) {
      return badRequest(validation.error.issues[0].message);
    }

    const product = await updateProduct(id, validation.data);

    if (!product) return notFound(ERROR_MESSAGES.PRODUCT_NOT_FOUND);

    return success(product);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "UNAUTHORIZED") {
        return unauthorized("Debés iniciar sesión.");
      }
      if (error.message === "FORBIDDEN") {
        return forbidden("No tenés permisos para actualizar productos.");
      }
      if (error.message === ERROR_MESSAGES.PRODUCT_ALREADY_EXISTS) {
        return conflict(error.message);
      }
    }
    return serverError();
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const product = await deleteProduct((await params).id);

    if (!product) return notFound(ERROR_MESSAGES.PRODUCT_NOT_FOUND);

    return success({ message: "Producto eliminado correctamente." });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "UNAUTHORIZED") {
        return unauthorized("Debés iniciar sesión.");
      }
      if (error.message === "FORBIDDEN") {
        return forbidden("No tenés permisos para eliminar productos.");
      }
    }
    return serverError();
  }
}
