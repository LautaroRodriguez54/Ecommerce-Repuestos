
import "server-only";
import { SMTPClient, Message } from "emailjs";

type EmailData = {
  to: string;
  subject: string;
  text: string;
};

export async function sendEmail(data: EmailData) {
  const { ETHEREAL_USER: user, ETHEREAL_PASSWORD: password } =
    process.env;

  if (!user || !password) {
    throw new Error("Faltan las credenciales de Ethereal");
  }

  const client = new SMTPClient({
    user,
    password,
    host: "smtp.ethereal.email",
    port: 587,
    tls: true,
  });

  return client.sendAsync(
    new Message({
      from: user,
      ...data,
    })
  );
}
