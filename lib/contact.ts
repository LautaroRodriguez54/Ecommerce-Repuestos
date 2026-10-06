export async function sendContactForm(data: object) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  
  if (!response.ok) {
    throw new Error(result.error ?? result.message ?? "No se pudo enviar el formulario");
  }

  return result.data;
}
