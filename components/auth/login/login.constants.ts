import type { ResetStep } from "@/types/pagination";

export const resetTitle: Record<ResetStep, string> = {
  email: "RECUPERAR CONTRASEÑA",
  code: "VERIFICAR CÓDIGO",
  password: "NUEVA CONTRASEÑA",
};

export const resetButtonText: Record<ResetStep, string> = {
  email: "Enviar código",
  code: "Verificar código",
  password: "Actualizar contraseña",
};
