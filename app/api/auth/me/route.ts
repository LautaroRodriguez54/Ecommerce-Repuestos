import { cookies } from "next/headers";

import { getSessionByToken } from "@/services/session/session.service";
import {
  success,
  unauthorized,
  serverError,
} from "@/utils/apiResponse";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");

    if (!sessionCookie) {
      return unauthorized("No hay una sesión activa.");
    }

    const session = await getSessionByToken(sessionCookie.value);

    if (!session) {
      return unauthorized("La sesión no es válida.");
    }

    return success({
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      role: session.user.role,
      isActive: session.user.isActive,
    });
  } catch {
    return serverError();
  }
}