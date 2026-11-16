import Location from "./icon/Location.jsx";
import Instagram from "./icon/Instagram.jsx";
import Gmail from "./icon/Gmail.jsx";
import Facebook from "./icon/Facebook.jsx";
import Users from "../components/icon/Users.jsx";
import Order from "../components/icon/Order.jsx";

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
      { text: "Nuestra Empresa", href: "/nosotros" },
      { text: "Catalogos", href: "/productos" },
      { text: "Revista", href: "/revista" },
    ],
  },
  {
    title: "CLIENTES",
    links: [{ text: "Quiero ser cliente", href: "/#cliente" }],
  },
  {
    title: "INFORMACIÓN",
    links: [{ text: "Contacto", href: "/#contacto" }],
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
export const adminActions = [
  { id: "orders", buttonName: "Pedidos", type: "admin", Icon: Order },
  { id: "users", buttonName: "Usuarios", type: "admin", Icon: Users },
];
export const magazineOptions = [
  { buttonName: "Precios", type: "client", Icon: Users },
  { buttonName: "Nuevos Ingresos", type: "client", Icon: Users },
  { buttonName: "Catálogo de Juntas", type: "client", Icon: Users },
];
export const usDescriptions = [
  {
    title: "Nuestra empresa",
    description:
      "Somos una empresa dedicada a la importación y distribución de repuestos automotrices con una amplia trayectoria en el mercado y clientes que nos respaldan, abasteciendo a más de 6000 negocios en las 24 provincias con un stock de mas de 13.000 artículos nacionales e importados.",
  },
  {
    title: "Experiencia",
    description:
      "Estamos orgullosos de contar con una larga trayectoria de más de 40 años de experiencia en el mercado, convirtiendonos en referentes de calidad, eficacia y profesionalismo, manteniendo los valores con los que iniciamos nuestra empresa y trabajando exitosamente con más de 6000 clientes satisfechos a lo largo de nuestra historia.",
  },
  {
    title: "Calidad",
    description:
      "En nuestra empresa tenemos la responsabilidad de llevarle a nuestros clientes los productos de la mejor calidad, es por eso que contamos con proveedores nacionales e internacionales con estándares de fabricación que garantizan la durabilidad y calidad de cada uno de nuestros artículos.",
  },
  {
    title: "Variedad",
    description:
      "Contamos con un stock en constante crecimiento de más de 13.000 artículos de origen nacional e internacional, abarcando las principales marcas de autos y una amplia variedad de piezas y autopartes con una red de distribución que nos permite llegar a todos los rincones de nuestro país.",
  },
];
export const cifras=[
  {amount:13000, statics:'Artículos en stock'},
  {amount:30, statics:'Viajantes'},
  {amount:24, statics:'Provincias'},
  {amount:6000, statics:'Clientes'},
  {amount:40, statics:'Años de experiencia'},
];