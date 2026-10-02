import { getAuthenticatedUser } from "@/services/auth/authenticated-user.service";

import { getOrCreateCart } from "@/services/cart/cart.service";

import {
  success,
  unauthorized,
  serverError,
} from "@/utils/apiResponse";

export async function GET() {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return unauthorized("No hay una sesión válida.");
    }

    const cart = await getOrCreateCart(user.id);

    return success(cart);
  } catch {
    return serverError();
  }
}