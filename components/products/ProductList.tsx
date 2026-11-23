import ProductCard from "./ProductCard";
import styles from "../../styles/productos.module.css";
import type { CatalogProduct } from "@/lib/api/productos";

type ProductListProps = {
  products: CatalogProduct[];
};

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className={styles.grilla}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          sku={product.sku}
          image={product.image}
          price={product.price}
          stock={product.stock}
        />
      ))}
    </div>
  );
}