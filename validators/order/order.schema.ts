import { z } from "zod";

export const createOrderSchema = z.object({
  paymentTerm: z.enum(
    ["DAYS_7", "DAYS_30", "DAYS_45", "DAYS_60"],
    {
      error: "El plazo de pago seleccionado no es válido.",
    }
  ),

  comment: z
    .string()
    .trim()
    .max(1000, "El comentario no puede superar los 1000 caracteres.")
    .optional(),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;