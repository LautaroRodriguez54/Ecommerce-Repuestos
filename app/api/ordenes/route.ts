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

    const orders = await getOrdersByUserId(user.id);

    return success(orders);
  } catch {
    return serverError();
  }
}

/**
 * POST /api/orders
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
      return badRequest(error.message);
    }

    return serverError();
  }
}