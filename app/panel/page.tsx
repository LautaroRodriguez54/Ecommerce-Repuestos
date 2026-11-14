"use client";
import { useClientGuard } from "@/components/permission/useUserGuard";
import { PermissionGate } from "@/components/permission/PermissionGate";

export default function Page() {
  const { authorized, loading } = useClientGuard();

  return (
    <PermissionGate loading={loading} authorized={authorized}>
      <div>
        <h1>MI PANEL</h1>
      </div>
    </PermissionGate>
  );
}
