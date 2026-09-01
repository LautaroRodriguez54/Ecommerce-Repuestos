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

/**
 * Obtiene todos los usuarios.
 * Uso: Panel de administración.
 */
export async function getAllUsers() {
  return findAllUsers();
}

/**
 * Obtiene únicamente los usuarios activos.
 */
export async function getActiveUsers() {
  return findActiveUsers();
}

/**
 * Obtiene un usuario por ID.
 *
 * Devuelve null si no existe.
 */
export async function getUserById(id: string) {
  return findUserById(id);
}

/**
 * Crea un nuevo usuario.
 *
 * El email debe ser único.
 */
export async function createUser(
  data: Parameters<typeof repositoryCreateUser>[0]
) {
  const existingUser = await findUserByEmail(data.email);

  if (existingUser) {
    throw new Error(ERROR_MESSAGES.USER_ALREADY_EXISTS);
  }

  return repositoryCreateUser(data);
}

/**
 * Actualiza un usuario existente.
 */
export async function updateUser(
  id: string,
  data: Parameters<typeof repositoryUpdateUser>[1]
) {
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
 */
export async function deleteUser(id: string) {
  const user = await findUserById(id);

  if (!user) {
    return null;
  }

  return repositoryDeleteUser(id);
}