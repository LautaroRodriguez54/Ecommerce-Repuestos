import styles from "@/styles/detalleProducto.module.css";

type ProductDetailErrorProps = {
  message: string;
};

/** Estado visible mientras se recupera el detalle del repuesto. */
export function ProductDetailLoading() {
  return (
    <main className={styles.pagina}>
      <section className={styles.estado} role="status" aria-live="polite">
        <span className={styles.indicadorCarga} aria-hidden="true" />
        <p>Cargando información del producto...</p>
      </section>
    </main>
  );
}

/** Estado visible cuando el detalle no existe o no pudo recuperarse. */
export function ProductDetailError({ message }: ProductDetailErrorProps) {
  return (
    <main className={styles.pagina}>
      <section className={styles.estado} role="alert">
        <h1>No se pudo cargar el producto</h1>
        <p>{message}</p>
      </section>
    </main>
  );
}
