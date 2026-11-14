"use client";
import { useCallback, useEffect, useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import { getUsuarios, updateUsuario } from "@/lib/api/usuarios";
import type { User } from "@/types/api";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    isActive: true,
  });

  const showPopUp = useCallback((message: string) => {
    setError(message);
    setIsPopUpOpen(true);
  }, []);

  const closePopUp = () => {
    setIsPopUpOpen(false);
    setError(null);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsuarios();
        setUsers(data);
      } catch (error: unknown) {
        showPopUp(error instanceof Error ? error.message : "Error desconocido");
      }
    };

    fetchUsers();
  }, [showPopUp]);

  const handleEdit = (user: User) => {
    setSelectedUser(user);

    setFormData({
      name: user.name,
      email: user.email,
      isActive: user.isActive,
    });

    setIsModalOpen(true);
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e: SubmitEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!selectedUser) return;
  setIsUpdating(true);
  try {
    await updateUsuario(selectedUser.id, formData);
    setUsers((prev) =>
      prev.map((user) =>
        user.id === selectedUser.id
          ? { ...user, ...formData }
          : user,
      ),
    );
    setIsModalOpen(false);
    setSelectedUser(null);
    showPopUp("El usuario se actualizó correctamente.");
  } catch (error: unknown) {
    showPopUp(
      error instanceof Error ? error.message : "Error desconocido",
    );
  } finally {
    setIsUpdating(false);
  }
};

  return {
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
  };
};
