import { ROLES } from "@/constants/roles";
import { getAuthenticatedUser } from "@/services/auth/authenticated-user.service";

export type AdminAuthorization =
  | { authorized: true }
  | { authorized: false; reason: "UNAUTHENTICATED" | "FORBIDDEN" };

/**
 * Centraliza la autorización de las operaciones administrativas.
 *
 * Los repositories sólo acceden a datos; esta comprobación se hace en la
 * capa de servicio porque es la que conoce la sesión actual.
 */
export async function authorizeAdmin(): Promise<AdminAuthorization> {
  const user = await getAuthenticatedUser();

  if (!user) {
    return { authorized: false, reason: "UNAUTHENTICATED" };
  }

  if (user.role !== ROLES.ADMIN) {
    return { authorized: false, reason: "FORBIDDEN" };
  }

  return { authorized: true };
}
