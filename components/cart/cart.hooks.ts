"use client";

import { useCallback, useEffect, useState } from "react";

import {
  createOrden,
  getOrdenResumen,
  type OrderSummary,
} from "@/lib/api/ordenes";
import {
  getCarrito,
  removeItemCarrito,
  updateItemCarrito,
  type CartItem,
} from "@/lib/api/carrito";
import type { PaymentTerm } from "./cart.constants";

function getErrorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : "No se pudo actualizar el carrito. Intentá nuevamente.";
}

export function useCart(paymentTerm: PaymentTerm) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [summary, setSummary] = useState<OrderSummary | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const loadCart = useCallback(async () => {
    try {
      const cart = await getCarrito();
      setItems(cart.items);

      if (cart.items.length === 0) {
        setSummary(null);
      } else {
        try {
          setSummary(await getOrdenResumen(paymentTerm));
        } catch (error) {
          setSummary(null);
          setError(getErrorMessage(error));
          return;
        }
      }

      setError("");
    } catch (error) {
      setItems([]);
      setSummary(null);
      setError(getErrorMessage(error));
    } finally {
      setLoaded(true);
    }
  }, [paymentTerm]);

  useEffect(() => {
    void loadCart();
  }, [loadCart]);

  async function changeQuantity(id: string, change: number) {
    const item = items.find((current) => current.id === id);
    if (!item) return;

    try {
      await updateItemCarrito(id, Math.max(1, item.cantidad + change));
      await loadCart();
    } catch (error) {
      setError(getErrorMessage(error));
    }
  }

  async function removeItem(id: string) {
    try {
      await removeItemCarrito(id);
      await loadCart();
    } catch (error) {
      setError(getErrorMessage(error));
    }
  }

  async function submitOrder() {
    if (items.length === 0 || isSubmitting) return false;

    try {
      setIsSubmitting(true);
      setError("");
      await createOrden({ paymentTerm });
      await loadCart();
      return true;
    } catch (error) {
      setError(getErrorMessage(error));
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    items,
    summary,
    loaded,
    isSubmitting,
    error,
    changeQuantity,
    removeItem,
    submitOrder,
  };
}
