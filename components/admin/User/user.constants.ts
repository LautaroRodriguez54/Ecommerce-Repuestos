import styles from "../admin.module.css";
export const option = ["Cliente", "Administrador"];
export const activeOption = ["Activo", "Inactivo"];
export const title = ["ID", "NOMBRE", "EMAIL", "ROL", "ESTADO", "ACCIÓN"];
export const userStatusClasses = {
  active: `${styles.status} ${styles.sent}`,
  inactive: `${styles.status} ${styles.pending}`,
};
export const userSortOptions = [
  "Predeterminado",
  "Activos primero",
  "Inactivos primero",
];
export const initialUserFilters = {
  activeRole: "",
  searchTerm: "",
  userSort: "Predeterminado",
};