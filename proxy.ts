import type { NextRequest } from "next/server";

import { protectAdminRoute } from "@/middleware/admin.middleware";

export function proxy(request: NextRequest) {
  return protectAdminRoute(request);
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/register/:path*",
    "/panel/:path*",
  ],
};
