import type { PaymentTerm } from "@/lib/api/ordenes";

export type { PaymentTerm };

export const priceFormat = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
});

export const paymentTermOptions = [
  { value: "DAYS_7", label: "7 días" },
  { value: "DAYS_30", label: "30 días" },
  { value: "DAYS_45", label: "45 días" },
  { value: "DAYS_60", label: "60 días" },
] as const;

export const relatedProducts: { id: string; nombre: string; imagen: string }[] = [
  { id: "1", nombre: "Horquilla de embrague", imagen: "/horquilla1.webp" },
  { id: "2", nombre: "Horquilla de embrague", imagen: "/horquilla2.webp" },
  { id: "3", nombre: "Horquilla de embrague", imagen: "/horquilla3.webp" },
  { id: "4", nombre: "Horquilla de embrague", imagen: "/horquilla4.webp" },
];
