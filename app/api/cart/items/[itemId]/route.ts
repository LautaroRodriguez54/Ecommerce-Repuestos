import { getAuthenticatedUser } from "@/services/auth/authenticated-user.service";

import {
  updateItem,
  removeItem,
} from "@/services/cart/cart.service";

import { updateCartItemSchema } from "@/validators/cart/cart.schema";

import {
  success,
  badRequest,
  unauthorized,
  serverError,
} from "@/utils/apiResponse";

type RouteContext = {
  params: Promise<{
    itemId: string;
  }>;
};

export async function PATCH(
  request: Request,
  context: RouteContext
) {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return unauthorized("No hay una sesión válida.");
    }

    const { itemId } = await context.params;

    const body = await request.json();

    const validation = updateCartItemSchema.safeParse(body);

    if (!validation.success) {
      return badRequest(
        validation.error.issues[0].message
      );
    }

    const item = await updateItem(
      user.id,
      itemId,
      validation.data.quantity
    );

    return success(item);
  } catch (error) {
    return badRequest(
      error instanceof Error
        ? error.message
        : "Error al actualizar el carrito."
    );
  }
}

export async function DELETE(
  _request: Request,
  context: RouteContext
) {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return unauthorized("No hay una sesión válida.");
    }

    const { itemId } = await context.params;

    await removeItem(user.id, itemId);

    return success({
      message: "Producto eliminado del carrito.",
    });
  } catch (error) {
    return badRequest(
      error instanceof Error
        ? error.message
        : "Error al eliminar el producto del carrito."
    );
  }
}