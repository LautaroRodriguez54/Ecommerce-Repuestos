import { z } from "zod";

/**
 * Schema base de usuario.
 */
export const userSchema = z.object({
  name: z
    .string({
      error: "El nombre es obligatorio.",
    })
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres.")
    .max(100, "El nombre no puede superar los 100 caracteres."),

  email: z
    .string({
      error: "El email es obligatorio.",
    })
    .trim()
    .email("El email no es válido.")
    .max(150, "El email no puede superar los 150 caracteres."),

  password: z
    .string({
      error: "La contraseña es obligatoria.",
    })
    .min(8, "La contraseña debe tener al menos 8 caracteres.")
    .max(100, "La contraseña no puede superar los 100 caracteres."),

  role: z.enum(["CLIENT", "ADMIN"], {
    error: "El rol seleccionado no es válido.",
  }),

  isActive: z.boolean({
    error: "El estado activo debe ser verdadero o falso.",
  }),
});

/**
 * Datos requeridos para crear un usuario.
 */
export const createUserSchema = userSchema;

/**
 * Datos permitidos para actualizar un usuario.
 */
export const updateUserSchema = userSchema.partial();

/**
 * Tipos inferidos.
 */
export type UserInput = z.infer<typeof userSchema>;

export type CreateUserInput = z.infer<typeof createUserSchema>;

export type UpdateUserInput = z.infer<typeof updateUserSchema>;