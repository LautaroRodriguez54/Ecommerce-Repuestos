import type { Order, OrderStatus, PaymentTerm } from "@/types/api";

export type { PaymentTerm };

export type OrderSummary = {
  netTotal: number;
  bonusAmount: number;
  paymentDiscountAmount: number;
  vatAmount: number;
  total: number;
};

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
};

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    credentials: "same-origin",
    ...init,
  });
  const result = (await response.json()) as ApiResponse<T>;

  if (!response.ok || !result.success || result.data === undefined) {
    throw new Error(result.message ?? "No se pudo procesar la orden.");
  }

  return result.data;
}

function toOrderSummary(summary: Record<keyof OrderSummary, number | string>) {
  return {
    netTotal: Number(summary.netTotal),
    bonusAmount: Number(summary.bonusAmount),
    paymentDiscountAmount: Number(summary.paymentDiscountAmount),
    vatAmount: Number(summary.vatAmount),
    total: Number(summary.total),
  };
}

export async function getOrdenes() {
  return request<Order[]>("/api/ordenes");
}

export async function getOrdenesTotales() {
  return request<Order[]>("/api/ordenes/admin");
}

export async function getOrden(id: string) {
  return request<Order>(`/api/ordenes/${id}`);
}

export async function getOrdenResumen(
  paymentTerm: PaymentTerm,
): Promise<OrderSummary> {
  const search = new URLSearchParams({ paymentTerm });
  const summary = await request<Record<keyof OrderSummary, number | string>>(
    `/api/ordenes/resumen?${search}`,
  );

  return toOrderSummary(summary);
}

export async function createOrden(data: {
  paymentTerm: PaymentTerm;
  comment?: string;
}) {
  return request<unknown>("/api/ordenes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function updateOrdenStatus(
  id: string,
  status: OrderStatus,
) {
  return request<unknown>(`/api/ordenes/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
}
