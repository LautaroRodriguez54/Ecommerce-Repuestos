
import { resetPassword } from "@/services/auth/auth.service";
import { success, badRequest, serverError } from "@/utils/apiResponse";

export async function POST(request: Request) {
  try {
    const { code, password } = await request.json();

    if (typeof code !== "string" || !/^\d{6}$/.test(code)) {
      return badRequest("Ingresá un código válido de seis dígitos.");
    }

    if (typeof password !== "string" || password.length < 8) {
      return badRequest("La contraseña debe tener al menos 8 caracteres.");
    }

    await resetPassword({ code, password });

    return success({ message: "Tu contraseña se actualizó correctamente." });
  } catch (error) {
    if (
      error instanceof Error &&
      [
        "El código es inválido o ha vencido.",
        "El código es inválido o ya fue utilizado.",
      ].includes(error.message)
    ) {
      return badRequest(error.message);
    }

    console.error("ERROR RESET PASSWORD:", error);
    return serverError();
  }
}
