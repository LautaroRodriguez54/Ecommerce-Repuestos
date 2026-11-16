
import { registerUser } from "@/services/auth/auth.service";
import { registerUserSchema } from "@/validators/user/user.schema";
import { ERROR_MESSAGES } from "@/constants/messages";

import {
  created,
  badRequest,
  conflict,
  serverError,
  unauthorized,
  forbidden,
} from "@/utils/apiResponse";

export async function POST(request: Request) {
  try {
    const validation = registerUserSchema.safeParse(await request.json());

    if (!validation.success) {
      return badRequest(validation.error.issues[0].message);
    }

    return created(await registerUser(validation.data));
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "UNAUTHORIZED") {
        return unauthorized("Debés iniciar sesión.");
      }
      if (error.message === "FORBIDDEN") {
        return forbidden("No tenés permisos para registrar usuarios.");
      }
      if (error.message === ERROR_MESSAGES.USER_ALREADY_EXISTS) {
        return conflict(error.message);
      }
    }

    return serverError();
  }
}
