import "server-only";
import bcrypt from "bcryptjs";

import {
  findUserByEmail,
  findUserByEmailWithPassword,
  createUser as repositoryCreateUser,
  updateUser as repositoryUpdateUser,
} from "@/repositories/user/user.repository";

import { ERROR_MESSAGES } from "@/constants/messages";
import { requireAdmin } from "@/services/auth/authorization.service";
import {
  createSession,
  createPasswordResetCode,
  getPasswordResetSession,
  consumePasswordResetCode,
  deleteAllUserSessions,
} from "@/services/session/session.service";
import { sendEmail } from "@/services/email/email.service";

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  await requireAdmin();

  if (await findUserByEmail(data.email)) {
    throw new Error(ERROR_MESSAGES.USER_ALREADY_EXISTS);
  }

  return repositoryCreateUser({
    ...data,
    password: await bcrypt.hash(data.password, 12),
    role: "CLIENT",
    isActive: true,
  });
}

export async function loginUser(data: {
  email: string;
  password: string;
}) {
  const user = await findUserByEmailWithPassword(data.email);

  if (!user) throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
  if (!user.isActive) throw new Error(ERROR_MESSAGES.USER_INACTIVE);

  if (!(await bcrypt.compare(data.password, user.password))) {
    throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
  }

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    },
    token: (await createSession(user.id)).token,
  };
}

export async function requestPasswordReset(email: string) {
  const user = await findUserByEmail(email);
  if (!user?.isActive) return;

  const code = await createPasswordResetCode(user.id);

  return sendEmail({
    to: user.email,
    subject: "Código para recuperar tu contraseña",
    text: `Hola ${user.name}:

Recibimos una solicitud para recuperar tu contraseña.

Tu código de recuperación es: ${code}

Este código vence en 15 minutos y solo puede utilizarse una vez.

Si no solicitaste este cambio, podés ignorar este correo.`,
  });
}

export async function resetPassword(data: {
  code: string;
  password: string;
}) {
  const session = await getPasswordResetSession(data.code);

  if (!session) {
    throw new Error("El código es inválido o ha vencido.");
  }

  if (!(await consumePasswordResetCode(session.token))) {
    throw new Error("El código es inválido o ya fue utilizado.");
  }

  await repositoryUpdateUser(session.userId, {
    password: await bcrypt.hash(data.password, 12),
  });

  await deleteAllUserSessions(session.userId);
}

export async function verifyPasswordResetCode(code: string) {
  if (!(await getPasswordResetSession(code))) {
    throw new Error("El código es inválido o ha vencido.");
  }

  return true;
}
