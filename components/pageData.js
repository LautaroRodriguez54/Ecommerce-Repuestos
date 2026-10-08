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
  { placeHolder: "Nombre Completo", name: "name" },
  { placeHolder: "Teléfono", name: "phone" },
  { placeHolder: "Nombre", name: "company" },
  { placeHolder: "CUIT", name: "cuit" },
  { placeHolder: "Localidad", name: "locality" },
  { placeHolder: "Dirección", name: "address" },
  { placeHolder: "Escribe aquí tu mensaje", name: "message" },
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

export const QAItems = [
  {
    question: "Cómo ser cliente",
    answer:
      "Si queres ser cliente, podés dejarnos tus datos haciendo click aquí, una vez recibimos tus datos, enviaremos a un viajante para que te visite en tu negocio. Es importante que completes todos los datos antes de enviar el formulario.",
  },
  {
    question: "Clientes particulares",
    answer:
      "Nuestra empresa se centra en el mercado mayorista y nuestros principales clientes son otras distribuidoras y casas de repuestos por lo que no vendemos a consumidor final, si usted esta interesado en comprar nuestros productos para uso personal pregunte por nosotros en su casa de repuestos de confianza o contactenos y sabremos informarle donde puede conseguirlos.",
  },
  {
    question: "Usuario y contraseña",
    answer:
      "Si usted es cliente nuestro y desea obtener su usuario y contraseña para entrar a nuestra pagina y utilizar las herramientas disponibles comuníquese con nosotros o con su vendedor y le haremos el registro. Recuerde que desde su Panel de Usuario puede ver: Últimas facturas, Estado del pedido, Informe de pago, Stock y realizar pedidos.",
  },
  {
    question: "Precios y descuentos",
    answer:
      "Si usted ya vió nuestros catálogos y y desea conocer los precios de nuestros artículos, puede ir a la sección Precios haciendo click Aquí. Los precios publicados se actualizan todos los días viernes y los mismos corresponden al precio de lista del artículo, a ese precio usted debe realizarle su descuento habitual. empresa se centra en el mercado mayorista y nuestros principales clientes son otras distribuidoras y casas de repuestos por lo que no vendemos a consumidor final, si usted esta interesado en comprar nuestros productos para uso personal pregunte por nosotros en su casa de repuestos de confianza o contactenos y sabremos informarle donde puede conseguirlos.",
  },
  {
    question: "Cuentas y Bancos",
    answer:
      "Usted puede realizar sus pagos a través de las siguientes cuentas, recuerde informar su pago indicando: Monto / Banco / Fecha para poder identificarlo.",
  },
];

export const Banks = [
  {
    bank: "Banco Provincia",
    branch: "4000",
    accountType: "CUENTA CORRIENTE",
    accountNumber: "50507-5",
    cbu: "01400021-01400205061771",
  },
  {
    bank: "Banco Nación",
    branch: "4001",
    accountType: "CUENTA CORRIENTE",
    accountNumber: "51003-5",
    cbu: "01400021-01400205061771",
  },
  {
    bank: "Banco Credicop",
    branch: "002",
    accountType: "CUENTA CORRIENTE",
    accountNumber: "8215-5",
    cbu: "0001493-01400205061771",
  },
];
