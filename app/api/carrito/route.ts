import { serverError, success, unauthorized } from "@/utils/apiResponse";
import { getAuthenticatedUser } from "@/services/auth/authenticated-user.service";
import { getOrCreateCart } from "@/services/cart/cart.service";

// Las mutaciones viven en /api/carrito/items para que cada ruta tenga una
// única responsabilidad. Este endpoint es la lectura canónica del carrito.
export async function GET() {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return unauthorized("Debés iniciar sesión para ver tu carrito.");
    }

    return success(await getOrCreateCart(user.id));
  } catch (error) {
    console.error("Error al obtener el carrito:", error);
    return serverError("No se pudo obtener el carrito.");
  }
}
