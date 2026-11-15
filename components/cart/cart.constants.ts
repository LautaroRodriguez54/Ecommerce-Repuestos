import type { ItemCarrito } from "@/lib/carrito";

export const priceFormat = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
});

export const SHIPPING_COST = 13000;

export const relatedProducts: Pick<ItemCarrito, "id" | "nombre" | "imagen">[] = [
  { id: "1", nombre: "Horquilla de embrague", imagen: "/horquilla1.webp" },
  { id: "2", nombre: "Horquilla de embrague", imagen: "/horquilla2.webp" },
  { id: "3", nombre: "Horquilla de embrague", imagen: "/horquilla3.webp" },
  { id: "4", nombre: "Horquilla de embrague", imagen: "/horquilla4.webp" },
];
