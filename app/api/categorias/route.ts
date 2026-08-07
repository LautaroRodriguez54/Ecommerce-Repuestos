import {
  getAllCategories,
  createCategory,
} from "@/services/category/category.service";

import { 
  createCategorySchema, 
  updateCategorySchema 
} from "@/validators/category.schema";

import { ERROR_MESSAGES } from "@/constants/messages";

import {
  success,
  created,
  badRequest,
  conflict,
  serverError,
} from "@/utils/apiResponse";

/**
 * GET /api/categorias
 * Obtiene todas las categorías.
 */
export async function GET() {
  try {
    const categories = await getAllCategories();

    return success(categories);
  } catch {
    return serverError();
  }
}

/**
 * POST /api/categorias
 * Crea una nueva categoría.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validation = createCategorySchema.safeParse(body);

    if (!validation.success) {
      return badRequest(validation.error.issues[0].message);
    }

    const category = await createCategory(validation.data);

    return created(category);
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