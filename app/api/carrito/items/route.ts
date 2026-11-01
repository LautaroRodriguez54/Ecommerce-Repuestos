import { getAuthenticatedUser } from "@/services/auth/authenticated-user.service";

import { addItem } from "@/services/cart/cart.service";

import { addCartItemSchema } from "@/validators/cart/cart.schema";

import {
  success,
  created,
  badRequest,
  unauthorized,
  serverError,
} from "@/utils/apiResponse";

export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return unauthorized("No hay una sesión válida.");
    }

    const body = await request.json();

    const validation = addCartItemSchema.safeParse(body);

    if (!validation.success) {
      return badRequest(
        validation.error.issues[0].message
      );
    }

    const item = await addItem(
      user.id,
      validation.data.productId,
      validation.data.quantity
    );

    return created(item);
  } catch (error) {
    return badRequest(
      error instanceof Error
        ? error.message
        : "Error al agregar el producto al carrito."
    );
  }
}