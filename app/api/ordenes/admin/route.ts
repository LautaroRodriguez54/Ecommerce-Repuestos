import {
  getAllOrders,
} from "@/services/order/order.service";

import {
  success,
  serverError,
} from "@/utils/apiResponse";
import { requireAdmin } from "@/utils/adminAuthorization";

/**
 * GET /api/orders
 *
 * Obtiene las órdenes del usuario autenticado.
 */
export async function GET() {
  try {
    const authorizationError = await requireAdmin();
    if (authorizationError) return authorizationError;

    const orders = await getAllOrders();

    return success(orders);
  } catch {
    return serverError();
  }
}
