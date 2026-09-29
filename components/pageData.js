import Location from "./icon/Location.jsx";
import Instagram from "./icon/Instagram.jsx";
import Gmail from "./icon/Gmail.jsx";
import Facebook from "./icon/Facebook.jsx";


export const arrayMessages = [
  "HORARIO DE ATENCIÓN: LUNES A VIERNES DE 7:30 A 17:00 HORAS",
  "•",
  "HASTA 50% DE DESCUENTO EN TU PRIMERA COMPRA",
  "•",
  "ENVÍOS A TODO EL PAÍS",
  "•",
];
export const arrayForm = [
  { nameLabel: "Nombre", placeHolder: "Nombre Completo" },
  { nameLabel: "Teléfono", placeHolder: "Teléfono" },
  { nameLabel: "Nombre", placeHolder: "Nombre" },
  { nameLabel: "CUIT", placeHolder: "CUIT" },
  { nameLabel: "Localidad", placeHolder: "Localidad" },
  { nameLabel: "Dirección", placeHolder: "Dirección" },
  { nameLabel: "Mensaje", placeHolder: "Escribe aquí tu mensaje" },
];
export const contactData = [
  {
    title: "LINEAS ROTATIVAS",
    texts: ["(Capital federal)", "11 4912-1618", "11 4911-8755"],
  },
  {
    title: "FAX (24 HORAS)",
    texts: ["0800-777-0097", "0800-777-0098"],
  },
  {
    title: "TELEFAX",
    texts: ["0800-444-0097"],
  },
];
export const linksData = [
  {
    title: "NOSOTROS",
    links: [
      { text: "Nuestra Empresa", href: "#" },
      { text: "Catalogos", href: "#" },
      { text: "Revista", href: "#" },
    ],
  },
  {
    title: "CLIENTES",
    links: [{ text: "Quiero ser cliente", href: "#" }],
  },
  {
    title: "INFORMACIÓN",
    links: [{ text: "Contacto", href: "#" }],
  },
];

export const socialMedia = [
  {
    href: "https://www.facebook.com/Altamiragroupsa/?locale=es_LA",
    icon: <Facebook />,
  },
  {
    href: "https://www.instagram.com/altamiragroupsa/",
    icon: <Instagram />,
  },
  {
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=info@altamiragroup.com.ar",
    icon: <Gmail />,
  },
  {
    href: "https://maps.app.goo.gl/ss5zqFedYTA4G2xE9",
    icon: <Location />,
  },
];