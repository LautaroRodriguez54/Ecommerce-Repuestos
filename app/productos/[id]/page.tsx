"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { agregarAlCarrito } from "../../../lib/carrito";
import {
  fetchProducts,
  type CatalogProduct,
} from "../../../services/product/product.api";
import styles from "../../../styles/detalleProducto.module.css";

type ProductDetail = {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  price: string | number;
  sku: string;
  stock: number;
  compatibleYear: number | null;
  category: {
    name: string;
  } | null;
  model: {
    name: string;
    brand: {
      name: string;
    } | null;
  } | null;
};

type ProductResponse = {
  success: boolean;
  data?: ProductDetail;
};

const priceFormat = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
});

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<CatalogProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);

  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setError("");
    setProduct(null);
    setRelatedProducts([]);
    setQuantity(1);
    modalRef.current?.close();

    async function loadProduct() {
      try {
        const response = await fetch(
          `/api/productos/${encodeURIComponent(id)}`,
          {
            signal: controller.signal,
            cache: "no-store",
          },
        );

        if (response.status === 404) {
          throw new Error("Producto no encontrado.");
        }

        if (!response.ok) {
          throw new Error("No se pudo cargar el producto.");
        }

        const result: ProductResponse = await response.json();

        if (
          !result.success ||
          !result.data ||
          !Number.isFinite(Number(result.data.price))
        ) {
          throw new Error("La respuesta del producto no es válida.");
        }

        if (!controller.signal.aborted) {
          setProduct(result.data);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setError(
            error instanceof Error
              ? error.message
              : "Ocurrió un error al cargar el producto.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadProduct();

    return () => controller.abort();
  }, [id]);

  useEffect(() => {
    if (!product) return;

    const controller = new AbortController();
    const currentProduct = product;

    async function loadRelatedProducts() {
      try {
        const products = await fetchProducts(controller.signal);

        const related = products
          .filter(
            (item) =>
              item.id !== currentProduct.id &&
              item.category === currentProduct.category?.name,
          )
          .slice(0, 3);

        if (!controller.signal.aborted) {
          setRelatedProducts(related);
        }
      } catch {
        // El detalle puede funcionar aunque fallen los relacionados.
        if (!controller.signal.aborted) {
          setRelatedProducts([]);
        }
      }
    }

    loadRelatedProducts();

    return () => controller.abort();
  }, [product]);

  function addProduct() {
    if (!product || product.stock < 1) return;

    agregarAlCarrito({
      id: product.id,
      nombre: product.name,
      imagen: product.image ?? "",
      precio: Number(product.price),
      cantidad: quantity,
    });

    router.push("/carrito");
  }

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
                onClick={() => setQuantity((current) => current - 1)}
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                type="button"
                aria-label="Aumentar cantidad"
                disabled={quantity >= product.stock}
                onClick={() => setQuantity((current) => current + 1)}
              >
                +
              </button>
            </div>

            <button
              type="button"
              className={styles.agregar}
              onClick={addProduct}
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
