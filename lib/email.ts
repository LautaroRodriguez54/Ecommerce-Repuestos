import { SMTPClient, Message } from "emailjs";

const user = process.env.ETHEREAL_USER;
const password = process.env.ETHEREAL_PASSWORD;

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

export async function sendEmail({
  subject,
  text,
}: {
  subject: string;
  text: string;
}) {
  const message = new Message({
    from: user,
    to: user,
    subject,
    text,
  });

  return client.sendAsync(message);
}
