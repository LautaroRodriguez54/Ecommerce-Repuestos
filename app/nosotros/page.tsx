import Image from "next/image";
import styles from "../../styles/nosotros.module.css";

export default function Page() {
  return (
    <main className={styles.main}>
      <section className={styles.intro}>
        <div className={styles.texto}>
          <h1>Nuestra empresa</h1>
          <p>
            Somos una empresa dedicada a la importación y distribución de
            repuestos automotrices con una amplia trayectoria en el mercado y
            clientes que nos respaldan.
          </p>
        </div>

        <div className={styles.imagen}>
          <Image
            src="/trabajador.webp"
            alt="Trabajador en el depósito de repuestos"
            fill
            sizes="600px"
            style={{ objectFit: "cover", objectPosition: "center top" }}
          />
        </div>
      </section>
      <section className={styles.cifras}>
        <div>
          <strong>13000</strong>
          <span>Artículos en stock</span>
        </div>
        <div>
          <strong>30</strong>
          <span>Viajantes</span>
        </div>
        <div>
          <strong>24</strong>
          <span>Provincias</span>
        </div>
        <div>
          <strong>6000</strong>
          <span>Clientes</span>
        </div>
        <div>
          <strong>40</strong>
          <span>Años de experiencia</span>
        </div>
      </section>
      <section className={styles.valores}>
        <article>
          <h2>Experiencia</h2>
          <p>
            Contamos con más de 40 años de experiencia en el mercado. Nuestra
            trayectoria y el trabajo de nuestro equipo nos permitieron acompañar
            a más de 6000 clientes.
          </p>
        </article>

        <article>
          <h2>Calidad</h2>
          <p>
            Trabajamos con proveedores nacionales e internacionales para ofrecer
            repuestos de calidad, durabilidad y confianza.
          </p>
        </article>

        <article>
          <h2>Variedad</h2>
          <p>
            Contamos con más de 13.000 artículos de origen nacional e
            internacional para llegar a distintos puntos del país.
          </p>
        </article>
      </section>
    </main>
  );
}
