"use client";
import type { ReactNode } from "react";
import { RedirectPage } from "@/components/permission/RedirectPage";
import styles from "../ui/ui.module.css";

interface PermissionGateProps {
  loading: boolean;
  authorized: boolean;
  children: ReactNode;
  status?: number;
  redirectBack?: boolean;
  requireAuth?: boolean;
  title?: string;
  message?: string;
}

export function PermissionGate({
  loading,
  authorized,
  children,
  status = 403,
  redirectBack = false,
  requireAuth = true,
  title,
  message,
}: PermissionGateProps) {
  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.loader}></div>
        <p>Verificando sesión...</p>
      </div>
    );
  }

  const shouldRedirect = requireAuth ? !authorized : authorized;

  if (shouldRedirect) {
    return (
      <RedirectPage
        status={status}
        redirectBack={redirectBack}
        title={title}
        message={message}
      />
    );
  }

  return <>{children}</>;
}
