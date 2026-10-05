export type ItemCarrito = {
  id: string;
  nombre: string;
  imagen: string;
  precio: number;
  cantidad: number;
};

const CLAVE_CARRITO = "altamira-carrito";

export function leerCarrito(): ItemCarrito[] {
  try {
    const guardado = localStorage.getItem(CLAVE_CARRITO);
    const datos = guardado ? JSON.parse(guardado) : [];

    return Array.isArray(datos) ? datos : [];
  } catch {
    return [];
  }
}

export function guardarCarrito(carrito: ItemCarrito[]) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

export function agregarAlCarrito(producto: ItemCarrito) {
  const carrito = leerCarrito();
  const existente = carrito.find((item) => item.id === producto.id);

  if (existente) {
    existente.cantidad += producto.cantidad;
  } else {
    carrito.push(producto);
  }

  guardarCarrito(carrito);
}
