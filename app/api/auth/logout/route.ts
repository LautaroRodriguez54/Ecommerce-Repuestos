import { cookies } from "next/headers";

import { deleteSession } from "@/services/session/session.service";
import {
  success,
  serverError,
} from "@/utils/apiResponse";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");

    if (sessionCookie) {
      await deleteSession(sessionCookie.value);
    }

    cookieStore.delete("session");

    return success({
      message: "Sesión cerrada correctamente.",
    });
  } catch {
    return serverError();
  }
}