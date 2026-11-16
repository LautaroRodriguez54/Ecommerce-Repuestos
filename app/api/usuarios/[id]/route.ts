
import {
  getUserById,
  updateUser,
  deleteUser,
} from "@/services/user/user.service";

import { updateUserSchema } from "@/validators/user/user.schema";
import { ERROR_MESSAGES } from "@/constants/messages";

import {
  success,
  badRequest,
  notFound,
  conflict,
  serverError,
  unauthorized,
  forbidden,
} from "@/utils/apiResponse";
import { requireAdmin } from "@/utils/adminAuthorization";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUserById((await params).id);
    if (!user) return notFound(ERROR_MESSAGES.USER_NOT_FOUND);

    return success(user);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "UNAUTHORIZED") {
        return unauthorized("Debés iniciar sesión.");
      }
      if (error.message === "FORBIDDEN") {
        return forbidden("No tenés permisos para consultar este usuario.");
      }
    }
    return serverError();
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authorizationError = await requireAdmin();
    if (authorizationError) return authorizationError;

    const { id } = await params;
    const validation = updateUserSchema.safeParse(await request.json());

    if (!validation.success) {
      return badRequest(validation.error.issues[0].message);
    }

    const user = await updateUser(id, validation.data);

    if (!user) return notFound(ERROR_MESSAGES.USER_NOT_FOUND);

    return success(user);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "UNAUTHORIZED") {
        return unauthorized("Debés iniciar sesión.");
      }
      if (error.message === "FORBIDDEN") {
        return forbidden("No tenés permisos para actualizar usuarios.");
      }
      if (error.message === ERROR_MESSAGES.USER_ALREADY_EXISTS) {
        return conflict(error.message);
      }
    }
    return serverError();
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await deleteUser((await params).id);
    if (!user) return notFound(ERROR_MESSAGES.USER_NOT_FOUND);

    return success({ message: "Usuario eliminado correctamente." });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "UNAUTHORIZED") {
        return unauthorized("Debés iniciar sesión.");
      }
      if (error.message === "FORBIDDEN") {
        return forbidden("No tenés permisos para eliminar usuarios.");
      }
    }
    return serverError();
  }
}
