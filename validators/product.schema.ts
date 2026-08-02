import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "El nombre debe tener al menos 3 caracteres.")
    .max(100, "El nombre no puede superar los 100 caracteres."),

  sku: z
    .string()
    .trim()
    .min(3, "El SKU debe tener al menos 3 caracteres.")
    .max(50, "El SKU no puede superar los 50 caracteres."),

  description: z
    .string()
    .trim()
    .min(10, "La descripción debe tener al menos 10 caracteres.")
    .max(1000, "La descripción no puede superar los 1000 caracteres."),

  price: z
    .number({
      error: "El precio es obligatorio.",
    })
    .positive("El precio debe ser mayor que cero."),

  stock: z
    .number({
      error: "El stock es obligatorio.",
    })
    .int("El stock debe ser un número entero.")
    .min(0, "El stock no puede ser negativo."),

  image: z
    .string()
    .trim()
    .url("La imagen debe ser una URL válida."),

  compatibleYear: z
    .number({
      error: "El año es obligatorio.",
    })
    .int()
    .min(1950, "El año no es válido.")
    .max(
      new Date().getFullYear() + 1,
      "El año no puede ser mayor al próximo año."
    ),

  categoryId: z
    .string()
    .min(1, "Debe seleccionar una categoría."),

  modelId: z
    .string()
    .min(1, "Debe seleccionar un modelo."),
});

export type ProductFormData = z.infer<typeof productSchema>;