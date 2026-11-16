import {
  getAllOrders,
} from "@/services/order/order.service";

import {
  success,
  unauthorized,
  forbidden,

  serverError,
} from "@/utils/apiResponse";
import { requireAdmin } from "@/utils/adminAuthorization";


/**
 * GET /api/ordenes/admin
 *
 * Obtiene todas las órdenes del sistema.
 * Requiere ADMIN.
 */
export async function GET() {
  try {
    const orders = await getAllOrders();

    return success(orders);

  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "UNAUTHORIZED") {
        return unauthorized("Debés iniciar sesión.");
      }

      if (error.message === "FORBIDDEN") {
        return forbidden("No tenés permisos para consultar todas las órdenes.");
      }
    }

    return serverError();
  }
}