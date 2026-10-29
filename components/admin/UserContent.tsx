"use client";
import { SearchBox } from "../ui/form/SearchBox";
import { SelectBox } from "../ui/form/SelectBox";
import styles from "../admin/admin.module.css";
import sylesAuth from "../auth/auth.module.css";
import { Button } from "../ui/Button/Button";
import Filter from "../icon/Filter";
import { Table } from "../ui/table/Table";
import { Pagination } from "../ui/Pagination";
import { useEffect, useState } from "react";
import { AuthForm } from "../auth/AuthForm.jsx";
import { ModalContainer } from "../ui/modal/ModalContainer";
import { ComponentData } from "../ui/form/ComponentData";
import { FormField } from "../ui/form/FormField";
import { PopUp } from "../ui/modal/PopUp";
import { getUsuarios, updateUsuario, deleteUsuario } from "@/lib/api/usuarios";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

const option = ["Cliente", "Administrador"];
const title = ["ID", "NOMBRE", "EMAIL", "ROL", "ACCIONES"];
const itemsPerPage = 8;
const maxPageButtons = 3;

export const UserContent = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usersLength, setUsersLength] = useState(0);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const showPopUp = (message: string) => {
    setError(message);
    setIsPopUpOpen(true);
  };
  const closePopUp = () => {
    setIsPopUpOpen(false);
    setError(null);
  };
  const getErrorMessage = (error: unknown, fallback: string) =>
    error instanceof Error ? error.message : fallback;
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsuarios();
        const formattedUsers: User[] = data.map((user: User) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        }));
        setUsers(formattedUsers);
        setUsersLength(data.length);
      } catch (error: unknown) {
        
        showPopUp(
          `No se pudieron cargar los usuarios:\n${getErrorMessage(
            error,
            "Error desconocido",
          )}`,
        );
      }
    };
    fetchUsers();
  }, []);
  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
    });
    setIsModalOpen(true);
  };
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleUpdate = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedUser) return;
    try {
      await updateUsuario(selectedUser.id, formData);
      
      setUsers((prev) =>
        prev.map((user) =>
          user.id === selectedUser.id ? { ...user, ...formData } : user,
        ),
      );
      setIsModalOpen(false);
      setSelectedUser(null);
      showPopUp("El usuario se actualizó correctamente.");
    } catch (error: unknown) {
      showPopUp(
        `No se pudo actualizar el usuario:\n${getErrorMessage(
          error,
          "Error desconocido",
        )}`,
      );
    }
  };
  const handleDelete = async (user: User) => {
    try {
      const response = await deleteUsuario(user.id);
      setUsers((prev) => prev.filter((item) => item.id !== user.id));
      showPopUp(response.message);
    } catch (error: unknown) {
      showPopUp(
        `No se pudo eliminar el usuario:\n${getErrorMessage(
          error,
          "Error desconocido",
        )}`,
      );
    }
  };
  return (
    <>
      <div className={styles.filterWrapper}>
        <SearchBox placeholder={"busca"} />
        <SelectBox option={option} label="TIPO:" icon={<Filter />} />
        <Button
          buttonText={"Registrar"}
          variant={"accent"}
          isButton={false}
          linkHref={"/register"}
        />
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        maxPageButtons={maxPageButtons}
        data={users}
        totalRecords = {usersLength}
      >
        {(currentData) => (
          <Table
            title={title}
            data={currentData}
            showActions
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          
        )}
        
      </Pagination>
      {isModalOpen && (
        <ModalContainer onClose={() => setIsModalOpen(false)}>
          <AuthForm title="ACTUALIZAR USUARIO" subtitle="actualiza">
            <form className={sylesAuth.form} onSubmit={handleUpdate}>
              <ComponentData dataArea={sylesAuth.data} areaName={"Nombre"}>
                <FormField
                  placeHolder={""}
                  name={"name"}
                  value={formData.name ?? ""}
                  onChange={handleChange}
                  required
                />
              </ComponentData>
              <ComponentData dataArea={sylesAuth.data} areaName={"E-mail"}>
                <FormField
                  type={"email"}
                  name={"email"}
                  placeHolder={""}
                  value={formData.email ?? ""}
                  onChange={handleChange}
                  required
                />
              </ComponentData>
              <div className={sylesAuth.buttonZone}>
                <Button buttonText={"Actualizar"} variant={"primary"} />
              </div>
            </form>
          </AuthForm>
        </ModalContainer>
      )}
      {isPopUpOpen && error && <PopUp message={error} onClose={closePopUp} />}
    </>
  );
};
