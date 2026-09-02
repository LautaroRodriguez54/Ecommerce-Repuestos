import bcrypt from "bcryptjs";

import {
  findUserByEmail,
  findUserByEmailWithPassword,
  createUser as repositoryCreateUser,
} from "@/repositories/user/user.repository";

import { ERROR_MESSAGES } from "@/constants/messages";

import { createSession } from "@/services/session/session.service";

export async function registerUser(
  data: {
    name: string;
    email: string;
    password: string;
  }
) {
  const existingUser = await findUserByEmail(data.email);

  if (existingUser) {
    throw new Error(ERROR_MESSAGES.USER_ALREADY_EXISTS);
  }

  const hashedPassword = await bcrypt.hash(data.password, 12);

  return repositoryCreateUser({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    role: "CLIENT",
    isActive: true,
  });
}

export async function loginUser(
  data: {
    email: string;
    password: string;
  }
) {
  const user = await findUserByEmailWithPassword(data.email);

  if (!user) {
    throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
  }

  if (!user.isActive) {
    throw new Error(ERROR_MESSAGES.USER_INACTIVE);
  }

  const passwordMatches = await bcrypt.compare(
    data.password,
    user.password
  );

  if (!passwordMatches) {
    throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
  }

  const session = await createSession(user.id);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    },
    token: session.token,
};
} 