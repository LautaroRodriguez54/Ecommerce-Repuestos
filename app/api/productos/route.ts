import { productSchema } from "@/validators/product.schema";

import {
  createProduct,
  getActiveProducts,
} from "@/services/product/product.service";

import {
  badRequest,
  created,
  serverError,
  success,
} from "@/utils/apiResponse";

/**
 * GET /api/productos
 * Devuelve todos los productos activos.
 */
export async function GET() {
  try {
    return success(await getActiveProducts());
  } catch {
    return serverError();
  }
}

/**
 * POST /api/productos
 * Crea un nuevo producto.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validation = productSchema.safeParse(body);

    if (!validation.success) {
      return badRequest(validation.error.issues[0].message);
    }

    const product = await createProduct(validation.data);

    return created(product);
  } catch (error) {
    return badRequest(
      error instanceof Error
        ? error.message
        : "Error al crear el producto."
    );
  }
}