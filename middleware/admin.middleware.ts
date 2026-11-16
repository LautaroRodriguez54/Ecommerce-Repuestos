import { NextRequest, NextResponse } from "next/server";

import { ROLES } from "@/constants/roles";
import { getSessionByToken } from "@/services/session/session.service";

/**
 * Protege las pantallas administrativas antes de que rendericen.
 * La API mantiene su propia validación de rol: este guard sólo controla la
 * navegación y no sustituye la autorización de los endpoints.
 */

export async function protectAdminRoute(request: NextRequest) {
  const token = request.cookies.get("session")?.value;

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set(
      "next",
      `${request.nextUrl.pathname}${request.nextUrl.search}`,
    );

    return NextResponse.redirect(loginUrl);
  }

  const session = await getSessionByToken(token);

  if (!session || session.user.role !== ROLES.ADMIN) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
