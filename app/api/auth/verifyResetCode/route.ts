
import { verifyPasswordResetCode } from "@/services/auth/auth.service";
import { success, badRequest, serverError } from "@/utils/apiResponse";

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    if (typeof code !== "string" || !/^\d{6}$/.test(code)) {
      return badRequest("Ingresá un código válido de seis dígitos.");
    }

    await verifyPasswordResetCode(code);

    return success({ message: "El código es válido." });
  } catch (error) {
    if (error instanceof Error && error.message === "El código es inválido o ha vencido.") {
      return badRequest(error.message);
    }

    console.error("ERROR VERIFY RESET CODE:", error);
    return serverError();
  }
}
