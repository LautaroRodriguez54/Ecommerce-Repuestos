import "./ProductCard.css";

type Producto = {
  id: string;
  name: string;
  sku: string;
  description: string;
  price: string | number;
  stock: number;
  image?: string | null;
  compatibleYear?: number | null;
  category?: {
    name: string;
  } | null;
  model?: {
    name: string;
    brand?: {
      name: string;
    } | null;
  } | null;
};

type ProductCardProps = {
  producto: Producto;
};

export default function ProductCard({ producto }: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-card-image">
        {producto.image ? (
          <img
            src={producto.image}
            alt={producto.name}
          />
        ) : (
          <div className="product-card-no-image">
            Sin imagen
          </div>
        )}
      </div>

      <div className="product-card-content">
        <p className="product-card-brand">
          {producto.model?.brand?.name ?? "Marca no disponible"}
        </p>

        <h2>{producto.name}</h2>

        <p className="product-card-description">
          {producto.description}
        </p>

        <div className="product-card-details">
          <span>
            {producto.category?.name ?? "Sin categoría"}
          </span>

          <span>
            {producto.model?.name ?? "Sin modelo"}
          </span>

          {producto.compatibleYear && (
            <span>
              Año: {producto.compatibleYear}
            </span>
          )}
        </div>

        <p className="product-card-sku">
          SKU: {producto.sku}
        </p>

        <div className="product-card-footer">
          <strong>
            ${Number(producto.price).toLocaleString("es-AR")}
          </strong>

          <span>
            Stock: {producto.stock}
          </span>
        </div>
      </div>
    </article>
  );
}