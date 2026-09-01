import {
  getAllUsers,
  createUser,
} from "@/services/user/user.service";

import { createUserSchema } from "@/validators/user.schema";

import { ERROR_MESSAGES } from "@/constants/messages";

import {
  success,
  created,
  badRequest,
  conflict,
  serverError,
} from "@/utils/apiResponse";

/**
 * GET /api/usuarios
 * Obtiene todos los usuarios.
 */
export async function GET() {
  try {
    const users = await getAllUsers();

    return success(users);
  } catch {
    return serverError();
  }
}

/**
 * POST /api/usuarios
 * Crea un nuevo usuario.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validation = createUserSchema.safeParse(body);

    if (!validation.success) {
      return badRequest(validation.error.issues[0].message);
    }

    const user = await createUser(validation.data);

    return created(user);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === ERROR_MESSAGES.USER_ALREADY_EXISTS
    ) {
      return conflict(error.message);
    }

    return serverError();
  }
}