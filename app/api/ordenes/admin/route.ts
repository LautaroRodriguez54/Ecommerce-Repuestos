import { getAuthenticatedUser } from "@/services/auth/authenticated-user.service";
import {
  getAllOrders,
} from "@/services/order/order.service";

import { createOrderSchema } from "@/validators/order/order.schema";

import {
  success,
  created,
  badRequest,
  unauthorized,
  serverError,
} from "@/utils/apiResponse";

/**
 * GET /api/orders
 *
 * Obtiene las órdenes del usuario autenticado.
 */
export async function GET() {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return unauthorized("No hay una sesión válida.");
    }

    const orders = await getAllOrders();

    return success(orders);
  } catch {
    return serverError();
  }
}
