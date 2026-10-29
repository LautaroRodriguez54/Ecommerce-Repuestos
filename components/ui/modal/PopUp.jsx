"use client";
import style from "./modal.module.css";
import { ModalContainer } from "./ModalContainer.jsx";
import { Button } from "../Button/Button.jsx";

export const PopUp = ({ message, onClose }) => {
  return (
    <div className={style.popUp}>
      <ModalContainer onClose={onClose}>
        <p style={{ whiteSpace: "pre-line" }}>{message}</p>
        <Button buttonText="Aceptar" onClick={onClose} />
      </ModalContainer>
    </div>
  );
};
