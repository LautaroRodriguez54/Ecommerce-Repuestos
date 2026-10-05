"use client";
import { Auth } from "../../components/auth/Auth";
import styles from "../../components/auth/auth.module.css";
import { ComponentData } from "../../components/ui/form/ComponentData";
import { FormField } from "../../components/ui/form/FormField";
import { Button } from "../../components/ui/Button/Button";
import { useState, type SubmitEvent} from "react";
import { register } from "../../lib/auth";

type Usuario = {
  name: string;
  email: string;
  password: string;
};

export default function Page() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const usuario: Usuario = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    try {
      await register(usuario.name, usuario.email, usuario.password);
      console.log("Usuario registrado correctamente");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
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
          <FormField nameLabel={"Nombre"} placeHolder={""} name={"name"} />
        </ComponentData>
        <ComponentData dataArea={styles.data} areaName={"E-mail"}>
          <FormField
            type={"email"}
            nameLabel={"E-mail"}
            placeHolder={""}
            name={"email"}
          />
        </ComponentData>
        <ComponentData dataArea={styles.data} areaName={"Contraseña"}>
          <FormField
            type={"password"}
            nameLabel={"Contraseña"}
            placeHolder={""}
            name={"password"}
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
        {error && <p className={styles.error}> {error} </p>}
      </form>
    </Auth>
  );
}
