"use client";

import { useEffect, useState } from "react";
import { getOrdenes, updateOrdenStatus } from "@/lib/api/ordenes";
import type { Order } from "@/types/api";

const clientOrderTitle = [
  "ID",
  "FECHA",
  "ARTÍCULOS",
  "TOTAL",
  "PLAZO DE PAGO",
  "ESTADO",
  "ACTUALIZAR ESTADO",
];

export const useOrdersPanel = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedOrderItems, setSelectedOrderItems] = useState<Order | null>(
    null,
  );
  const [isUpdating, setIsUpdating] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await getOrdenes();
        setOrders(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "No se pudieron obtener las órdenes",
        );
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  const handleCancel = async () => {
    if (!selectedOrder || selectedOrder.status === "CANCELLED" || isUpdating) {
      return;
    }

    setIsUpdating(true);

    try {
      await updateOrdenStatus(selectedOrder.id, "CANCELLED");

      setOrders((prev) =>
        prev.map((order) =>
          order.id === selectedOrder.id
            ? { ...order, status: "CANCELLED" }
            : order,
        ),
      );

      setPopupMessage("El pedido se canceló correctamente.");
    } catch (error) {
      setPopupMessage(
        error instanceof Error
          ? error.message
          : "No se pudo cancelar el pedido.",
      );
    } finally {
      setIsUpdating(false);
      setShowCancelConfirmation(false);
      setSelectedOrder(null);
    }
  };

  const handleConfirmationClose = () => {
    if (isUpdating) return;

    setShowCancelConfirmation(false);
    setSelectedOrder(null);
  };

  const handleConfirmationAccept = () => {
    if (isUpdating) return;

    handleCancel();
  };

  return {
    orders,
    loading,
    error,
    clientOrderTitle,
    selectedOrderItems,
    popupMessage,
    showCancelConfirmation,
    setSelectedOrder,
    setSelectedOrderItems,
    setPopupMessage,
    setShowCancelConfirmation,
    handleConfirmationClose,
    handleConfirmationAccept,
  };
};
