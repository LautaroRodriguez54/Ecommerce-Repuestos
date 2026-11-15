import foto1 from "./bujia-ngk-civic.webp";
import foto2 from "./horquilla2.webp";
import foto3 from "./horquilla3.webp";
import foto4 from "./horquilla4.webp";

const fotos = [foto1.src, foto2.src, foto3.src, foto4.src];

export function getProductImage(id: string) {
  let indice = 0;

  for (const letra of id) {
    indice = (indice + letra.charCodeAt(0)) % fotos.length;
  }

  return fotos[indice];
}