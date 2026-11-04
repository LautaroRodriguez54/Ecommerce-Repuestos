import type { Order } from "@/types/api";
import type { TableRow } from "@/types/pagination";
import styles from "../../admin/admin.module.css";
import { Button } from "../../ui/Button/Button";
import Edit from "../../icon/Edit";

import {
  statusConfig,
  paymentTermLabels,
  formatDate,
  formatCurrency,
} from "./order.constants";

// FILTRAR PEDIDOS
export const filterOrders = (
  orders: Order[],
  activeStatus: string,
  searchTerm: string,
) => {
  const search = searchTerm.toLowerCase().trim();

  return orders.filter((order) => {
    const matchesStatus =
      activeStatus === "Todos" ||
      statusConfig.find((status) => status.value === order.status)?.label ===
        activeStatus;

    const formattedDate = formatDate(order.createdAt).toLowerCase();

    const matchesSearch =
      order.id.toLowerCase().includes(search) ||
      order.user.name.toLowerCase().includes(search) ||
      formattedDate.includes(search) ||
      order.items.some((item) =>
        item.product.name.toLowerCase().includes(search),
      );

    return matchesStatus && matchesSearch;
  });
};

// ORDENAR PEDIDOS
export const sortOrders = (orders: Order[], orderSort: string) => {
  return [...orders].sort((a, b) => {
    const activeUserOrder = Number(b.user.isActive) - Number(a.user.isActive);
    if (activeUserOrder !== 0) return activeUserOrder;
    switch (orderSort) {
      case "Fecha y hora: menor a mayor":
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "Fecha y hora: mayor a menor":
      case "Predeterminado":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "Pago: menor a mayor":
        return Number(a.total) - Number(b.total);
      case "Pago: mayor a menor":
        return Number(b.total) - Number(a.total);
      case "Plazo de pago: menor a mayor":
        return paymentTermLabels[a.paymentTerm].localeCompare(
          paymentTermLabels[b.paymentTerm],
          "es",
        );
      case "Plazo de pago: mayor a menor":
        return paymentTermLabels[b.paymentTerm].localeCompare(
          paymentTermLabels[a.paymentTerm],
          "es",
        );
      case "Cantidad de artículos: menor a mayor": {
        const quantityA = a.items.reduce(
          (total, item) => total + item.quantity,
          0,
        );
        const quantityB = b.items.reduce(
          (total, item) => total + item.quantity,
          0,
        );
        return quantityA - quantityB;
      }
      case "Cantidad de artículos: mayor a menor": {
        const quantityA = a.items.reduce(
          (total, item) => total + item.quantity,
          0,
        );
        const quantityB = b.items.reduce(
          (total, item) => total + item.quantity,
          0,
        );
        return quantityB - quantityA;
      }
      default:
        return 0;
    }
  });
};

// TRANSFORMAR PEDIDOS A DATOS DE TABLA
export const mapOrdersToTable = (
  orders: Order[],
  handleEdit: (order: Order) => void,
  handleShowItems: (order: Order) => void,
): TableRow[] => {
  return orders.map((order) => {
    const status = statusConfig.find((s) => s.value === order.status);

    const totalUnits = order.items.reduce(
      (total, item) => total + item.quantity,
      0,
    );

    return {
      id: order.id,
      date: formatDate(order.createdAt),
      client: order.user.name,

      items: (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            buttonText={`${order.items.length} productos (${totalUnits} unidades)`}
            onClick={() => handleShowItems(order)}
            variant="outline"
          />
        </div>
      ),

      total: formatCurrency(order.total),
      paymentTerm: paymentTermLabels[order.paymentTerm],

      status: (
        <span className={`${styles.status} ${status?.className ?? ""}`}>
          {status?.label}
        </span>
      ),

      action: (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            buttonText={<Edit />}
            variant="outline"
            rounded
            onClick={() => handleEdit(order)}
          />
        </div>
      ),
    };
  });
};
export const mapOrderItemsToTable = (order: Order | null): TableRow[] => {
  if (!order) return [];

  return order.items.map((item, index) => ({
    id: String(index),
    product: item.product.name,
    quantity: item.quantity,
  }));
};