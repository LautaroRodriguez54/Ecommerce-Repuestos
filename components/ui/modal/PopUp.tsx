"use client";

import style from "./modal.module.css";
import { ModalContainer } from "./ModalContainer";
import { Button } from "../Button/Button";

interface PopUpProps {
  message: string;
  onClose: () => void;
  onAccept?: () => void;
}

export const PopUp = ({ message, onClose, onAccept }: PopUpProps) => {
  return (
    <div className={style.popUp}>
      <ModalContainer onClose={onClose}>
        <p style={{ whiteSpace: "pre-line" }}>{message}</p>
        <Button buttonText="Aceptar" onClick={onAccept ?? onClose} />
      </ModalContainer>
    </div>
  );
};
