"use client";
import { SearchBox } from "../../ui/form/SearchBox";
import Brush from "../../icon/Brush.jsx";
import styles from "../../admin/admin.module.css";
import { PopUp } from "../../ui/modal/PopUp";
import { useState } from "react";
import { useOrders } from "./order.hooks";
import {
  filterOrders,
  sortOrders,
  mapOrdersToTable,
  mapOrderItemsToTable,
} from "./order.helpers";
import {
  statusConfig,
  title,
  orderSortOptions,
  statusOptions,
  initialOrderFilters,
} from "./order.constants";
import { AdminTable } from "../AdminTable";
import { AdminModal } from "../AdminModal";
import { ComponentData } from "@/components/ui/form/ComponentData";
import stylesAuth from "../../auth/auth.module.css";
import { SelectBox } from "../../ui/form/SelectBox";
import type { Order } from "@/types/api";
import { ModalContainer } from "@/components/ui/modal/ModalContainer";
import { Button } from "@/components/ui/Button/Button";

export const OrderContent = () => {
  const [activeStatus, setActiveStatus] = useState(
    initialOrderFilters.activeStatus,
  );
  const [searchTerm, setSearchTerm] = useState(initialOrderFilters.searchTerm);
  const [orderSort, setOrderSort] = useState(initialOrderFilters.orderSort);
  const [selectedOrderItems, setSelectedOrderItems] = useState<Order | null>(
    null,
  );
  const {
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
  } = useOrders();

  const filteredOrders = filterOrders(orders, activeStatus, searchTerm);

  const sortedOrders = sortOrders(filteredOrders, orderSort);

  const itemsTableData = mapOrderItemsToTable(selectedOrderItems);
  const tableData = mapOrdersToTable(
    sortedOrders,
    handleEdit,
    setSelectedOrderItems,
  );
  const clearFilters = () => {
    setSearchTerm(initialOrderFilters.searchTerm);
    setActiveStatus(initialOrderFilters.activeStatus);
    setOrderSort(initialOrderFilters.orderSort);
  };
  return (
    <>
      <div className={styles.filterWrapper}>
        <SearchBox
          placeholder="Buscar por cliente, producto, fecha o ID..."
          value={searchTerm}
          onChange={setSearchTerm}
        />
        <SelectBox
          option={statusOptions}
          label="Estado:"
          value={activeStatus}
          onChange={(e) => setActiveStatus(e.target.value)}
        />
        <SelectBox
          option={orderSortOptions}
          label="Ordenar por:"
          value={orderSort}
          onChange={(e) => setOrderSort(e.target.value)}
        />
        <Button buttonText={<Brush />} rounded onClick={clearFilters} />
      </div>
      <AdminTable title={title} data={tableData} totalRecords={tableData.length}/>
      {isModalOpen && (
        <AdminModal
          title="ACTUALIZAR PEDIDO"
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleUpdate}
          submitText={isUpdating ? "Actualizando..." : "Actualizar"}
        >
          <ComponentData dataArea={stylesAuth.data} areaName="Estado">
            <SelectBox
              option={statusConfig
                .filter((status) => status.value !== "ALL")
                .map((status) => status.label)}
              value={
                statusConfig.find((status) => status.value === formStatus)
                  ?.label ?? ""
              }
              onChange={(e) => {
                const selected = statusConfig.find(
                  (status) => status.label === e.target.value,
                );

                if (selected && selected.value !== "ALL") {
                  setFormStatus(selected.value);
                }
              }}
            />
          </ComponentData>
        </AdminModal>
      )}
      {selectedOrderItems && (
        <ModalContainer onClose={() => setSelectedOrderItems(null)}>
          <div className={styles.itemsModalContainer}>
            <AdminTable
              title={["índice", "Producto", "Cantidad"]}
              data={itemsTableData}
            />
          </div>
        </ModalContainer>
      )}
      {isPopUpOpen && error && <PopUp message={error} onClose={closePopUp} />}
    </>
  );
};
