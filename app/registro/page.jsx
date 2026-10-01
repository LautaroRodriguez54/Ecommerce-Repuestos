"use client";
import { Auth } from "../../components/auth/Auth";
import styles from "../../components/auth/auth.module.css";
import { ComponentData } from "../../components/ui/form/ComponentData";
import { FormField } from "../../components/ui/form/FormField";
import { Button } from "../../components/ui/Button/Button";

export default function Page() {
  return (
    <Auth title={"CREAR USUARIO"} subtitle={"Ingresá los datos del usuario"}>
      <form className={styles.form} action="">
        <ComponentData dataArea={styles.data} areaName={"Nombre"}>
          <FormField nameLabel={"Nombre"} placeHolder={""} />
        </ComponentData>
        <ComponentData dataArea={styles.data} areaName={"E-mail"}>
          <FormField nameLabel={"E-mail"} placeHolder={""} />
        </ComponentData>
        <ComponentData dataArea={styles.data} areaName={"Contraseña"}>
          <FormField nameLabel={"Contraseña"} placeHolder={""} />
        </ComponentData>
        <ComponentData dataArea={styles.data} areaName={"Rol"}>
          <div className={styles.radio}>
            <label htmlFor="">Administrador</label>
            <input type="radio" value="admin" />
          </div>
        </ComponentData>
        <div className={styles.buttonZone}>
          <Button buttonText="Enviar" variant={"primary"} />
        </div>
      </form>
    </Auth>
  );
}
