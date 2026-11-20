export type StatusConfig = {
  title: string;
  image: string;
  message: string;
};

export const statusConfig: Record<number, StatusConfig> = {
  401: {
    title: "No autorizado",
    image: "/error/401.svg",
    message: "Debés iniciar sesión para acceder.",
  },
  403: {
    title: "Acceso denegado",
    image: "/error/403.svg",
    message: "No tenés permisos para acceder a esta página.",
  },
  404: {
    title: "Página no encontrada",
    image: "/error/404.svg",
    message: "La página que buscás no existe.",
  },
};