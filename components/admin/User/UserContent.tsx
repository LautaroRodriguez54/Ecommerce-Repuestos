"use client";
import { SearchBox } from "../../ui/form/SearchBox";
import { SelectBox } from "../../ui/form/SelectBox";
import { Button } from "../../ui/Button/Button";
import styles from "../admin.module.css";
import Filter from "../../icon/Filter";
import Brush from "@/components/icon/Brush";
import { PopUp } from "../../ui/modal/PopUp";
import { useState } from "react";
import { useUsers } from "./user.hooks";
import {
  filterUsersByRole,
  searchUsers,
  sortUsers,
  mapUsersToTable,
} from "./user.helpers";
import {
  activeOption,
  option,
  title,
  userSortOptions,
  initialUserFilters,
} from "./user.constants";
import { AdminTable } from "../AdminTable";
import { ComponentData } from "@/components/ui/form/ComponentData";
import stylesAuth from "../../auth/auth.module.css";
import { AdminModal } from "../AdminModal";
import { FormField } from "@/components/ui/form/FormField";

export const UserContent = () => {
  const [activeRole, setActiveRole] = useState(initialUserFilters.activeRole);
  const [searchTerm, setSearchTerm] = useState(initialUserFilters.searchTerm);
  const [userSort, setUserSort] = useState(initialUserFilters.userSort);
  const {
    users,
    formData,
    setFormData,
    error,
    isPopUpOpen,
    isModalOpen,
    isUpdating,
    setIsModalOpen,
    handleEdit,
    handleChange,
    handleUpdate,
    closePopUp,
  } = useUsers();
  const filteredUsers = filterUsersByRole(users, activeRole);

  const visibleUsers = searchUsers(filteredUsers, searchTerm);

  const sortedUsers = sortUsers(visibleUsers, userSort);
  const clearFilters = () => {
    setSearchTerm(initialUserFilters.searchTerm);
    setActiveRole(initialUserFilters.activeRole);
    setUserSort(initialUserFilters.userSort);
  };
  const tableData = mapUsersToTable(sortedUsers, handleEdit);
  return (
    <>
      <div className={styles.filterWrapper}>
        <SearchBox
          placeholder="Buscar por cliente, email o ID..."
          value={searchTerm}
          onChange={setSearchTerm}
        />
        <SelectBox
          option={option}
          label="TIPO:"
          icon={<Filter />}
          value={activeRole}
          onChange={(e) => setActiveRole(e.target.value)}
        />
        <SelectBox
          option={userSortOptions}
          label="Ordenar Por:"
          value={userSort}
          onChange={(e) => setUserSort(e.target.value)}
        />
        <Button
          buttonText={"Registrar"}
          variant={"accent"}
          isButton={false}
          linkHref={"/register"}
        />
        <Button buttonText={<Brush />} rounded onClick={clearFilters} />
      </div>
      <AdminTable title={title} data={tableData} totalRecords={tableData.length} />
      {isModalOpen && (
        <AdminModal
          title="ACTUALIZAR USUARIO"
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleUpdate}
          submitText={isUpdating ? "Actualizando..." : "Actualizar"}
        >
          <ComponentData dataArea={stylesAuth.data} areaName="Nombre">
            <FormField
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </ComponentData>

          <ComponentData dataArea={stylesAuth.data} areaName="E-mail">
            <FormField
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </ComponentData>

          <ComponentData dataArea={stylesAuth.data} areaName="Estado">
            <SelectBox
              option={activeOption}
              value={formData.isActive ? "Activo" : "Inactivo"}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  isActive: e.target.value === "Activo",
                }))
              }
            />
          </ComponentData>
        </AdminModal>
      )}
      {isPopUpOpen && error && <PopUp message={error} onClose={closePopUp} />}
    </>
  );
};
