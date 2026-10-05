import styles from "../../styles/productos.module.css";
import Image from "next/image";
import Link from "next/link";

const imagenes = [
  "/horquilla1.webp",
  "/horquilla2.webp",
  "/horquilla3.webp",
  "/horquilla4.webp",
];

export default function Page() {
  return (
    <main className={styles.catalogo}>
      <aside className={styles.filtros}>
        <h2>Filtros aplicados</h2>

        <h3>Especialidad</h3>
        <ul>
          <li>Freno y embrague</li>
          <li>Lubricentro</li>
        </ul>

        <h3>Línea</h3>
        <ul>
          <li>Mercedes</li>
          <li>Renault</li>
          <li>Fiat</li>
          <li>Ford</li>
        </ul>

        <h3>Rubro</h3>
        <ul>
          <li>Accesorios</li>
          <li>Admisión y escape</li>
          <li>Aire acondicionado</li>
        </ul>
      </aside>

      <div>
        <input
          className={styles.buscador}
          type="search"
          placeholder="Buscar repuestos..."
          aria-label="Buscar repuestos"
        />

        <div className={styles.grilla}>
          {Array.from({ length: 8 }, (_, index) => (
            <article className={styles.tarjeta} key={index}>
              <Link
                href={`/productos/${(index % imagenes.length) + 1}`}
                className={styles.imagenProducto}
                aria-label={`Ver detalle de la horquilla ${
                  (index % imagenes.length) + 1
                }`}
              >
                <Image
                  src={imagenes[index % imagenes.length]}
                  alt="Horquilla de embrague"
                  fill
                  sizes="250px"
                  className={styles.foto}
                />
              </Link>

              <p>Horquilla de embrague</p>
              <strong>$ 23.000</strong>

              <Link
                href={`/productos/${(index % imagenes.length) + 1}`}
                className={styles.verDetalle}
              >
                Ver detalle →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
