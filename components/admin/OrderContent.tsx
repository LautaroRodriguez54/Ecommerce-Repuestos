"use client";
import { SearchBox } from "../ui/form/SearchBox";
import styles from "../admin/admin.module.css";
import { Button } from "../ui/Button/Button";
import { Table } from "../ui/table/Table";
import { Pagination } from "../ui/Pagination";
import { useEffect, useState } from "react";
import { getOrdenes } from "@/lib/api/ordenes";


type Order = {
  id: string;
  customer: string;
  date: string;
  status: string;
};

const title = ["ID", "FECHA", "CLIENTE", "ARTÍCULOS", "TOTAL", "ESTADO"];
const states = ["Todos", "Pendiente", "Preparando", "Enviado"];
const itemsPerPage = 8;
const maxPageButtons = 3;

export const OrderContent = () => {
  const [activeStatus, setActiveStatus] = useState("Todos");
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await getOrdenes();
        console.log("Orders received:", data);
        setOrders(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to fetch orders",
        );
      }
    }

    fetchOrders();
  }, []);

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className={styles.filterWrapper}>
        <SearchBox placeholder={"busca"} />
        {states.map((status) => (
          <Button
            key={status}
            buttonText={status}
            variant={activeStatus === status ? "secundary" : "outline"}
            onClick={() => setActiveStatus(status)}
          />
        ))}
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        maxPageButtons={maxPageButtons}
        data={orders}
      >
        {(currentData) => <Table title={title} data={currentData} />}
      </Pagination>

      
    </>
  );
};
