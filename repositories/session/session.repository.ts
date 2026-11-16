
import prisma from "@/lib/prisma";

export async function createSession(
  token: string,
  userId: string,
  expiresAt: Date
) {
  return prisma.session.create({
    data: { token, userId, expiresAt },
  });
}

export async function findSessionByToken(token: string) {
  return prisma.session.findUnique({
    where: { token },
    include: { user: true },
  });
}

export async function deleteSession(token: string) {
  return prisma.session.delete({ where: { token } });
}

export async function deletePasswordResetSessions(userId: string) {
  return prisma.session.deleteMany({
    where: { userId, token: { startsWith: "password-reset:" } },
  });
}

export async function consumePasswordResetCode(token: string) {
  return prisma.session.deleteMany({
    where: { token, expiresAt: { gt: new Date() } },
  });
}

export async function deleteAllUserSessions(userId: string) {
  return prisma.session.deleteMany({ where: { userId } });
}
