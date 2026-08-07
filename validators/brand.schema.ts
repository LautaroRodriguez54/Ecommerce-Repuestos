import { z } from "zod";

/**
 * Schema para crear una marca.
 */
export const brandSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "El nombre es obligatorio.")
    .max(100, "El nombre no puede superar los 100 caracteres."),
});

/**
 * Tipos inferidos.
 */
export const createBrandSchema = brandSchema;

export const updateBrandSchema = brandSchema.partial();

export type BrandInput = z.infer<typeof brandSchema>;

export type CreateBrandInput = z.infer<typeof createBrandSchema>;

export type UpdateBrandInput = z.infer<typeof updateBrandSchema>;