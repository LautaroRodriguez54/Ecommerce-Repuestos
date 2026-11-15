import type { RefObject } from "react";

import styles from "@/styles/carrito.module.css";

type CartConfirmationDialogProps = {
  dialogRef: RefObject<HTMLDialogElement | null>;
};

export default function CartConfirmationDialog({
  dialogRef,
}: CartConfirmationDialogProps) {
  function closeDialog() {
    dialogRef.current?.close();
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.confirmacion}
      aria-label="Confirmación de solicitud"
    >
      <button
        type="button"
        className={styles.cerrarConfirmacion}
        onClick={closeDialog}
        aria-label="Cerrar confirmación"
      >
        ×
      </button>

      <p>¡Tu pedido fue generado!</p>
      <small>Recibirás las novedades del pedido por los canales habituales.</small>

      <button
        type="button"
        className={styles.aceptar}
        onClick={closeDialog}
        autoFocus
      >
        Aceptar
      </button>
    </dialog>
  );
}
