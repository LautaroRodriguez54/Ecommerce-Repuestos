import { z } from "zod";

/**
 * Schema para crear una categoría.
 */
export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres.")
    .max(50, "El nombre no puede superar los 50 caracteres."),
});

/**
 * Tipos inferidos.
 */
export type CategoryFormData = z.infer<typeof categorySchema>;

export type CategoryInput = z.infer<typeof categorySchema>;

export type CreateCategoryInput = CategoryInput;

export type UpdateCategoryInput = Partial<CreateCategoryInput>;