"use client";
import { SearchBox } from "../ui/form/SearchBox";
import styles from "../admin/admin.module.css";
import { Button } from "../ui/Button/Button";
import { Table } from "../ui/table/Table";
import { useState } from "react";

const title = ["ID", "FECHA", "CLIENTE", "ARTÍCULOS", "TOTAL", "ESTADO"];
const data = [
  {
    id: "PED-001",
    fecha: "2026-10-15",
    cliente: "Juan Pérez",
    articulos: 3,
    total: 45000,
    estado: "Pendiente",
  },
  {
    id: "PED-002",
    fecha: "2026-10-16",
    cliente: "María González",
    articulos: 2,
    total: 18500,
    estado: "Completado",
  },
  {
    id: "PED-003",
    fecha: "2026-10-17",
    cliente: "Lucas Fernández",
    articulos: 5,
    total: 72000,
    estado: "Preparando",
  },
  {
    id: "PED-004",
    fecha: "2026-10-18",
    cliente: "Sofía Ramírez",
    articulos: 1,
    total: 12500,
    estado: "Enviado",
  },
  {
    id: "PED-005",
    fecha: "2026-10-19",
    cliente: "Mateo Torres",
    articulos: 4,
    total: 56300,
    estado: "Cancelado",
  },
];
const states = ["Todos", "Pendiente", "Preparando", "Enviado"];

export const OrderContent = () => {
  const [estadoActivo, setEstadoActivo] = useState("Todos");
  return (
    <>
      <div className={styles.filterWrapper}>
        <SearchBox placeholder={"busca"} />
        {states.map((estado) => (
          <Button
            key={estado}
            buttonText={estado}
            variant={estadoActivo === estado ? "secundary" : "outline"}
            onClick={() => setEstadoActivo(estado)}
          />
        ))}
      </div>
      <Table title={title} data={data} />
    </>
  );
};
