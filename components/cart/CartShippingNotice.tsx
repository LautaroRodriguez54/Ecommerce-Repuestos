import styles from "@/styles/carrito.module.css";

export default function CartShippingNotice() {
  return (
    <section className={styles.panel}>
      <h2>Envío</h2>
      <p className={styles.avisoEnvio}>
        La dirección de envío se completará en el siguiente paso.
      </p>
    </section>
  );
}
