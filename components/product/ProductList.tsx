import ProductCard from "./ProductCard";
import styles from "../../styles/productos.module.css";

type Product = {
  id: string | number;
  name: string;
  image: string;
  price: number;
};

type ProductListProps = {
  products: Product[];
};

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className={styles.grilla}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          image={product.image}
          price={product.price}
        />
      ))}
    </div>
  );
}
