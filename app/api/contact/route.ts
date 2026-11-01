import {
  success,
  serverError,
} from "@/utils/apiResponse";
import { sendEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const subject =
      body.tipo === "client"
        ? "Petición para ser cliente"
        : "Consulta desde el formulario de contacto";

    await sendEmail({
      subject,
      text: `
Nombre: ${body.nombre}
Teléfono: ${body.telefono}
Empresa: ${body.empresa}
CUIT: ${body.cuit}
Localidad: ${body.localidad ?? "No especificada"}
Dirección: ${body.direccion ?? "No especificada"}

Mensaje:
${body.mensaje}
      `,
    });

    return success({
      message: "Formulario enviado correctamente. Nos pondremos en contacto con usted en la mayor brevedad posible.",
    });
  } catch (error) {
    console.error("ERROR CONTACT:", error);

    return serverError();
  }
}