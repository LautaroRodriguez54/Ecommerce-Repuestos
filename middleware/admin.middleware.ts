import { NextRequest, NextResponse } from "next/server";

import { ROLES } from "@/constants/roles";
import { getSessionByToken } from "@/services/session/session.service";

type AccessReason = "unauthenticated" | "admin-required" | "client-required";

type ProtectedRoute = {
  path: string;
  role: string;
};

const PROTECTED_ROUTES: ProtectedRoute[] = [
  { path: "/admin", role: ROLES.ADMIN },
  { path: "/register", role: ROLES.ADMIN },
  { path: "/panel", role: ROLES.CLIENT },
];

function getRequiredRole(pathname: string) {
  return PROTECTED_ROUTES.find(
    ({ path }) => pathname === path || pathname.startsWith(`${path}/`),
  )?.role;
}

function redirectToAccessDenied(request: NextRequest, reason: AccessReason) {
  const url = new URL("/acceso-denegado", request.url);

  url.searchParams.set("reason", reason);

  if (reason === "unauthenticated") {
    url.searchParams.set(
      "next",
      `${request.nextUrl.pathname}${request.nextUrl.search}`,
    );
  }

  return NextResponse.redirect(url);
}

/**
 * Controla el acceso a las páginas protegidas
 * según la sesión y el rol del usuario.
 */
export async function protectAdminRoute(request: NextRequest) {
  const requiredRole = getRequiredRole(request.nextUrl.pathname);

  if (!requiredRole) {
    return NextResponse.next();
  }

  const token = request.cookies.get("session")?.value;

  if (!token) {
    return redirectToAccessDenied(request, "unauthenticated");
  }

  const session = await getSessionByToken(token);

  if (!session) {
    return redirectToAccessDenied(request, "unauthenticated");
  }

  if (session.user.role !== requiredRole) {
    const reason: AccessReason =
      requiredRole === ROLES.ADMIN ? "admin-required" : "client-required";

    return redirectToAccessDenied(request, reason);
  }

  return NextResponse.next();
}