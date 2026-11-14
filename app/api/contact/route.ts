import { success, serverError } from "@/utils/apiResponse";
import { sendEmail } from "@/services/email/email.service";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    await sendEmail({
      to: process.env.ETHEREAL_USER!,
      subject: body.tipo === "client"
        ? "Petición para ser cliente"
        : "Consulta desde el formulario de contacto",
      text: `Nombre: ${body.nombre}
Teléfono: ${body.telefono}
Empresa: ${body.empresa}
CUIT: ${body.cuit}
Localidad: ${body.localidad ?? "No especificada"}
Dirección: ${body.direccion ?? "No especificada"}

Mensaje:
${body.mensaje}`,
    });

    return success({ message: "Formulario enviado correctamente." });
  } catch (error) {
    console.error("ERROR CONTACT:", error);
    return serverError();
  }
}
