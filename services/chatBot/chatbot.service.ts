import { GoogleGenAI } from "@google/genai";
import automotiveKnowledgeJson from "@/chatbot-knowlege.json";
import productsJson from "@/chatbot-products.json";
import type {
  AutomotiveKnowledge,
  ChatbotProduct,
  VehicleRequest,
  CompatibleVehicle,
  ChatHistoryMessage,
} from "@/types/chatbot";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) throw new Error("No se encontró GEMINI_API_KEY.");

const ai = new GoogleGenAI({ apiKey });
const GEMINI_MODEL = "gemini-3.5-flash-lite";

const automotiveKnowledge = automotiveKnowledgeJson as AutomotiveKnowledge[];
const products = productsJson as ChatbotProduct[];

type VariantOption = {
  label: string;
  model?: string;
  engineDisplacement?: string;
  driveType?: string;
  version?: string;
};

type AvailableModel = { base: string; models: string[] };

// Normalización
const normalizeText = (value: string) =>
  value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

const normalizeModel = (value: string) =>
  normalizeText(value).replace(/\s+/g, " ");

const normalizeModelBase = (value: string) =>
  normalizeModel(value)
    .replace(/\b(pickup|4wd|4x2|4x4)\b/g, "")
    .replace(/\b\d+(?:\.\d+)?\s*l\b/g, "")
    .replace(/\s+/g, " ")
    .trim();

const normalizeDriveType = (value: string) =>
  normalizeText(value).replace(/[\s-]/g, "").replace(/4x4/g, "4wd");

const normalizeDisplacement = (value: string) =>
  normalizeText(value).replace(/\s+/g, "").replace(/l$/, "");

const normalizePosition = (value: string) => {
  const position = normalizeText(value);
  if (["delantero", "delantera", "front"].includes(position)) return "delantero";
  if (["trasero", "trasera", "rear"].includes(position)) return "trasero";
  return position;
};

const getDriveFromModel = (model: string) => {
  const match = model.match(/\b4\s*[xX]\s*[24]|4WD\b/i);
  return match ? normalizeDriveType(match[0]) : null;
};

const getDisplacement = (vehicle: CompatibleVehicle) =>
  vehicle.engineDisplacement ?? vehicle.model.match(/\b\d+(?:\.\d+)?\s*L\b/i)?.[0] ?? null;

const getPartKeywords = (request: VehicleRequest) =>
  [...request.partKeywords, request.part]
    .filter((value): value is string => Boolean(value))
    .map((value) => normalizeText(value).split(/\s+/));

// Interpretación de la consulta
const extractVehicleRequest = async (
  message: string,
  history: ChatHistoryMessage[],
): Promise<VehicleRequest> => {
  const contents = [
    ...history.map(({ role, content }) => ({
      role: role === "assistant" ? ("model" as const) : ("user" as const),
      parts: [{ text: content }],
    })),
    { role: "user" as const, parts: [{ text: message }] },
  ];

  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    config: {
      responseMimeType: "application/json",
      systemInstruction: `
Sos un asistente especializado en interpretar consultas sobre repuestos automotrices.

Analizá el mensaje actual teniendo en cuenta toda la conversación.
Devolvé exclusivamente un JSON con esta estructura:

{
  "brand": null,
  "model": null,
  "year": null,
  "part": null,
  "partKeywords": [],
  "position": null,
  "positions": [],
  "engineDisplacement": null,
  "driveType": null,
  "version": null
}

REGLAS GENERALES:
- Recuperá y conservá los datos anteriores de la conversación.
- Actualizá los datos cuando el usuario proporcione información nueva.
- No inventes información.
- Los datos faltantes deben ser null o un array vacío.
- El año debe ser un número o null.
- No confundas el año con la cilindrada.
- No agregues explicaciones fuera del JSON.

MARCA Y MODELO:
- Identificá marca y modelo.
- Conservá el nombre completo del modelo tal como lo menciona el usuario.
- No elimines palabras como Pickup, 4WD, 4x2 o denominaciones similares.
- No confundas variantes de un modelo con modelos diferentes.
- Si el usuario dice solamente una marca, model debe ser null.
- Si dice solamente el modelo base, no inventes una variante.

REPUESTOS:
- "part" debe contener el repuesto o categoría solicitada.
- "partKeywords" debe incluir sinónimos útiles para buscarlo.
- "Frenos" es una categoría general: incluí términos como pastillas, discos y freno.
- "Pastillas" significa pastillas de freno.
- "Amortiguadores" significa amortiguadores.
- Si se menciona un repuesto específico, priorizalo sobre la categoría.
- No incluyas las posiciones dentro de part ni partKeywords.
- No exijas que el usuario conozca el nombre técnico del repuesto.
- Si pregunta qué repuestos hay para un vehículo, dejá part en null.

POSICIONES:
- Si menciona solamente la posición delantera:
  position = "delantera", positions = ["delantera"].
- Si menciona solamente la posición trasera:
  position = "trasera", positions = ["trasera"].
- Si menciona ambas:
  position = null, positions = ["delantera", "trasera"].
- Si no menciona ninguna:
  position = null, positions = [].
- No supongas posiciones que no fueron indicadas.
- Actualizá las posiciones si el usuario cambia su solicitud.

CILINDRADA Y TRACCIÓN:
- Devolvé la cilindrada como texto, por ejemplo "2.4 L" o "3.0 L".
- Identificá 4WD, 4x4 y 4x2 únicamente cuando el usuario los mencione.
- Conservá estos datos si fueron mencionados anteriormente.
- No deduzcas la tracción a partir de notas sobre compatibilidad de un repuesto.
- Si no se conocen, devolvé null.

VERSIONES:
- Identificá versiones, generaciones o acabados mencionados, por ejemplo CE, LE, S o G7.
- Guardalos en version.
- No inventes versiones ni confundas características del repuesto con versiones del vehículo.
- Si el usuario selecciona una variante, guardala en el campo correspondiente.
- Conservá la versión mencionada anteriormente.

CONSULTAS GENERALES:
- Si no conoce el año, dejá year en null.
- Conservá marca y modelo aunque falten otros datos.
- Si el usuario responde a una pregunta sobre una variante, actualizá el modelo o característica correspondiente.
`,
    },
    contents,
  });

  if (!response.text) throw new Error("Gemini no pudo interpretar el mensaje.");

  try {
    const parsed = JSON.parse(response.text) as VehicleRequest;
    return {
      ...parsed,
      partKeywords: parsed.partKeywords ?? [],
      positions: parsed.positions ?? [],
    };
  } catch {
    throw new Error("Gemini devolvió un JSON inválido.");
  }
};

// Vehículos y modelos disponibles
const matchesVehicleFamily = (
  vehicle: CompatibleVehicle,
  request: VehicleRequest,
) =>
  normalizeText(vehicle.brand) === normalizeText(request.brand ?? "") &&
  normalizeModelBase(vehicle.model) === normalizeModelBase(request.model ?? "");

const getVehicleRecords = (request: VehicleRequest) =>
  automotiveKnowledge.flatMap(({ compatibleVehicles }) =>
    compatibleVehicles.filter((vehicle) => matchesVehicleFamily(vehicle, request)),
  );

const getAvailableModels = (brand: string): AvailableModel[] => {
  const models = automotiveKnowledge
    .flatMap(({ compatibleVehicles }) => compatibleVehicles)
    .filter((vehicle) => normalizeText(vehicle.brand) === normalizeText(brand));

  const grouped = new Map<string, Set<string>>();

  for (const { model } of models) {
    const base = normalizeModelBase(model);
    if (!grouped.has(base)) grouped.set(base, new Set());
    grouped.get(base)!.add(model.trim());
  }

  return [...grouped].map(([base, modelSet]) => ({
    base,
    models: [...modelSet].sort(),
  }));
};

const inferBrandFromModel = (model: string): string | null => {
  const brands = new Set(
    automotiveKnowledge
      .flatMap(({ compatibleVehicles }) => compatibleVehicles)
      .filter((vehicle) => normalizeModelBase(vehicle.model) === normalizeModelBase(model))
      .map(({ brand }) => brand),
  );

  return brands.size === 1 ? [...brands][0] : null;
};

const getAvailableModelsQuestion = (
  brand: string,
  availableModels: AvailableModel[],
) => {
  if (!availableModels.length)
    return `Por el momento no tenemos modelos de ${brand} registrados en nuestro catálogo.`;

  const details = availableModels.map(({ models }) =>
    `• ${models[0]}${models.length > 1 ? ` (variantes: ${models.join(", ")})` : ""}`,
  );

  return `No tenemos registrado ese modelo de ${brand} en nuestro catálogo.\n\nActualmente contamos con estos modelos:\n\n${details.join("\n")}\n\n¿Sobre cuál de estos modelos querés consultar?`;
};

// Variantes disponibles
const extractTrimVersions = (notes: string): string[] => {
  const match = normalizeText(notes).match(
    /\bversiones?\s+([a-z0-9]+(?:\s*,\s*[a-z0-9]+)*(?:\s+y\s+[a-z0-9]+)?)/,
  );

  return match
    ? [
        ...new Set(
          match[1]
            .split(/\s*,\s*|\s+y\s+/)
            .map((value) => value.trim().toUpperCase())
            .filter(Boolean),
        ),
      ]
    : [];
};

const getAvailableVariants = (request: VehicleRequest): VariantOption[] => {
  const options = new Map<string, VariantOption>();

  for (const vehicle of getVehicleRecords(request)) {
    const model = vehicle.model.trim();
    const displacement = getDisplacement(vehicle);
    const driveType = getDriveFromModel(model);
    const label =
      displacement && !normalizeModel(model).includes(normalizeModel(displacement))
        ? `${model} ${displacement}`
        : model;

    options.set(`${normalizeModel(model)}:${normalizeDisplacement(displacement ?? "")}`, {
      label,
      model,
      ...(displacement && { engineDisplacement: displacement }),
      ...(driveType && { driveType }),
    });

    const versions = extractTrimVersions(vehicle.notes ?? "");
    for (const version of versions)
      options.set(`version:${normalizeText(version)}`, { label: version, version });

    const generation = normalizeText(model).match(/\bg\d+\b/);
    if (generation) {
      const version = generation[0].toUpperCase();
      options.set(`version:${version}`, { label: version, version });
    }
  }

  return [...options.values()];
};

// Selección de variante
const wasAskingForVariant = (history: ChatHistoryMessage[]) => {
  const lastAssistant = [...history].reverse().find(({ role }) => role === "assistant");

  return !!lastAssistant &&
    /¿cuál|cual|¿te interesa esta opción|¿te interesa esta opcion/i.test(lastAssistant.content) &&
    /opciones|variantes?|versiones?|modelos?/i.test(lastAssistant.content);
};

const isAffirmative = (message: string) =>
  ["si", "claro", "correcto", "me interesa", "esa", "esa opcion", "dale", "ok", "si, esa"]
    .includes(normalizeText(message));

const hasExplicitVariant = (request: VehicleRequest) => {
  const model = request.model ?? "";
  return normalizeModel(model) !== normalizeModelBase(model) ||
    !!request.engineDisplacement ||
    !!request.driveType ||
    !!request.version;
};

const getSelectedVariant = (
  message: string,
  request: VehicleRequest,
  variants: VariantOption[],
  history: ChatHistoryMessage[],
): VariantOption | undefined => {
  const normalizedMessage = normalizeText(message);
  const cleanAnswer = normalizedMessage
    .replace(/^(la version|el modelo|la opcion|la|el|mi|tengo|es)\s+/g, "")
    .trim();

  const requestedModel = normalizeModel(request.model ?? "");
  const requestedBase = normalizeModelBase(request.model ?? "");
  const hasSpecificModel = requestedModel !== requestedBase;

  const selected = variants.find((variant) => {
    const modelMatches = hasSpecificModel &&
      !!variant.model &&
      normalizeModel(variant.model) === requestedModel;

    const displacementMatches = !!request.engineDisplacement &&
      !!variant.engineDisplacement &&
      normalizeDisplacement(variant.engineDisplacement) ===
        normalizeDisplacement(request.engineDisplacement);

    const driveMatches = !!request.driveType &&
      !!variant.driveType &&
      normalizeDriveType(variant.driveType) === normalizeDriveType(request.driveType);

    const versionMatches = !!request.version &&
      !!variant.version &&
      normalizeText(variant.version) === normalizeText(request.version);

    return (
      (modelMatches || displacementMatches || driveMatches || versionMatches) &&
      (!hasSpecificModel || modelMatches) &&
      (!request.engineDisplacement || displacementMatches) &&
      (!request.driveType || driveMatches) &&
      (!request.version || versionMatches)
    );
  });

  if (selected) return selected;

  if (wasAskingForVariant(history)) {
    const answer = variants.find((variant) =>
      [
        normalizeText(variant.label),
        normalizeModel(variant.model ?? ""),
        normalizeText(variant.version ?? ""),
      ].includes(cleanAnswer),
    );

    if (answer) return answer;
    if (variants.length === 1 && isAffirmative(message)) return variants[0];
  }

  return undefined;
};

const getVariantQuestion = (
  variants: VariantOption[],
  request: VehicleRequest,
) => {
  const details = [
    normalizeModel(request.model ?? "") !== normalizeModelBase(request.model ?? "")
      ? request.model
      : null,
    request.engineDisplacement,
    request.version,
    request.driveType &&
    !normalizeModel(request.model ?? "").includes(normalizeDriveType(request.driveType))
      ? request.driveType
      : null,
  ].filter(Boolean);

  const options = variants.map(({ label }, index) => `${index + 1}. ${label}`).join("\n");

  if (hasExplicitVariant(request))
    return `No tenemos registrada la variante ${details.join(" ")} de ${request.brand} ${normalizeModelBase(request.model ?? "")}.\n\nEstas son las variantes que tenemos disponibles:\n\n${options}\n\n¿Alguna de estas es la tuya?`;

  return variants.length === 1
    ? `Encontré esta variante: ${variants[0].label}. ¿Es la tuya?`
    : `Encontré distintas variantes de ${request.brand} ${request.model}. ¿Cuál es la tuya?\n\n${options}`;
};

const applyVariant = (
  request: VehicleRequest,
  variant: VariantOption,
): VehicleRequest => ({
  ...request,
  ...(variant.model && { model: variant.model }),
  ...(variant.engineDisplacement && { engineDisplacement: variant.engineDisplacement }),
  ...(variant.driveType && { driveType: variant.driveType }),
  ...(variant.version && { version: variant.version }),
});

// Compatibilidad técnica
const matchesSelectedModel = (
  vehicle: CompatibleVehicle,
  request: VehicleRequest,
) => {
  const model = request.model ?? "";
  return normalizeModel(model) === normalizeModelBase(model) ||
    normalizeModel(vehicle.model) === normalizeModel(model);
};

const matchesRequestedVehicle = (
  vehicle: CompatibleVehicle,
  request: VehicleRequest,
) => {
  if (!matchesVehicleFamily(vehicle, request) || !matchesSelectedModel(vehicle, request))
    return false;

  if (request.year &&
    (request.year < vehicle.yearFrom || request.year > (vehicle.yearTo ?? Infinity)))
    return false;

  if (request.engineDisplacement &&
    normalizeDisplacement(request.engineDisplacement) !==
      normalizeDisplacement(getDisplacement(vehicle) ?? ""))
    return false;

  const vehicleDrive = getDriveFromModel(vehicle.model);
  if (request.driveType && vehicleDrive &&
    normalizeDriveType(request.driveType) !== vehicleDrive)
    return false;

  if (request.version &&
    !normalizeText(vehicle.model).includes(normalizeText(request.version)) &&
    !normalizeText(vehicle.notes ?? "").includes(normalizeText(request.version)))
    return false;

  return true;
};

const findCompatibleParts = (request: VehicleRequest): AutomotiveKnowledge[] => {
  if (!request.brand || !request.model || !request.year || !request.part) return [];

  const positions = (
    request.positions.length ? request.positions : request.position ? [request.position] : []
  ).map(normalizePosition);

  const keywords = getPartKeywords(request);

  return automotiveKnowledge.filter((item) => {
    if (!item.compatibleVehicles.some((vehicle) => matchesRequestedVehicle(vehicle, request)))
      return false;

    const searchableText = normalizeText([
      item.name,
      item.category,
      item.position,
      ...Object.values(item.technicalDetails ?? {}),
    ].filter(Boolean).join(" "));

    const partMatches = keywords.some((words) =>
      words.every((word) => searchableText.includes(word)),
    );

    return partMatches &&
      (!positions.length || positions.includes(normalizePosition(item.position ?? "")));
  });
};

// Productos asociados por SKU
const findProductsBySku = (parts: AutomotiveKnowledge[]) => {
  const skus = new Set(parts.map(({ sku }) => normalizeText(sku)));
  return products.filter(({ sku }) => skus.has(normalizeText(sku)));
};

// Consultas exploratorias
const isBrowseRequest = (message: string) =>
  /\b(que repuestos|que repuesto|que tenes|que tienes|que me ofreces|para que anos|que hay|catalogo)\b/
    .test(normalizeText(message));

const hasBrowseIntent = (message: string, history: ChatHistoryMessage[]) =>
  isBrowseRequest(message) ||
  history.some(({ role, content }) => role === "user" && isBrowseRequest(content));

const isUnknownYear = (message: string, history: ChatHistoryMessage[]) => {
  const answers = ["no se", "no lo se", "no recuerdo", "no me acuerdo"];
  const lastAssistant = [...history].reverse().find(({ role }) => role === "assistant");

  return answers.includes(normalizeText(message)) &&
    !!lastAssistant &&
    /de qué año|de que ano/i.test(lastAssistant.content);
};

const browseVehicle = (request: VehicleRequest) => {
  const records = automotiveKnowledge.filter((item) =>
    item.compatibleVehicles.some((vehicle) => matchesRequestedVehicle(vehicle, request)),
  );

  const keywords = getPartKeywords(request);

  const filteredRecords = request.part
    ? records.filter((item) => {
        const text = normalizeText([
          item.name,
          item.category,
          ...Object.values(item.technicalDetails ?? {}),
        ].filter(Boolean).join(" "));

        return keywords.some((words) => words.every((word) => text.includes(word)));
      })
    : records;

  const foundProducts = findProductsBySku(filteredRecords);

  if (!foundProducts.length)
    return {
      reply: `No encontramos repuestos en el catálogo para ${request.brand} ${request.model}${request.year ? ` ${request.year}` : ""}.`,
      products: [],
    };

  const details = foundProducts.map((product) => {
    const ranges = filteredRecords
      .filter((item) => normalizeText(item.sku) === normalizeText(product.sku))
      .flatMap((item) =>
        item.compatibleVehicles
          .filter((vehicle) => matchesRequestedVehicle(vehicle, request))
          .map(({ yearFrom, yearTo }) =>
            yearTo ? `${yearFrom}-${yearTo}` : `desde ${yearFrom}`,
          ),
      );

    return `• ${product.name}${ranges.length ? ` (años: ${[...new Set(ranges)].join(", ")})` : ""}`;
  });

  return {
    reply: `Estos son los repuestos que encontré para ${request.brand} ${request.model}${request.year ? ` ${request.year}` : ""}:\n\n${details.join("\n")}`,
    products: foundProducts,
  };
};

// Flujo principal
export const sendMessageToGemini = async (
  message: string,
  history: ChatHistoryMessage[] = [],
) => {
  let request = await extractVehicleRequest(message, history);

  if (!request.brand && request.model)
    request = { ...request, brand: inferBrandFromModel(request.model) };

  console.log("Solicitud interpretada:", request);

  if (!request.brand)
    return { reply: "¿De qué marca es tu vehículo?", products: [] };

  if (!request.model)
    return { reply: `¿Qué modelo de ${request.brand} tenés?`, products: [] };

  const availableModels = getAvailableModels(request.brand);
  const requestedModelBase = normalizeModelBase(request.model);

  if (!availableModels.some(({ base }) => base === requestedModelBase))
    return {
      reply: getAvailableModelsQuestion(request.brand, availableModels),
      products: [],
    };

  const variants = getAvailableVariants(request);

  if (variants.length) {
    const selected = getSelectedVariant(message, request, variants, history);

    if (!selected)
      return { reply: getVariantQuestion(variants, request), products: [] };

    request = applyVariant(request, selected);
  }

  if (hasBrowseIntent(message, history) || isUnknownYear(message, history))
    return browseVehicle(request);

  if (!request.year)
    return {
      reply: `¿De qué año es tu ${request.brand} ${request.model}?`,
      products: [],
    };

  if (!request.part)
    return {
      reply: "¿Qué repuesto estás buscando para tu vehículo?",
      products: [],
    };

  const compatibleParts = findCompatibleParts(request);
  console.log("Coincidencias técnicas:", compatibleParts);

  if (!compatibleParts.length)
    return {
      reply: `No encontramos información técnica que confirme la compatibilidad de ${request.part} para tu ${request.brand} ${request.model} ${request.year}.`,
      products: [],
    };

  const foundProducts = findProductsBySku(compatibleParts);
  console.log("Productos encontrados:", foundProducts);

  if (!foundProducts.length)
    return {
      reply: `Encontramos información técnica sobre ${request.part} para tu ${request.brand} ${request.model} ${request.year}, pero no encontramos esos productos en nuestro catálogo actual.`,
      products: [],
    };

  return {
    reply: `Encontramos estos productos compatibles con tu ${request.brand} ${request.model} ${request.year}.`,
    products: foundProducts,
  };
};
