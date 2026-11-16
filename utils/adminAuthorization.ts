import { authorizeAdmin } from "@/services/auth/admin-authorization.service";
import { forbidden, unauthorized } from "@/utils/apiResponse";

/**
 * Devuelve una respuesta HTTP cuando la solicitud no pertenece a un admin.
 * Las rutas deben retornar el resultado antes de ejecutar la operación.
 */
export async function requireAdmin() {
  const authorization = await authorizeAdmin();

  if (authorization.authorized) {
    return null;
  }

  return authorization.reason === "UNAUTHENTICATED"
    ? unauthorized("No hay una sesión válida.")
    : forbidden("No tenés permisos de administrador.");
}
