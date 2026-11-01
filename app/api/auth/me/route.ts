import { getAuthenticatedUser } from "@/services/auth/authenticated-user.service";

import {
  success,
  unauthorized,
  serverError,
} from "@/utils/apiResponse";

export async function GET() {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return unauthorized("No hay una sesión válida.");
    }

    return success({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    });
  } catch {
    return serverError();
  }
}