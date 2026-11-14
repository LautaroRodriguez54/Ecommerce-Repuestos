
import crypto from "crypto";

import {
  createSession as repositoryCreateSession,
  findSessionByToken,
  deleteSession as repositoryDeleteSession,
  deletePasswordResetSessions as repositoryDeletePasswordResetSessions,
  consumePasswordResetCode as repositoryConsumePasswordResetCode,
  deleteAllUserSessions as repositoryDeleteAllUserSessions,
} from "@/repositories/session/session.repository";

const SESSION_DURATION_DAYS = 7;
const RESET_CODE_DURATION_MINUTES = 15;
const RESET_TOKEN_PREFIX = "password-reset:";

const hashCode = (code: string) =>
  crypto.createHash("sha256").update(code).digest("hex");

const isValidSession = async (token: string) => {
  const session = await findSessionByToken(token);

  if (!session) return null;

  if (session.expiresAt <= new Date() || !session.user.isActive) {
    await repositoryDeleteSession(token);
    return null;
  }

  return session;
};

export async function createSession(userId: string) {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_DURATION_DAYS * 86400000);

  return repositoryCreateSession(token, userId, expiresAt);
}

export async function getSessionByToken(token: string) {
  if (token.startsWith(RESET_TOKEN_PREFIX)) return null;

  return isValidSession(token);
}

export async function deleteSession(token: string) {
  return repositoryDeleteSession(token);
}

export async function createPasswordResetCode(userId: string) {
  const code = crypto.randomInt(100000, 1000000).toString();
  const token = `${RESET_TOKEN_PREFIX}${hashCode(code)}`;
  const expiresAt = new Date(Date.now() + RESET_CODE_DURATION_MINUTES * 60000);

  await repositoryDeletePasswordResetSessions(userId);
  await repositoryCreateSession(token, userId, expiresAt);

  return code;
}

export async function getPasswordResetSession(code: string) {
  if (!/^\d{6}$/.test(code)) return null;

  return isValidSession(`${RESET_TOKEN_PREFIX}${hashCode(code)}`);
}

export async function deletePasswordResetCode(code: string) {
  return repositoryDeleteSession(`${RESET_TOKEN_PREFIX}${hashCode(code)}`);
}

export async function consumePasswordResetCode(token: string) {
  return (await repositoryConsumePasswordResetCode(token)).count > 0;
}

export async function deleteAllUserSessions(userId: string) {
  return repositoryDeleteAllUserSessions(userId);
}
