import {
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "@/services/category/category.service";

import { 
  createCategorySchema, 
  updateCategorySchema 
} from "@/validators/category/category.schema";
  
import { ERROR_MESSAGES } from "@/constants/messages";

import {
  success,
  badRequest,
  notFound,
  conflict,
  serverError,
} from "@/utils/apiResponse";

/**
 * GET /api/categorias/:id
 * Obtiene una categoría por ID.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const category = await getCategoryById(id);

    if (!category) {
      return notFound(ERROR_MESSAGES.CATEGORY_NOT_FOUND);
    }

    return success(category);
  } catch {
    return serverError();
  }
}

/**
 * PUT /api/categorias/:id
 * Actualiza una categoría.
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const validation = updateCategorySchema.safeParse(body);

    if (!validation.success) {
      return badRequest(validation.error.issues[0].message);
    }

    const category = await updateCategory(id, validation.data);

    if (!category) {
      return notFound(ERROR_MESSAGES.CATEGORY_NOT_FOUND);
    }

    return success(category);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === ERROR_MESSAGES.CATEGORY_ALREADY_EXISTS
    ) {
      return conflict(error.message);
    }

    return serverError();
  }
}

/**
 * DELETE /api/categorias/:id
 * Elimina una categoría.
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const category = await deleteCategory(id);

    if (!category) {
      return notFound(ERROR_MESSAGES.CATEGORY_NOT_FOUND);
    }

    return success({
      message: "Categoría eliminada correctamente.",
    });
  } catch (error) {
  if (
    error instanceof Error &&
    error.message === ERROR_MESSAGES.CATEGORY_HAS_PRODUCTS
  ) {
    return conflict(error.message);
  }

  return serverError();
  }
}