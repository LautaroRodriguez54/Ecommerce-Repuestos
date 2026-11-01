import {
  getModelById,
  updateModel,
  deleteModel,
} from "@/services/model/model.service";

import {
  createModelSchema,
  updateModelSchema,
} from "@/validators/model/model.schema";

import { ERROR_MESSAGES } from "@/constants/messages";

import {
  success,
  badRequest,
  notFound,
  conflict,
  serverError,
} from "@/utils/apiResponse";

/**
 * GET /api/modelos/:id
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const model = await getModelById(id);

    if (!model) {
      return notFound(ERROR_MESSAGES.MODEL_NOT_FOUND);
    }

    return success(model);
  } catch {
    return serverError();
  }
}

/**
 * PUT /api/modelos/:id
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const validation = updateModelSchema.safeParse(body);

    if (!validation.success) {
      return badRequest(validation.error.issues[0].message);
    }

    const model = await updateModel(id, validation.data);

    if (!model) {
      return notFound(ERROR_MESSAGES.MODEL_NOT_FOUND);
    }

    return success(model);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === ERROR_MESSAGES.MODEL_ALREADY_EXISTS
    ) {
      return conflict(error.message);
    }

    if (
      error instanceof Error &&
      error.message === ERROR_MESSAGES.BRAND_NOT_FOUND
    ) {
      return notFound(error.message);
    }

    return serverError();
  }
}

/**
 * DELETE /api/modelos/:id
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const model = await deleteModel(id);

    if (!model) {
      return notFound(ERROR_MESSAGES.MODEL_NOT_FOUND);
    }

    return success({
      message: "Modelo eliminado correctamente.",
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === ERROR_MESSAGES.MODEL_HAS_PRODUCTS
    ) {
      return conflict(error.message);
    }

    return serverError();
  }
}