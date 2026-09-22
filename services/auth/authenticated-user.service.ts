import { cookies } from "next/headers";

import { getSessionByToken } from "@/services/session/session.service";

export async function getAuthenticatedUser() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");

  if (!sessionCookie) {
    return null;
  }

  const session = await getSessionByToken(sessionCookie.value);

  if (!session) {
    return null;
  }

  return session.user;
}