"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { statusConfig } from "./status-config";
import styles from "../ui/ui.module.css";

interface RedirectPageProps {
  status?: number;
  title?: string;
  message?: string;
  redirectTo?: string;
  seconds?: number;
  children?: React.ReactNode;
}

export function RedirectPage({
  status = 404,
  title,
  message,
  redirectTo,
  seconds = 3,
  children,
}: RedirectPageProps) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(seconds);

  const config = statusConfig[status] ?? statusConfig[404];

  useEffect(() => {
    if (!redirectTo) return;

    if (countdown <= 0) {
      router.replace(redirectTo);
      return;
    }

    const timeout = window.setTimeout(() => {
      setCountdown((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => window.clearTimeout(timeout);
  }, [countdown, redirectTo, router]);

  return (
    <div className={styles.container}>
      <img src={config.image} alt="" />

      <h1>{title ?? config.title}</h1>

      <p>{message ?? config.message}</p>

      {redirectTo ? (
        <>
          <div className={styles.loader} />

          <span>
            Redireccionando en <strong>{countdown}...</strong>
          </span>
        </>
      ) : (
        children
      )}
    </div>
  );
}