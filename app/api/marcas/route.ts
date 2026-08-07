import {
  getAllBrands,
  createBrand,
} from "@/services/brand/brand.service";

import { 
  updateBrandSchema, 
  createBrandSchema 
} from "@/validators/brand.schema";

import { ERROR_MESSAGES } from "@/constants/messages";

import {
  success,
  created,
  badRequest,
  conflict,
  serverError,
} from "@/utils/apiResponse";

/**
 * GET /api/marcas
 * Obtiene todas las marcas.
 */
export async function GET() {
  try {
    const brands = await getAllBrands();

    return success(brands);
  } catch {
    return serverError();
  }
}

/**
 * POST /api/marcas
 * Crea una nueva marca.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validation = createBrandSchema.safeParse(body);

    if (!validation.success) {
      return badRequest(validation.error.issues[0].message);
    }

    const brand = await createBrand(validation.data);

    return created(brand);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === ERROR_MESSAGES.BRAND_ALREADY_EXISTS
    ) {
      return conflict(error.message);
    }

    return serverError();
  }
}