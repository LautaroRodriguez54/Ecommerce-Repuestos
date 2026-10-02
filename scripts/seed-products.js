const API_URL = "http://localhost:3000/api";

const productosBase = [
  // =========================
  // FRENOS
  // =========================

  {
    name: "Pastillas de Freno Bosch",
    category: "Frenos",
    models: ["Cruze", "Corolla", "Civic Touring"],
    description: "Pastillas de freno Bosch para uso urbano y ruta.",
    price: 32000,
    stock: 18,
    compatibleYear: 2022,
    image: "https://picsum.photos/500?random=201",
  },

  {
    name: "Pastillas de Freno Brembo",
    category: "Frenos",
    models: ["Cruze", "Ranger"],
    description: "Pastillas de freno Brembo de alto rendimiento.",
    price: 45000,
    stock: 10,
    compatibleYear: 2023,
    image: "https://picsum.photos/500?random=202",
  },

  {
    name: "Discos de Freno Bosch",
    category: "Frenos",
    models: ["Cruze", "Corolla", "Hilux"],
    description: "Disco de freno Bosch para reemplazo de equipo original.",
    price: 68000,
    stock: 7,
    compatibleYear: 2021,
    image: "https://picsum.photos/500?random=203",
  },

  {
    name: "Discos de Freno Brembo",
    category: "Frenos",
    models: ["Civic Touring", "Ranger"],
    description: "Discos de freno Brembo para sistemas de frenado exigentes.",
    price: 82000,
    stock: 5,
    compatibleYear: 2022,
    image: "https://picsum.photos/500?random=204",
  },

  {
    name: "Kit de Freno Trasero",
    category: "Frenos",
    models: ["Corolla", "Hilux"],
    description: "Kit completo para mantenimiento del sistema de freno trasero.",
    price: 54000,
    stock: 9,
    compatibleYear: 2020,
    image: "https://picsum.photos/500?random=205",
  },

  // =========================
  // SUSPENSIÓN
  // =========================

  {
    name: "Amortiguador Delantero Monroe",
    category: "Suspensión Premium",
    models: ["Corolla", "Hilux", "Ranger"],
    description: "Amortiguador delantero Monroe para reemplazo del sistema original.",
    price: 85000,
    stock: 12,
    compatibleYear: 2022,
    image: "https://picsum.photos/500?random=206",
  },

  {
    name: "Amortiguador Trasero Monroe",
    category: "Suspensión Premium",
    models: ["Cruze", "Corolla", "Ranger"],
    description: "Amortiguador trasero Monroe de excelente durabilidad.",
    price: 72000,
    stock: 8,
    compatibleYear: 2021,
    image: "https://picsum.photos/500?random=207",
  },

  {
    name: "Amortiguador KYB",
    category: "Suspensión Premium",
    models: ["Civic Touring", "Hilux"],
    description: "Amortiguador KYB para mejorar estabilidad y confort.",
    price: 91000,
    stock: 6,
    compatibleYear: 2023,
    image: "https://picsum.photos/500?random=208",
  },

  {
    name: "Bieleta Estabilizadora",
    category: "Suspensión Premium",
    models: ["Cruze", "Corolla", "Civic Touring", "Ranger"],
    description: "Bieleta estabilizadora para mantenimiento de suspensión.",
    price: 28000,
    stock: 20,
    compatibleYear: 2020,
    image: "https://picsum.photos/500?random=209",
  },

  {
    name: "Soporte de Amortiguador",
    category: "Suspensión Premium",
    models: ["Corolla", "Hilux"],
    description: "Soporte superior para amortiguador delantero.",
    price: 36000,
    stock: 14,
    compatibleYear: 2021,
    image: "https://picsum.photos/500?random=210",
  },

  // =========================
  // ELECTRICIDAD
  // =========================

  {
    name: "Bujías NGK",
    category: "Electricidad",
    models: ["Cruze", "Corolla", "Civic Touring"],
    description: "Juego de bujías NGK para motores nafteros.",
    price: 18500,
    stock: 25,
    compatibleYear: 2022,
    image: "https://picsum.photos/500?random=211",
  },

  {
    name: "Batería Moura",
    category: "Electricidad",
    models: ["Cruze", "Corolla", "Ranger"],
    description: "Batería Moura de alto rendimiento para vehículos livianos.",
    price: 145000,
    stock: 4,
    compatibleYear: 2023,
    image: "https://picsum.photos/500?random=212",
  },

  {
    name: "Bobina de Encendido",
    category: "Electricidad",
    models: ["Cruze", "Civic Touring"],
    description: "Bobina de encendido para sistemas de ignición electrónica.",
    price: 42000,
    stock: 11,
    compatibleYear: 2021,
    image: "https://picsum.photos/500?random=213",
  },

  {
    name: "Alternador",
    category: "Electricidad",
    models: ["Hilux", "Ranger"],
    description: "Alternador para sistema eléctrico del vehículo.",
    price: 185000,
    stock: 3,
    compatibleYear: 2020,
    image: "https://picsum.photos/500?random=214",
  },

  {
    name: "Motor de Arranque",
    category: "Electricidad",
    models: ["Corolla", "Hilux", "Ranger"],
    description: "Motor de arranque para reemplazo del componente original.",
    price: 165000,
    stock: 4,
    compatibleYear: 2021,
    image: "https://picsum.photos/500?random=215",
  },
];

async function getData(endpoint) {
  const response = await fetch(`${API_URL}/${endpoint}`);

  if (!response.ok) {
    throw new Error(
      `Error obteniendo ${endpoint}: ${response.status}`
    );
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(`La API rechazó GET /${endpoint}`);
  }

  return result.data;
}

async function createProduct(producto) {
  const response = await fetch(`${API_URL}/productos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(producto),
  });

  const result = await response.json();

  return {
    status: response.status,
    success: response.ok,
    result,
  };
}

async function main() {
  console.log("Obteniendo categorías...");
  const categorias = await getData("categorias");

  console.log("Obteniendo modelos...");
  const modelos = await getData("modelos");

  console.log("Obteniendo productos existentes...");
  const productosExistentes = await getData("productos");

  const categoriasMap = new Map(
    categorias.map((categoria) => [
      categoria.name,
      categoria.id,
    ])
  );

  const modelosMap = new Map(
    modelos.map((modelo) => [
      modelo.name,
      modelo.id,
    ])
  );

  const skusExistentes = new Set(
    productosExistentes.map((producto) => producto.sku)
  );

  let creados = 0;
  let omitidos = 0;
  let errores = 0;

  for (const productoBase of productosBase) {
    const categoryId = categoriasMap.get(
      productoBase.category
    );

    if (!categoryId) {
      console.error(
        `❌ Categoría no encontrada: ${productoBase.category}`
      );
      errores++;
      continue;
    }

    for (const modelName of productoBase.models) {
      const modelId = modelosMap.get(modelName);

      if (!modelId) {
        console.error(
          `❌ Modelo no encontrado: ${modelName}`
        );
        errores++;
        continue;
      }

      const skuBase = generarSku(
        productoBase.name,
        modelName
      );

      if (skusExistentes.has(skuBase)) {
        console.log(`⏭️ Ya existe: ${skuBase}`);
        omitidos++;
        continue;
      }

      const producto = {
        name: productoBase.name,
        sku: skuBase,
        description: productoBase.description,
        price: productoBase.price,
        stock: productoBase.stock,
        image: productoBase.image,
        compatibleYear: productoBase.compatibleYear,
        categoryId,
        modelId,
      };

      const resultado = await createProduct(producto);

      if (resultado.success) {
        console.log(
          `✅ Creado: ${producto.name} → ${modelName} (${skuBase})`
        );

        skusExistentes.add(skuBase);
        creados++;
      } else {
        console.error(
          `❌ Error creando ${skuBase}:`,
          resultado.result
        );

        errores++;
      }
    }
  }

  console.log("\n==============================");
  console.log("Carga finalizada");
  console.log("==============================");
  console.log(`Creados:  ${creados}`);
  console.log(`Omitidos: ${omitidos}`);
  console.log(`Errores:  ${errores}`);
  console.log("==============================");
}

function generarSku(nombre, modelo) {
  const nombreCodigo = nombre
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase()
    .slice(0, 12);

  const modeloCodigo = modelo
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase()
    .slice(0, 8);

  return `${nombreCodigo}-${modeloCodigo}`;
}

main().catch((error) => {
  console.error("\n❌ Error ejecutando seed:");
  console.error(error);
  process.exit(1);
});