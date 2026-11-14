import { getAuthenticatedUser } from "@/services/auth/authenticated-user.service";

import {
  createOrder,
  getOrdersByUserId,
} from "@/services/order/order.service";

import { createOrderSchema } from "@/validators/order/order.schema";

import {
  success,
  created,
  badRequest,
  unauthorized,
  forbidden,
  serverError,
} from "@/utils/apiResponse";


/**
 * GET /api/ordenes
 *
 * Obtiene las órdenes del usuario autenticado.
 */
export async function GET() {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return unauthorized("No hay una sesión válida.");
    }

    const orders = await getOrdersByUserId(user.id);

    return success(orders);

  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "UNAUTHORIZED") {
        return unauthorized("No hay una sesión válida.");
      }

      if (error.message === "FORBIDDEN") {
        return forbidden("No tenés permisos para consultar estas órdenes.");
      }
    }

    return serverError();
  }
}


/**
 * POST /api/ordenes
 *
 * Genera una orden a partir del carrito
 * del usuario autenticado.
 */
export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return unauthorized("No hay una sesión válida.");
    }

    const body = await request.json();

    const validation = createOrderSchema.safeParse(body);

    if (!validation.success) {
      return badRequest(validation.error.issues[0].message);
    }

    const order = await createOrder(
      user.id,
      validation.data
    );

    return created(order);

  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "UNAUTHORIZED") {
        return unauthorized("No hay una sesión válida.");
      }

      if (error.message === "FORBIDDEN") {
        return forbidden("No tenés permisos para crear esta orden.");
      }

      if (error.message === "El carrito está vacío.") {
        return badRequest(error.message);
      }
    }

    return serverError();
  }
}