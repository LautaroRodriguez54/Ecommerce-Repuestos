"use client";
import { useAuth } from "../auth/AuthContext";
export type UserRole = "ADMIN" | "CLIENT";

export function usePermissions() {
  const { user, loading } = useAuth();

  return {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === "ADMIN",
    isClient: user?.role === "CLIENT",
    isGuest: !loading && !user,
  };
}

export function useRoleGuard(role: UserRole) {
  const { user, loading, isAuthenticated } = usePermissions();

  return {
    loading,
    authorized: !loading && isAuthenticated && user?.role === role,
  };
}

export function useAdminGuard() {
  return useRoleGuard("ADMIN");
}

export function useClientGuard() {
  return useRoleGuard("CLIENT");
}