"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../ui/ui.module.css";

interface RedirectPageProps {
  status?: number;
  title?: string;
  message?: string;
  redirectTo?: string;
  redirectBack?: boolean;
}

const statusTitles: Record<number, string> = {
  401: "401 - No autorizado",
  403: "403 - Acceso denegado",
  404: "404 - Página no encontrada",
};

export function RedirectPage({
  status = 404,
  title,
  message = "No tenés permisos para acceder a esta página.",
  redirectTo = "/",
  redirectBack = false,
}: RedirectPageProps) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (countdown === 0) {
  if (redirectBack && window.history.length > 1) {
    router.back();
  } else {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    router.replace(redirectTo, { scroll: true });
  }

  return;
}

    const timeout = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [countdown, router, redirectTo, redirectBack]);

  return (
    <div className={styles.container}>
      <h1>{title ?? statusTitles[status] ?? `Error ${status}`}</h1>

      <p>{message}</p>

      <div className={styles.loader}></div>

      <span>
        Redireccionando en <strong>{countdown}...</strong>
      </span>
    </div>
  );
}
