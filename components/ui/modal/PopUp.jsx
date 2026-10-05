"use client";
import style from "./modal.module.css";
import { ModalContainer } from "./ModalContainer.jsx";
import { Button } from "../Button/Button.jsx";

export const PopUp = ({ message, onClose }) => {
  return (
    <div className={style.modalBackground} onClick={onClose}>
      <ModalContainer onClose={onClose}>
        <p style={{ whiteSpace: "pre-line" }}>{message}</p>
        <Button buttonText="Aceptar" onClic={onClose}/>
      </ModalContainer>
    </div>
  );
};
