import type { OrderStatus, PaymentTerm } from "@/types/api";
import styles from "../../admin/admin.module.css";
export const title = [
  "ID",
  "FECHA",
  "CLIENTE",
  "ARTÍCULOS",
  "TOTAL A PAGAR",
  "PLAZO DE PAGO",
  "ESTADO",
  "ACCIÓN",
];

export const statusConfig: {
  value: OrderStatus | "ALL";
  label: string;
  className?: string;
}[] = [
  { value: "ALL", label: "Todos" },
  { value: "PENDING", label: "Pendiente", className: styles.pending },
  { value: "PAID", label: "Pagado", className: styles.paid },
  { value: "PREPARING", label: "Preparando", className: styles.preparing },
  { value: "SHIPPED", label: "Enviado", className: styles.sent },
  { value: "DELIVERED", label: "Entregado", className: styles.completed },
  { value: "CANCELLED", label: "Cancelado", className: styles.canceled },
];
export const statusOptions = [
  "Todos",
  ...statusConfig
    .filter((status) => status.value !== "ALL")
    .map((status) => status.label),
];
export const paymentTermLabels: Record<PaymentTerm, string> = {
  DAYS_7: "7 días",
  DAYS_30: "30 días",
  DAYS_45: "45 días",
  DAYS_60: "60 días",
};
export const orderSortOptions = [
  "Predeterminado",
  "Fecha y hora: menor a mayor",
  "Fecha y hora: mayor a menor",
  "Pago: menor a mayor",
  "Pago: mayor a menor",
  "Plazo de pago: menor a mayor",
  "Plazo de pago: mayor a menor",
  "Cantidad de artículos: menor a mayor",
  "Cantidad de artículos: mayor a menor",
];
export const formatDate = (date: string) =>
  new Date(date).toLocaleString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
      minute: "2-digit",
    });
export const formatCurrency = (amount: string) =>
    `$ ${Number(amount).toLocaleString("es-AR")}`;

export const initialOrderFilters = {
  activeStatus: "Todos",
  searchTerm: "",
  orderSort: "Predeterminado",
};