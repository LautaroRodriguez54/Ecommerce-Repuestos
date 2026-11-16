import type {
  ResetRequestBody,
  ResetResponse,
} from "@/types/pagination";

export async function sendResetRequest(
  url: string,
  body: ResetRequestBody,
) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data: ResetResponse = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        data.error ||
        "Ocurrió un error inesperado.",
    );
  }

  return data;
}
