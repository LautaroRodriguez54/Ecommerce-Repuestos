"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import { getProductos } from "@/lib/api/productos";

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

export default function Page() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function cargarProductos() {
      try {
        const data = await getProductos();
        setProductos(data);
      } catch {
        setError("No se pudieron cargar los productos");
      } finally {
        setLoading(false);
      }
    }

    cargarProductos();
  }, []);

  if (loading) {
    return <main>Cargando productos...</main>;
  }

  if (error) {
    return <main>{error}</main>;
  }

  return (
    <main>
      <h1>Productos</h1>

      <section className="products-grid">
        {productos.map((producto) => (
          <ProductCard
            key={producto.id}
            producto={producto}
          />
        ))}
      </section>
    </main>
  );
}