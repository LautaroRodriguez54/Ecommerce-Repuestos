import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { getSessionByToken } from "@/services/session/session.service";

class CartError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) return null;

  const session = await getSessionByToken(token);

  return session?.user ?? null;
}

function errorResponse(error: unknown) {
  if (error instanceof CartError) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: error.status },
    );
  }

  console.error("Error en el carrito:", error);

  return NextResponse.json(
    {
      success: false,
      message: "No se pudo procesar el carrito. Intentá nuevamente.",
    },
    { status: 500 },
  );
}

// Consultar el carrito del usuario.
export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      throw new CartError("Debés iniciar sesión.", 401);
    }

    const cart = await prisma.cart.findUnique({
      where: { userId: user.id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: cart,
    });
  } catch (error) {
    return errorResponse(error);
  }
}

// Agregar unidades de un producto al carrito.
export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      throw new CartError("Debés iniciar sesión.", 401);
    }

    let body;

    try {
      body = await request.json();
    } catch {
      throw new CartError("Los datos enviados no son válidos.", 400);
    }

    const productId = body?.productId;
    const quantity = body?.quantity;

    if (
      typeof productId !== "string" ||
      !productId.trim() ||
      !Number.isSafeInteger(quantity) ||
      quantity < 1
    ) {
      throw new CartError(
        "Enviá un producto y una cantidad entera mayor que cero.",
        400,
      );
    }

    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const item = await prisma.$transaction(
          async (tx) => {
            const product = await tx.product.findUnique({
              where: { id: productId },
            });

            if (!product || !product.isActive) {
              throw new CartError("Producto no disponible.", 404);
            }

            const cart = await tx.cart.upsert({
              where: { userId: user.id },
              update: {},
              create: { userId: user.id },
            });

            const existing = await tx.cartItem.findUnique({
              where: {
                cartId_productId: {
                  cartId: cart.id,
                  productId: product.id,
                },
              },
            });

            const totalQuantity = (existing?.quantity ?? 0) + quantity;

            if (totalQuantity > product.stock) {
              throw new CartError(
                `Stock insuficiente. Hay ${product.stock} unidades disponibles.`,
                400,
              );
            }

            return tx.cartItem.upsert({
              where: {
                cartId_productId: {
                  cartId: cart.id,
                  productId: product.id,
                },
              },
              update: {
                quantity: totalQuantity,
                price: product.price,
              },
              create: {
                cartId: cart.id,
                productId: product.id,
                quantity: totalQuantity,
                price: product.price,
              },
              include: {
                product: true,
              },
            });
          },
          {
            isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
          },
        );

        return NextResponse.json({
          success: true,
          data: item,
        });
      } catch (error) {
        const retryable =
          error instanceof Prisma.PrismaClientKnownRequestError &&
          (error.code === "P2034" || error.code === "P2002");

        if (!retryable || attempt === 2) {
          throw error;
        }
      }
    }

    throw new Error("No se pudo completar la operación.");
  } catch (error) {
    return errorResponse(error);
  }
}
