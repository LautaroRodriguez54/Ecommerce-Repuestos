import Image from "next/image";
import styles from "../../styles/nosotros.module.css";
import { usDescriptions, cifras } from "@/components/pageData";
export default function Page() {
  return (
    <div className={styles.main} data-scroll-behavior="smooth">
      <div className={styles.content}>
        <section className={styles.intro}>
          <div className={styles.texto}>
            <h1>{usDescriptions[0].title}</h1>
            <p>{usDescriptions[0].description}</p>
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
          {cifras.map((item, i) => {
            return (
              <div key={i}>
                <strong>{item.amount}</strong>
                <span>{item.statics}</span>
              </div>
            );
          })}
        </section>
        <section className={styles.valores}>
          {usDescriptions.slice(1).map((item, i) => {
            return (
              <article key={i}>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </article>
            );
          })}
        </section>
      </div>
    </div>
  );
}
