"use client";

import { AdminTable } from "@/components/admin/AdminTable";
import { ModalContainer } from "@/components/ui/modal/ModalContainer";
import { PopUp } from "@/components/ui/modal/PopUp";
import { Button } from "@/components/ui/Button/Button";
import Edit from "@/components/icon/Edit";

import type { TableRow } from "@/types/pagination";

import {
  statusConfig,
  paymentTermLabels,
  formatDate,
  formatCurrency,
} from "../../admin/Order/order.constants";

import { mapOrderItemsToTable } from "../../admin/Order/order.helpers";
import { useOrdersPanel } from "./ordersPanel.hooks";

import styles from "../../admin/admin.module.css";

export const OrdersPanel = () => {
  const {
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
  } = useOrdersPanel();

  const tableData: TableRow[] = orders.map((order) => {
    const status = statusConfig.find((item) => item.value === order.status);

    const totalUnits = order.items.reduce(
      (total, item) => total + item.quantity,
      0,
    );

    return {
      id: order.id,
      date: formatDate(order.createdAt),

      items: (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            buttonText={`${order.items.length} productos (${totalUnits} unidades)`}
            onClick={() => setSelectedOrderItems(order)}
            variant="outline"
          />
        </div>
      ),

      total: formatCurrency(order.total),
      paymentTerm: paymentTermLabels[order.paymentTerm],

      status: (
        <span className={`${styles.status} ${status?.className ?? ""}`}>
          {status?.label ?? order.status}
        </span>
      ),

      action: (
        <div style={{ display: "flex", justifyContent: "center" }}>
          {order.status !== "CANCELLED" ? (
            <Button
              buttonText={<Edit />}
              variant="outline"
              rounded
              onClick={() => {
                setSelectedOrder(order);
                setShowCancelConfirmation(true);
              }}
            />
          ) : (
            "—"
          )}
        </div>
      ),
    };
  });

  if (loading) return <p>Cargando órdenes...</p>;
  if (error) return <p>{error}</p>;
  if (orders.length === 0) return <p>No tenés órdenes registradas.</p>;

  return (
    <>
      <div className={styles.tableWrapper}>
        <div className={styles.content}>
          <AdminTable
            title={clientOrderTitle}
            data={tableData}
            totalRecords={tableData.length}
          />
        </div>
      </div>

      {showCancelConfirmation && (
        <PopUp
          message="¿Estás seguro de que querés cancelar este pedido?\nEsta acción no se puede deshacer."
          onClose={handleConfirmationClose}
          onAccept={handleConfirmationAccept}
        />
      )}

      {selectedOrderItems && (
        <ModalContainer onClose={() => setSelectedOrderItems(null)}>
          <div className={styles.itemsModalContainer}>
            <AdminTable
              title={["ÍNDICE", "PRODUCTO", "CANTIDAD"]}
              data={mapOrderItemsToTable(selectedOrderItems)}
            />
          </div>
        </ModalContainer>
      )}

      {popupMessage && (
        <PopUp message={popupMessage} onClose={() => setPopupMessage("")} />
      )}
    </>
  );
};
