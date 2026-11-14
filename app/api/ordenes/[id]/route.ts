import {
  getOrderById,
  updateOrderStatus,
} from "@/services/order/order.service";

import type { OrderStatus } from "@/services/order/order.service";

import {
  success,
  unauthorized,
  forbidden,
  notFound,
  serverError,
  badRequest,
  conflict,
} from "@/utils/apiResponse";


const validStatuses: OrderStatus[] = [
  "PENDING",
  "PAID",
  "PREPARING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];


/**
 * GET /api/ordenes/:id
 *
 * Obtiene una orden.
 * El cliente solo puede consultar sus propias órdenes.
 * ADMIN puede consultar cualquier orden.
 */
export async function GET(
  _request: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await context.params;

    const order = await getOrderById(id);

    if (!order) {
      return notFound("Orden no encontrada.");
    }

    return success(order);

  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "UNAUTHORIZED") {
        return unauthorized("No hay una sesión válida.");
      }

      if (error.message === "FORBIDDEN") {
        return forbidden("No tenés permisos para consultar esta orden.");
      }
    }

    return serverError();
  }
}


/**
 * PATCH /api/ordenes/:id
 *
 * CLIENT:
 * Solo puede cancelar sus propias órdenes.
 *
 * ADMIN:
 * Puede actualizar cualquier estado excepto CANCELLED.
 */
export async function PATCH(
  request: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await context.params;

    const body = await request.json();

    if (
      !body ||
      typeof body.status !== "string" ||
      !validStatuses.includes(body.status as OrderStatus)
    ) {
      return badRequest("El estado del pedido no es válido.");
    }

    const order = await updateOrderStatus(
      id,
      body.status as OrderStatus
    );

    if (!order) {
      return notFound("Orden no encontrada.");
    }

    return success(order);

  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "UNAUTHORIZED") {
        return unauthorized("Debés iniciar sesión.");
      }

      if (error.message === "FORBIDDEN") {
        return forbidden("No tenés permisos para realizar esta acción.");
      }

      if (error.message === "ADMIN_CANNOT_CANCEL_ORDER") {
        return forbidden("El administrador no puede cancelar órdenes.");
      }

      if (error.message === "ORDER_ALREADY_CANCELLED") {
        return conflict("Esta orden ya fue cancelada y no puede volver a modificarse por el cliente.");
      }
    }

    return serverError();
  }
}