"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRef } from "react";
import { priceFormat } from "@/components/products/product.constants";
import { useProductDetail } from "@/components/products/product.hooks";
import styles from "@/styles/detalleProducto.module.css";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const {
    product,
    relatedProducts,
    loading,
    error,
    quantity,
    decreaseQuantity,
    increaseQuantity,
    addToCart,
  } = useProductDetail(id);

  const modalRef = useRef<HTMLDialogElement>(null);

  if (loading) {
    return (
      <div className={styles.pagina} role="status">
        Cargando producto...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={styles.pagina}>
        <p role="alert">{error || "Producto no encontrado."}</p>
        <Link href="/productos">Volver al catálogo →</Link>
      </div>
    );
  }

  return (
    <div className={styles.pagina}>
      {product.image && (
        <dialog
          ref={modalRef}
          className={styles.modal}
          aria-label={`Foto ampliada de ${product.name}`}
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
            {product.model?.brand && (
              <div>
                <dt>Marca:</dt>
                <dd>{product.model.brand.name}</dd>
              </div>
            )}

            {product.model && (
              <div>
                <dt>Modelo:</dt>
                <dd>{product.model.name}</dd>
              </div>
            )}

            {product.compatibleYear != null && (
              <div>
                <dt>Año compatible:</dt>
                <dd>{product.compatibleYear}</dd>
              </div>
            )}

            <div>
              <dt>Código SKU:</dt>
              <dd>{product.sku}</dd>
            </div>

            {product.category && (
              <div>
                <dt>Rubro:</dt>
                <dd>{product.category.name}</dd>
              </div>
            )}

            <div>
              <dt>Stock:</dt>
              <dd>{product.stock}</dd>
            </div>
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
                onClick={decreaseQuantity}
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                type="button"
                aria-label="Aumentar cantidad"
                disabled={quantity >= product.stock}
                onClick={increaseQuantity}
              >
                +
              </button>
            </div>

            <button
              type="button"
              className={styles.agregar}
              onClick={addToCart}
              disabled={product.stock < 1}
            >
              {product.stock > 0 ? "Agregar al carrito" : "Sin stock"}
            </button>
          </div>
        </div>
      </article>

      {relatedProducts.length > 0 && (
        <div className={styles.relacionados}>
          <h2>Artículos relacionados</h2>

          <div className={styles.grillaRelacionados}>
            {relatedProducts.map((item) => (
              <Link
                href={`/productos/${item.id}`}
                className={styles.relacionado}
                key={item.id}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={180}
                  height={160}
                  className={styles.fotoRelacionada}
                />

                <p>{item.name}</p>
                <span>Ver detalle →</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
