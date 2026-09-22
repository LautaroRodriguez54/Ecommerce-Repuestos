import { z } from "zod";

/**
 * Schema para crear un modelo.
 */
export const modelSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "El nombre es obligatorio.")
    .max(100, "El nombre no puede superar los 100 caracteres."),

  brandId: z
    .string()
    .trim()
    .min(1, "La marca es obligatoria."),
});

export type ModelInput = z.infer<typeof modelSchema>;

export const createModelSchema = modelSchema;

export const updateModelSchema = modelSchema.partial();

export type CreateModelInput = z.infer<typeof createModelSchema>;

export type UpdateModelInput = z.infer<typeof updateModelSchema>;