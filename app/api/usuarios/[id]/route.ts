import {
  getUserById,
  updateUser,
  deleteUser,
} from "@/services/user/user.service";

import {
  updateUserSchema,
} from "@/validators/user.schema";

import { ERROR_MESSAGES } from "@/constants/messages";

import {
  success,
  badRequest,
  notFound,
  conflict,
  serverError,
} from "@/utils/apiResponse";

/**
 * GET /api/usuarios/:id
 * Obtiene un usuario por ID.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const user = await getUserById(id);

    if (!user) {
      return notFound(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    return success(user);
  } catch {
    return serverError();
  }
}

/**
 * PUT /api/usuarios/:id
 * Actualiza un usuario existente.
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const validation = updateUserSchema.safeParse(body);

    if (!validation.success) {
      return badRequest(validation.error.issues[0].message);
    }

    const user = await updateUser(id, validation.data);

    if (!user) {
      return notFound(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    return success(user);
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

/**
 * DELETE /api/usuarios/:id
 * Elimina un usuario.
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const user = await deleteUser(id);

    if (!user) {
      return notFound(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    return success({
      message: "Usuario eliminado correctamente.",
    });
  } catch {
    return serverError();
  }
}