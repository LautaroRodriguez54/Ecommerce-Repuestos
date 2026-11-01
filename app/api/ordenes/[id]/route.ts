import { getAuthenticatedUser } from "@/services/auth/authenticated-user.service";
import { getOrderById } from "@/services/order/order.service";

import {
  success,
  unauthorized,
  notFound,
  serverError,
} from "@/utils/apiResponse";

/**
 * GET /api/orders/:id
 *
 * Obtiene una orden del usuario autenticado.
 */
export async function GET(
  _request: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return unauthorized("No hay una sesión válida.");
    }

    const { id } = await context.params;

    const order = await getOrderById(id);

    if (!order) {
      return notFound("Orden no encontrada.");
    }

    /*
     * Un cliente solamente puede consultar
     * sus propias órdenes.
     */
    if (order.userId !== user.id) {
      return notFound("Orden no encontrada.");
    }

    return success(order);
  } catch {
    return serverError();
  }
}