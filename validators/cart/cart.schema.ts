import { z } from "zod";

export const addCartItemSchema = z.object({
  productId: z.string().min(1, "El producto es obligatorio."),
  quantity: z
    .number()
    .int("La cantidad debe ser un número entero.")
    .positive("La cantidad debe ser mayor a 0."),
});

export const updateCartItemSchema = z.object({
  quantity: z
    .number()
    .int("La cantidad debe ser un número entero.")
    .positive("La cantidad debe ser mayor a 0."),
});

export type AddCartItemInput = z.infer<
  typeof addCartItemSchema
>;

export type UpdateCartItemInput = z.infer<
  typeof updateCartItemSchema
>;