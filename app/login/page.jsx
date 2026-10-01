"use client";
import { Auth } from "../../components/auth/Auth";
import styles from "../../components/auth/auth.module.css";
import { ComponentData } from "../../components/ui/form/ComponentData";
import { FormField } from "../../components/ui/form/FormField";
import Link from "next/link";
import { Button } from "../../components/ui/Button/Button";
export default function Page() {
  return (
    <Auth title={"INICIAR SESIÓN"} subtitle={"Ingresá tus datos"}>
      <form className={styles.form} action="">
        <ComponentData dataArea={styles.data} areaName={"Nombre"}>
          <FormField nameLabel={"Nombre"} placeHolder={""} />
        </ComponentData>
        <ComponentData dataArea={styles.data} areaName={"Contraseña"}>
          <FormField nameLabel={"Contraseña"} placeHolder={""} />
        </ComponentData>
        <Link href={"#"}>¿Olvidaste tu contraseña?</Link>

        <div className={styles.buttonZone}>
          <Button buttonText="Enviar" variant={"primary"} />
        </div>
      </form>
    </Auth>
  );
}
