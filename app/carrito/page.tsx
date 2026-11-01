"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  leerCarrito,
  guardarCarrito,
  type ItemCarrito,
} from "../../lib/carrito";
import styles from "../../styles/carrito.module.css";

const formatoPrecio = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
});

const imagenes = [
  "/horquilla1.webp",
  "/horquilla2.webp",
  "/horquilla3.webp",
  "/horquilla4.webp",
];

export default function Page() {
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [seleccionados, setSeleccionados] = useState<string[]>([]);
  const [cargado, setCargado] = useState(false);

  const confirmacionRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const productos = leerCarrito();

    setCarrito(productos);
    setSeleccionados(productos.map((producto) => producto.id));
    setCargado(true);
  }, []);

  function actualizarCarrito(productos: ItemCarrito[]) {
    guardarCarrito(productos);
    setCarrito(productos);
  }

  function cambiarCantidad(id: string, cambio: number) {
    const actualizado = carrito.map((producto) =>
      producto.id === id
        ? {
            ...producto,
            cantidad: Math.max(1, producto.cantidad + cambio),
          }
        : producto,
    );

    actualizarCarrito(actualizado);
  }

  function eliminarProducto(id: string) {
    actualizarCarrito(carrito.filter((producto) => producto.id !== id));

    setSeleccionados((actuales) =>
      actuales.filter((seleccionado) => seleccionado !== id),
    );
  }

  function seleccionarProducto(id: string) {
    setSeleccionados((actuales) =>
      actuales.includes(id)
        ? actuales.filter((seleccionado) => seleccionado !== id)
        : [...actuales, id],
    );
  }

  const productosElegidos = carrito.filter((producto) =>
    seleccionados.includes(producto.id),
  );

  const subtotal = productosElegidos.reduce(
    (total, producto) => total + producto.precio * producto.cantidad,
    0,
  );

  // Costo de ejemplo tomado del Figma.
  const envio = productosElegidos.length > 0 ? 13000 : 0;
  const total = subtotal + envio;

  if (!cargado) {
    return <div className={styles.pagina}>Cargando carrito...</div>;
  }

  return (
    <div className={styles.pagina}>
      <dialog
        ref={confirmacionRef}
        className={styles.confirmacion}
        aria-label="Confirmación de solicitud"
      >
        <button
          type="button"
          className={styles.cerrarConfirmacion}
          onClick={() => confirmacionRef.current?.close()}
          aria-label="Cerrar confirmación"
        >
          ×
        </button>

        <p>¡Tu solicitud está lista!</p>
        <small>Confirmación de prueba.</small>

        <button
          type="button"
          className={styles.aceptar}
          onClick={() => confirmacionRef.current?.close()}
          autoFocus
        >
          Aceptar
        </button>
      </dialog>

      <div className={styles.distribucion}>
        <div className={styles.columna}>
          <div className={styles.panel}>
            <h1>Carrito</h1>

            {carrito.length === 0 ? (
              <div className={styles.vacio}>
                <p>Tu carrito está vacío.</p>
                <Link href="/productos">Ver productos →</Link>
              </div>
            ) : (
              <>
                <div className={styles.encabezado}>
                  <span />
                  <span>Producto</span>
                  <span>Cantidad</span>
                  <span>Precio unitario</span>
                  <span />
                </div>

                {carrito.map((producto) => (
                  <div className={styles.fila} key={producto.id}>
                    <input
                      type="checkbox"
                      checked={seleccionados.includes(producto.id)}
                      onChange={() => seleccionarProducto(producto.id)}
                      aria-label={`Seleccionar ${producto.nombre}, producto ${producto.id}`}
                      className={styles.seleccion}
                    />

                    <Link
                      href={`/productos/${producto.id}`}
                      className={styles.producto}
                    >
                      <Image
                        src={producto.imagen}
                        alt={producto.nombre}
                        width={70}
                        height={70}
                        className={styles.foto}
                      />

                      <div>
                        <p>{producto.nombre}</p>
                        <small>Producto {producto.id}</small>
                      </div>
                    </Link>

                    <div className={styles.cantidad}>
                      <button
                        type="button"
                        disabled={producto.cantidad === 1}
                        onClick={() => cambiarCantidad(producto.id, -1)}
                        aria-label="Disminuir cantidad"
                      >
                        −
                      </button>

                      <span>{producto.cantidad}</span>

                      <button
                        type="button"
                        onClick={() => cambiarCantidad(producto.id, 1)}
                        aria-label="Aumentar cantidad"
                      >
                        +
                      </button>
                    </div>

                    <span className={styles.precio}>
                      {formatoPrecio.format(producto.precio)}
                    </span>

                    <button
                      type="button"
                      className={styles.eliminar}
                      onClick={() => eliminarProducto(producto.id)}
                      aria-label={`Eliminar producto ${producto.id}`}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>

          <div className={styles.panel}>
            <h2>Envío</h2>
            <p className={styles.avisoEnvio}>
              La dirección de envío se completará en el siguiente paso.
            </p>
          </div>
        </div>

        <aside className={styles.panel}>
          <h2>Resumen de compra</h2>

          <div className={styles.lineaResumen}>
            <span>Productos</span>
            <span>{formatoPrecio.format(subtotal)}</span>
          </div>

          <div className={styles.lineaResumen}>
            <span>Envío</span>
            <span>{formatoPrecio.format(envio)}</span>
          </div>

          <div className={styles.total}>
            <span>TOTAL</span>
            <strong>{formatoPrecio.format(total)}</strong>
          </div>

          <button
            type="button"
            className={styles.realizarPedido}
            disabled={productosElegidos.length === 0}
            onClick={() => confirmacionRef.current?.showModal()}
          >
            Realizar pedido
          </button>
        </aside>
      </div>

      <div className={styles.relacionados}>
        <h2>Artículos relacionados</h2>

        <div className={styles.grillaRelacionados}>
          {imagenes.map((imagen, index) => (
            <Link
              href={`/productos/${index + 1}`}
              className={styles.tarjetaRelacionada}
              key={imagen}
            >
              <Image
                src={imagen}
                alt="Horquilla de embrague"
                width={180}
                height={150}
                className={styles.fotoRelacionada}
              />
              <p>Horquilla de embrague</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
