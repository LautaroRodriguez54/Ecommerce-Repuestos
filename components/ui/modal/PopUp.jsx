"use client";
import style from "./modal.module.css";
import { ModalContainer } from "./ModalContainer.jsx";
import { Button } from "../Button/Button.jsx";

export const PopUp = () => {
  return (
    <div className={style.modalBackground}>
      <ModalContainer title={""}>
        <p>El usuario se ha creado con exito</p>
        <Button buttonText="Aceptar" variant={"primary"} />
      </ModalContainer>
    </div>
  );
};
