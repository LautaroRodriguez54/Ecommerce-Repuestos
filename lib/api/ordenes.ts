export async function getOrdenes() {
  const response = await fetch("/api/ordenes");
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error ?? "No se pudieron obtener las órdenes");
  }

  return result.data;
}

export async function getOrden(id: string) {
  const response = await fetch(`/api/ordenes/${id}`);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error ?? "No se pudo obtener la orden");
  }

  return result.data;
}

export async function createOrden(data: {
  paymentTerm: "DAYS_7" | "DAYS_30" | "DAYS_45" | "DAYS_60";
  comment?: string;
}) {
  const response = await fetch("/api/ordenes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error ?? "No se pudo crear la orden");
  }

  return result.data;
}