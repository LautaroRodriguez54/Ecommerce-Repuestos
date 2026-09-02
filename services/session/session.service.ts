import crypto from "crypto";

import {
  createSession as repositoryCreateSession,
  findSessionByToken,
  deleteSession as repositoryDeleteSession,
} from "@/repositories/session/session.repository";

const SESSION_DURATION_DAYS = 7;

export async function createSession(userId: string) {
  const token = crypto.randomBytes(32).toString("hex");

  const expiresAt = new Date();

  expiresAt.setDate(
    expiresAt.getDate() + SESSION_DURATION_DAYS
  );

  return repositoryCreateSession(
    token,
    userId,
    expiresAt
  );
}

export async function getSessionByToken(token: string) {
  const session = await findSessionByToken(token);

  if (!session) {
    return null;
  }

  if (session.expiresAt <= new Date()) {
    await repositoryDeleteSession(token);

    return null;
  }

  if (!session.user.isActive) {
    await repositoryDeleteSession(token);

    return null;
  }

  return session;
}

export async function deleteSession(token: string) {
  return repositoryDeleteSession(token);
}