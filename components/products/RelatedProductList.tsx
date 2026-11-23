import ProductCard from "@/components/products/ProductCard";
import type { CatalogProduct } from "@/lib/api/productos";
import styles from "@/styles/detalleProducto.module.css";

type RelatedProductListProps = {
  products: CatalogProduct[];
};

export default function RelatedProductList({
  products,
}: RelatedProductListProps) {
  const relatedProducts = products.slice(0, 3);

  if (relatedProducts.length === 0) return null;

  return (
    <section className={styles.relacionados} aria-labelledby="relacionados-title">
      <h2 id="relacionados-title">Repuestos relacionados</h2>
      <div className={styles.grillaRelacionados}>
        {relatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            image={product.image}
            price={product.price}
          />
        ))}
      </div>
    </section>
  );
}
