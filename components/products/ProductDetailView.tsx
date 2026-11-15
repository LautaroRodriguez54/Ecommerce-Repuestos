"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import type { Producto } from "@/lib/api/productos";
import { priceFormat } from "./product.constants";
import { getProductDetailFields } from "./product.helpers";
import styles from "@/styles/detalleProducto.module.css";

type ProductDetailViewProps = {
  product: Producto;
  quantity: number;
  onDecreaseQuantity: () => void;
  onIncreaseQuantity: () => void;
  onAddToCart: () => void;
  cartError: string;
};

export default function ProductDetailView({
  product,
  quantity,
  onDecreaseQuantity,
  onIncreaseQuantity,
  onAddToCart,
  cartError,
}: ProductDetailViewProps) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const detailFields = getProductDetailFields(product);

  useEffect(() => {
    modalRef.current?.close();
  }, [product.id]);

  return (
    <>
      {product.image && (
        <dialog
          ref={modalRef}
          className={styles.modal}
          aria-label={`Foto ampliada de ${product.name}`}
          onClick={(event) => {
            if (event.target === event.currentTarget) modalRef.current?.close();
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
              src={product.image}
              alt={product.name}
              fill
              sizes="90vw"
              className={styles.fotoZoom}
            />
          </div>
        </dialog>
      )}

      <article className={styles.detalle}>
        <div className={styles.miniaturas}>
          {product.image && (
            <Image
              src={product.image}
              alt={product.name}
              width={90}
              height={90}
              className={styles.miniatura}
            />
          )}
        </div>

        <button
          type="button"
          className={styles.imagenPrincipal}
          onClick={() => modalRef.current?.showModal()}
          disabled={!product.image}
          aria-label={`Ampliar foto de ${product.name}`}
          aria-haspopup="dialog"
        >
          {product.image && (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="400px"
              className={styles.foto}
            />
          )}
        </button>

        <div className={styles.informacion}>
          <h1>{product.name}</h1>
          {product.description && <p>{product.description}</p>}

          <dl className={styles.datos}>
            {detailFields.map((field) => (
              <div key={field.label}>
                <dt>{field.label}:</dt>
                <dd>{field.value}</dd>
              </div>
            ))}
          </dl>

          <p className={styles.precio}>
            {priceFormat.format(Number(product.price))}
          </p>

          <div className={styles.acciones}>
            <div className={styles.cantidad}>
              <button
                type="button"
                aria-label="Disminuir cantidad"
                disabled={quantity <= 1}
                onClick={onDecreaseQuantity}
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                type="button"
                aria-label="Aumentar cantidad"
                disabled={quantity >= product.stock}
                onClick={onIncreaseQuantity}
              >
                +
              </button>
            </div>

            <button
              type="button"
              className={styles.agregar}
              onClick={onAddToCart}
              disabled={product.stock < 1}
            >
              {product.stock > 0 ? "Agregar al carrito" : "Sin stock"}
            </button>
          </div>
          {cartError && <p role="alert">{cartError}</p>}
        </div>
      </article>
    </>
  );
}
