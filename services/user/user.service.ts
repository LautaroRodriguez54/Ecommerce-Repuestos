import "server-only";
import {
  findAllUsers,
  findActiveUsers,
  findUserById,
  findUserByEmail,
  createUser as repositoryCreateUser,
  updateUser as repositoryUpdateUser,
  deleteUser as repositoryDeleteUser,
} from "@/repositories/user/user.repository";

import { ERROR_MESSAGES } from "@/constants/messages";
import { requireAdmin } from "@/services/auth/authorization.service";


/**
 * Obtiene todos los usuarios.
 * Requiere ADMIN.
 */
export async function getAllUsers() {
  await requireAdmin();

  return findAllUsers();
}


/**
 * Obtiene únicamente los usuarios activos.
 * Requiere ADMIN.
 */
export async function getActiveUsers() {
  await requireAdmin();

  return findActiveUsers();
}


/**
 * Obtiene un usuario por ID.
 * Requiere ADMIN.
 */
export async function getUserById(id: string) {
  await requireAdmin();

  return findUserById(id);
}

/**
 * Crea un nuevo usuario.
 * Requiere ADMIN.
 *
 * El email debe ser único.
 */
export async function createUser(
  data: Parameters<typeof repositoryCreateUser>[0]
) {
  await requireAdmin();

  const existingUser = await findUserByEmail(data.email);

  if (existingUser) {
    throw new Error(ERROR_MESSAGES.USER_ALREADY_EXISTS);
  }

  return repositoryCreateUser(data);
}

/**
 * Actualiza un usuario existente.
 * Requiere ADMIN.
 */
export async function updateUser(
  id: string,
  data: Parameters<typeof repositoryUpdateUser>[1]
) {
  await requireAdmin();
  const user = await findUserById(id);

  if (!user) {
    return null;
  }

  if (data.email && typeof data.email === "string") {
    const existingUser = await findUserByEmail(data.email);

    if (existingUser && existingUser.id !== id) {
      throw new Error(ERROR_MESSAGES.USER_ALREADY_EXISTS);
    }
  }

  return repositoryUpdateUser(id, data);
}

/**
 * Realiza un Soft Delete del usuario.
 * Requiere ADMIN.
 */
export async function deleteUser(id: string) {
  await requireAdmin();

  const user = await findUserById(id);

  if (!user) {
    return null;
  }

  return repositoryDeleteUser(id);
}
