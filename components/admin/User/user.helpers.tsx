
import type { User } from "@/types/api";
import type { TableRow } from "@/types/pagination";

import { userStatusClasses } from "./user.constants";

import { Button } from "../../ui/Button/Button";
import Edit from "../../icon/Edit";

// FILTRAR POR ROL
export const filterUsersByRole = (
  users: User[],
  activeRole: string
) => {
  if (activeRole === "") return users;

  return users.filter((user) =>
    activeRole === "Cliente"
      ? user.role === "CLIENT"
      : user.role === "ADMIN"
  );
};

// BUSCAR USUARIOS
export const searchUsers = (
  users: User[],
  searchTerm: string
) => {
  const search = searchTerm.toLowerCase().trim();

  return users.filter(
    (user) =>
      user.id.toLowerCase().includes(search) ||
      user.name.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search)
  );
};

// ORDENAR USUARIOS
export const sortUsers = (
  users: User[],
  userSort: string
) => {
  return [...users].sort((a, b) => {
    if (userSort === "Activos primero") {
      return Number(b.isActive) - Number(a.isActive);
    }

    if (userSort === "Inactivos primero") {
      return Number(a.isActive) - Number(b.isActive);
    }

    return 0;
  });
};

// TRANSFORMAR USUARIOS A DATOS DE TABLA
export const mapUsersToTable = (
  users: User[],
  handleEdit: (user: User) => void
): TableRow[] => {
  return users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role === "CLIENT" ? "Cliente" : "Administrador",

    isActive: (
      <span
        className={
          user.isActive
            ? userStatusClasses.active
            : userStatusClasses.inactive
        }
      >
        {user.isActive ? "Activo" : "Inactivo"}
      </span>
    ),

    action: (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          buttonText={<Edit />}
          variant="outline"
          rounded
          onClick={() => handleEdit(user)}
        />
      </div>
    ),
  }));
};
