import {
  getBrandById,
  updateBrand,
  deleteBrand,
} from "@/services/brand/brand.service";

import { 
  updateBrandSchema, 
  createBrandSchema 
} from "@/validators/brand.schema";

import { ERROR_MESSAGES } from "@/constants/messages";

import {
  success,
  badRequest,
  notFound,
  conflict,
  serverError,
} from "@/utils/apiResponse";

/**
 * GET /api/marcas/:id
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const brand = await getBrandById(id);

    if (!brand) {
      return notFound(ERROR_MESSAGES.BRAND_NOT_FOUND);
    }

    return success(brand);
  } catch {
    return serverError();
  }
}

/**
 * PUT /api/marcas/:id
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const validation = updateBrandSchema.safeParse(body);

    if (!validation.success) {
      return badRequest(validation.error.issues[0].message);
    }

    const brand = await updateBrand(id, validation.data);

    if (!brand) {
      return notFound(ERROR_MESSAGES.BRAND_NOT_FOUND);
    }

    return success(brand);
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

/**
 * DELETE /api/marcas/:id
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const brand = await deleteBrand(id);

    if (!brand) {
      return notFound(ERROR_MESSAGES.BRAND_NOT_FOUND);
    }

    return success({
      message: "Marca eliminada correctamente.",
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === ERROR_MESSAGES.BRAND_HAS_MODELS
    ) {
      return conflict(error.message);
    }

    return serverError();
  }
}