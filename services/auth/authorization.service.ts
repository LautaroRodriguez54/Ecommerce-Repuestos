import "server-only";
import { getAuthenticatedUser } from "./authenticated-user.service";

export async function requireAdmin() {
  const user = await getAuthenticatedUser();

  if (!user) throw new Error("UNAUTHORIZED");
  if (user.role !== "ADMIN") throw new Error("FORBIDDEN");

  return user;
}
