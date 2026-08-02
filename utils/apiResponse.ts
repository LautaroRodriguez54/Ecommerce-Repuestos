import { NextResponse } from "next/server";

/**
 * Respuesta exitosa (200 OK)
 */
export function success<T>(data: T) {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    {
      status: 200,
    }
  );
}

/**
 * Recurso creado (201 Created)
 */
export function created<T>(data: T) {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    {
      status: 201,
    }
  );
}

/**
 * Sin contenido (204 No Content)
 */
export function noContent() {
  return new NextResponse(null, {
    status: 204,
  });
}

/**
 * Solicitud inválida (400 Bad Request)
 */
export function badRequest(message: string) {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    {
      status: 400,
    }
  );
}

/**
 * No autenticado (401 Unauthorized)
 */
export function unauthorized(
  message = "No autorizado."
) {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    {
      status: 401,
    }
  );
}

/**
 * Acceso prohibido (403 Forbidden)
 */
export function forbidden(
  message = "Acceso denegado."
) {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    {
      status: 403,
    }
  );
}

/**
 * Recurso no encontrado (404 Not Found)
 */
export function notFound(message: string) {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    {
      status: 404,
    }
  );
}

/**
 * Conflicto (409 Conflict)
 */
export function conflict(message: string) {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    {
      status: 409,
    }
  );
}

/**
 * Error interno (500 Internal Server Error)
 */
export function serverError(
  message = "Error interno del servidor."
) {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    {
      status: 500,
    }
  );
}