import type {User} from './api';
import type { ReactNode, ChangeEvent } from "react";
/**Table */
export type OrderStatus = "Pendiente" | "Completado" | "Preparando" | "Enviado";
export type UserStatus = "Activo" | "Inactivo";
export type TableProps = {
  title: string[];
  data: User[];
  showActions?: boolean;
  onEdit?: (user: User) => void;
};
/* SelectBox*/
export type SelectBoxProps = {
  option: string[];
  label?: string;
  icon?: ReactNode;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
};