"use client";
import { Auth } from "../../components/auth/Auth";
import styles from "../../components/auth/auth.module.css";
import { ComponentData } from "../../components/ui/form/ComponentData";
import { FormField } from "../../components/ui/form/FormField";
import { Button } from "../../components/ui/Button/Button";
import { useState, type SubmitEvent } from "react";
import { register } from "../../lib/auth";
import { PopUp } from "../../components/ui/modal/PopUp.jsx";

type Usuario = {
  name: string;
  email: string;
  password: string;
};

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const usuario: Usuario = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    try {
      const result = await register(
        usuario.name,
        usuario.email,
        usuario.password,
      );
      
      result && setPopupMessage('Usuario registrado correctamente');
      
    } catch (error) {
      setPopupMessage(
        error instanceof Error
          ? `No se pudo registrar el usuario:\n${error.message}`
          : "No se pudo registrar el usuario",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Auth title={"CREAR USUARIO"} subtitle={"Ingresá los datos del usuario"}>
      <form className={styles.form} action="" onSubmit={handleSubmit}>
        <ComponentData dataArea={styles.data} areaName={"Nombre"}>
          <FormField placeHolder={""} name={"name"} required />
        </ComponentData>
        <ComponentData dataArea={styles.data} areaName={"E-mail"}>
          <FormField
            type={"email"}
            placeHolder={""}
            name={"email"}
            required
          />
        </ComponentData>
        <ComponentData dataArea={styles.data} areaName={"Contraseña"}>
          <FormField
            type={"password"}
            placeHolder={""}
            name={"password"}
            required
          />
        </ComponentData>
        {/*<ComponentData dataArea={styles.data} areaName={"Rol"}>
          <div className={styles.radio}>
            <label htmlFor="">Administrador</label>
            <input type="radio" value="admin" />
          </div>
        </ComponentData>*/}
        <div className={styles.buttonZone}>
          <Button
            buttonText={loading ? "Registrando..." : "Enviar"}
            variant={"primary"}
          />
        </div>
      </form>
      {popupMessage && (
        <PopUp message={popupMessage} onClose={() => setPopupMessage(null)} />
      )}
    </Auth>
  );
}
