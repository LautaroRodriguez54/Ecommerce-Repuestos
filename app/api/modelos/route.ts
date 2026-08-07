import {
  getAllModels,
  createModel,
} from "@/services/model/model.service";

import {
  createModelSchema,
  updateModelSchema,
} from "@/validators/model.schema";

import { ERROR_MESSAGES } from "@/constants/messages";

import {
  success,
  created,
  badRequest,
  conflict,
  notFound,
  serverError,
} from "@/utils/apiResponse";

/**
 * GET /api/modelos
 * Obtiene todos los modelos.
 */
export async function GET() {
  try {
    const models = await getAllModels();

    return success(models);
  } catch {
    return serverError();
  }
}

/**
 * POST /api/modelos
 * Crea un nuevo modelo.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validation = createModelSchema.safeParse(body);

    if (!validation.success) {
      return badRequest(validation.error.issues[0].message);
    }

    const model = await createModel(validation.data);

    return created(model);
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