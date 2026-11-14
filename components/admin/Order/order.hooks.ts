"use client";
import { useCallback, useEffect, useState } from "react";
import { getOrdenesTotales, updateOrdenStatus } from "@/lib/api/ordenes";
import type { Order, OrderStatus } from "@/types/api";
import type { SubmitEvent } from "react";
export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [formStatus, setFormStatus] = useState<OrderStatus>("PENDING");
  const [error, setError] = useState<string | null>(null);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const showPopUp = useCallback((message: string) => {
    setError(message);
    setIsPopUpOpen(true);
  }, []);

  const closePopUp = () => {
    setIsPopUpOpen(false);
    setError(null);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrdenesTotales();
        setOrders(data);
      } catch (error: unknown) {
        showPopUp(error instanceof Error ? error.message : "Error desconocido");
      }
    };

    fetchOrders();
  }, [showPopUp]);

  const handleEdit = (order: Order) => {
    setSelectedOrder(order);
    setFormStatus(order.status);
    setIsModalOpen(true);
  };

  const handleUpdate = async (e: SubmitEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!selectedOrder) return;
  setIsUpdating(true);
  try {
    await updateOrdenStatus(selectedOrder.id, formStatus);

    setOrders((prev) =>
      prev.map((order) =>
        order.id === selectedOrder.id
          ? { ...order, status: formStatus }
          : order,
      ),
    );
    setIsModalOpen(false);
    setSelectedOrder(null);
    showPopUp("El pedido se actualizó correctamente.");
  } catch (error: unknown) {
    showPopUp(error instanceof Error ? error.message : "Error desconocido");
  } finally {
    setIsUpdating(false);
  }
};

  return {
    orders,
    formStatus,
    setFormStatus,
    error,
    isPopUpOpen,
    isModalOpen,
    isUpdating,
    setIsModalOpen,
    handleEdit,
    handleUpdate,
    closePopUp,
  };
};
