
import {
  createProductSchema,
} from "@/validators/product/product.schema";

import {
  createProduct,
  getActiveProducts,
} from "@/services/product/product.service";

import { ERROR_MESSAGES } from "@/constants/messages";

import {
  badRequest,
  created,
  serverError,
  success,
  unauthorized,
  forbidden,
  conflict,
} from "@/utils/apiResponse";
import { requireAdmin } from "@/utils/adminAuthorization";

export async function GET() {
  try {
    return success(await getActiveProducts());
  } catch {
    return serverError();
  }
}

export async function POST(request: Request) {
  try {
    const validation = createProductSchema.safeParse(await request.json());
    if (!validation.success) {
      return badRequest(validation.error.issues[0].message);
    }

    return created(await createProduct(validation.data));
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "UNAUTHORIZED") {
        return unauthorized("Debés iniciar sesión.");
      }
      if (error.message === "FORBIDDEN") {
        return forbidden("No tenés permisos para crear productos.");
      }
      if (error.message === ERROR_MESSAGES.PRODUCT_ALREADY_EXISTS) {
        return conflict(error.message);
      }
    }
    return serverError();
  }
}
