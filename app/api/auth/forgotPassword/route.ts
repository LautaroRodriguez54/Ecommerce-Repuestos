
import { requestPasswordReset } from "@/services/auth/auth.service";
import { success, badRequest, serverError } from "@/utils/apiResponse";

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();

    console.log("BODY RECIBIDO:", rawBody);

    if (!rawBody) {
      return badRequest("El cuerpo de la petición está vacío.");
    }

    const { email } = JSON.parse(rawBody);

    if (typeof email !== "string" || !email) {
      return badRequest("Ingresá un correo electrónico válido.");
    }

    await requestPasswordReset(email.trim().toLowerCase());

    return success({
      message: "Si el correo está registrado, recibirás un código de recuperación.",
    });
  } catch (error) {
    console.error("ERROR FORGOT PASSWORD:", error);
    return serverError();
  }
}
