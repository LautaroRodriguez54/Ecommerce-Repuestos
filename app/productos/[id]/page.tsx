"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { agregarAlCarrito } from "../../../lib/carrito";
import styles from "../../../styles/detalleProducto.module.css";

const imagenes = [
  "/horquilla1.webp",
  "/horquilla2.webp",
  "/horquilla3.webp",
  "/horquilla4.webp",
];

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const imagen = imagenes[Number(id) - 1] ?? imagenes[0];

  const [cantidad, setCantidad] = useState(1);
  const modalRef = useRef<HTMLDialogElement>(null);

  function agregarProducto() {
    agregarAlCarrito({
      id,
      nombre: "Horquilla de embrague",
      imagen,
      precio: 29957.52,
      cantidad,
    });

    router.push("/carrito");
  }

  return (
    <div className={styles.pagina}>
      <dialog
        ref={modalRef}
        className={styles.modal}
        aria-label="Foto ampliada de la horquilla"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            modalRef.current?.close();
          }
        }}
      >
        <div className={styles.contenidoZoom}>
          <button
            type="button"
            className={styles.cerrarZoom}
            onClick={() => modalRef.current?.close()}
            aria-label="Cerrar foto ampliada"
            autoFocus
          >
            ×
          </button>

          <Image
            src={imagen}
            alt="Horquilla de embrague ampliada"
            fill
            sizes="90vw"
            className={styles.fotoZoom}
          />
        </div>
      </dialog>

      <article className={styles.detalle}>
        <div className={styles.miniaturas}>
          <Image
            src={imagen}
            alt="Vista de la horquilla"
            width={90}
            height={90}
            className={styles.miniatura}
          />
        </div>

        <button
          type="button"
          className={styles.imagenPrincipal}
          onClick={() => modalRef.current?.showModal()}
          aria-label="Ampliar foto de la horquilla"
          aria-haspopup="dialog"
        >
          <Image
            src={imagen}
            alt="Horquilla de embrague"
            fill
            sizes="400px"
            className={styles.foto}
          />
        </button>

        <div className={styles.informacion}>
          <h1>Horquilla de embrague</h1>

          <dl className={styles.datos}>
            <div>
              <dt>Modelo:</dt>
              <dd>FALCON/F-100 6 CIL.</dd>
            </div>
            <div>
              <dt>Código original:</dt>
              <dd>OEM: BA-C9OZ-7515-A</dd>
            </div>
            <div>
              <dt>Código Altamira:</dt>
              <dd>2277/00</dd>
            </div>
            <div>
              <dt>Unidad de venta:</dt>
              <dd>1</dd>
            </div>
          </dl>

          <p className={styles.precio}>$ 29.957,52</p>

          <div className={styles.acciones}>
            <div className={styles.cantidad}>
              <button
                type="button"
                aria-label="Disminuir cantidad"
                disabled={cantidad === 1}
                onClick={() => setCantidad((actual) => actual - 1)}
              >
                −
              </button>

              <span>{cantidad}</span>

              <button
                type="button"
                aria-label="Aumentar cantidad"
                onClick={() => setCantidad((actual) => actual + 1)}
              >
                +
              </button>
            </div>

            <button
              type="button"
              className={styles.agregar}
              onClick={agregarProducto}
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </article>

      <div className={styles.relacionados}>
        <h2>Artículos relacionados</h2>

        <div className={styles.grillaRelacionados}>
          {imagenes.map((foto, index) =>
            foto !== imagen ? (
              <Link
                href={`/productos/${index + 1}`}
                className={styles.relacionado}
                key={foto}
              >
                <Image
                  src={foto}
                  alt="Horquilla de embrague"
                  width={180}
                  height={160}
                  className={styles.fotoRelacionada}
                />

                <p>Horquilla de embrague</p>
                <span>Ver detalle →</span>
              </Link>
            ) : null,
          )}
        </div>
      </div>
    </div>
  );
}
