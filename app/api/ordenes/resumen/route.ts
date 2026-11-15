import { getAuthenticatedUser } from "@/services/auth/authenticated-user.service";
import { getOrderPreview } from "@/services/order/order.service";
import { createOrderSchema } from "@/validators/order/order.schema";
import {
  badRequest,
  serverError,
  success,
  unauthorized,
} from "@/utils/apiResponse";

/**
 * Devuelve los importes de la futura orden calculados por el servidor.
 */
export async function GET(request: Request) {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return unauthorized("No hay una sesión válida.");
    }

    const { searchParams } = new URL(request.url);
    const validation = createOrderSchema.safeParse({
      paymentTerm: searchParams.get("paymentTerm"),
    });

    if (!validation.success) {
      return badRequest(validation.error.issues[0].message);
    }

    return success(
      await getOrderPreview(user.id, validation.data.paymentTerm),
    );
  } catch (error) {
    if (error instanceof Error) {
      return badRequest(error.message);
    }

    return serverError();
  }
}
