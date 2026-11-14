import { getAuthenticatedUser } from "@/services/auth/authenticated-user.service";
import { getOrderById, updateOrderStatus } from "@/services/order/order.service";

import {
  success,
  unauthorized,
  notFound,
  serverError,
  badRequest,
} from "@/utils/apiResponse";
const validStatuses = [
  "PENDING",
  "PAID",
  "PREPARING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
] as const;

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
/**
 * PATCH /api/ordenes/:id
 * Actualiza el estado de una orden.
 */
export async function PATCH(
  request: Request,
  context: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return unauthorized("No hay una sesión válida.");
    }
/*
    if (user.role !== "ADMIN") {
      return unauthorized("No tenés permisos para modificar pedidos.");
    }
*/
    const { id } = await context.params;
    const body = await request.json();

    if (
      !body ||
      typeof body.status !== "string" ||
      !validStatuses.includes(
        body.status as (typeof validStatuses)[number],
      )
    ) {
      return badRequest("El estado del pedido no es válido.");
    }

    const order = await updateOrderStatus(
      id,
      body.status as (typeof validStatuses)[number],
    );

    return success(order);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Record to update not found")
    ) {
      return notFound("Orden no encontrada.");
    }

    return serverError();
  }
}