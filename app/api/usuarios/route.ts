
import {
  getAllUsers,
  createUser,
} from "@/services/user/user.service";

import { createUserSchema } from "@/validators/user/user.schema";
import { ERROR_MESSAGES } from "@/constants/messages";

import {
  success,
  created,
  badRequest,
  conflict,
  serverError,
  unauthorized,
  forbidden,
} from "@/utils/apiResponse";

export async function GET() {
  try {
    return success(await getAllUsers());
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "UNAUTHORIZED") {
        return unauthorized("Debés iniciar sesión.");
      }
      if (error.message === "FORBIDDEN") {
        return forbidden("No tenés permisos para consultar los usuarios.");
      }
    }
    return serverError();
  }
}

export async function POST(request: Request) {
  try {
    const validation = createUserSchema.safeParse(await request.json());

    if (!validation.success) {
      return badRequest(validation.error.issues[0].message);
    }

    return created(await createUser(validation.data));
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "UNAUTHORIZED") {
        return unauthorized("Debés iniciar sesión.");
      }
      if (error.message === "FORBIDDEN") {
        return forbidden("No tenés permisos para crear usuarios.");
      }
      if (error.message === ERROR_MESSAGES.USER_ALREADY_EXISTS) {
        return conflict(error.message);
      }
    }
    return serverError();
  }
}
