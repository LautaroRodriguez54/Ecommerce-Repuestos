import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

/**
 * Campos públicos de un usuario.
 *
 * La contraseña nunca debe ser devuelta por el repository.
 */
const publicUserSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
};

/**
 * Obtiene todos los usuarios.
 * Uso: Panel de administración.
 */
export async function findAllUsers() {
  return prisma.user.findMany({
    select: publicUserSelect,
    orderBy: {
      createdAt: "desc",
    },
  });
}

/**
 * Obtiene únicamente los usuarios activos.
 */
export async function findActiveUsers() {
  return prisma.user.findMany({
    where: {
      isActive: true,
    },
    select: publicUserSelect,
    orderBy: {
      createdAt: "desc",
    },
  });
}

/**
 * Busca un usuario por ID.
 */
export async function findUserById(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
    select: publicUserSelect,
  });
}

/**
 * Busca un usuario por email.
 *
 * Se utiliza principalmente para verificar
 * existencia y durante el proceso de autenticación.
 */
export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
    select: publicUserSelect,
  });
}

/**
 * Busca un usuario por email incluyendo su contraseña.
 *
 * Uso exclusivo para autenticación.
 */
export async function findUserByEmailWithPassword(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

/**
 * Verifica si un usuario existe.
 */
export async function existsUser(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });

  return Boolean(user);
}

/**
 * Crea un usuario.
 */
export async function createUser(data: Prisma.UserCreateInput) {
  return prisma.user.create({
    data,
    select: publicUserSelect,
  });
}

/**
 * Actualiza un usuario.
 */
export async function updateUser(
  id: string,
  data: Prisma.UserUpdateInput
) {
  return prisma.user.update({
    where: {
      id,
    },
    data,
    select: publicUserSelect,
  });
}

/**
 * Soft Delete.
 */
export async function deleteUser(id: string) {
  return prisma.user.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
    select: publicUserSelect,
  });
}