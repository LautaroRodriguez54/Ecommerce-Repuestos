"use client";
import { Auth } from "../../components/auth/Auth";
import styles from "../../components/auth/auth.module.css";
import { ComponentData } from "../../components/ui/form/ComponentData";
import { FormField } from "../../components/ui/form/FormField";
import Link from "next/link";
import { Button } from "../../components/ui/Button/Button";
import { useState, type SubmitEvent } from "react";
import { login } from "../../lib/auth";
import { PopUp } from "../../components/ui/modal/PopUp.jsx";

type Usuario = {
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
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    try {
      await login(usuario.email, usuario.password);
      console.log("Inicio de sesión correcto");
    } catch (error) {
      setPopupMessage(
        error instanceof Error ? `No se pudo iniciar sesión:\n${error.message}` : "No se pudo iniciar sesión",
      );
    } finally {
      setLoading(false);
    }
  }
  return (
    <Auth title={"INICIAR SESIÓN"} subtitle={"Ingresá tus datos"}>
      <form className={styles.form} action="" onSubmit={handleSubmit}>
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
        <Link href={"#"}>¿Olvidaste tu contraseña?</Link>
        <div className={styles.buttonZone}>
          <Button
            buttonText={loading ? "Ingresando..." : "Enviar"}
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
