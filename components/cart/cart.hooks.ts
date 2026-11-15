"use client";

import { useEffect, useMemo, useState } from "react";

import {
  guardarCarrito,
  leerCarrito,
  type ItemCarrito,
} from "@/lib/carrito";
import { getCartSummary } from "./cart.helpers";

export function useCart() {
  const [items, setItems] = useState<ItemCarrito[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const savedItems = leerCarrito();
      setItems(savedItems);
      setSelectedIds(savedItems.map((item) => item.id));
      setLoaded(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  function persistItems(nextItems: ItemCarrito[]) {
    guardarCarrito(nextItems);
    setItems(nextItems);
  }

  function changeQuantity(id: string, change: number) {
    persistItems(
      items.map((item) =>
        item.id === id
          ? { ...item, cantidad: Math.max(1, item.cantidad + change) }
          : item,
      ),
    );
  }

  function removeItem(id: string) {
    persistItems(items.filter((item) => item.id !== id));
    setSelectedIds((current) => current.filter((selectedId) => selectedId !== id));
  }

  function toggleItem(id: string) {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((selectedId) => selectedId !== id)
        : [...current, id],
    );
  }

  const summary = useMemo(
    () => getCartSummary(items, selectedIds),
    [items, selectedIds],
  );

  return {
    items,
    selectedIds,
    loaded,
    changeQuantity,
    removeItem,
    toggleItem,
    ...summary,
  };
}
