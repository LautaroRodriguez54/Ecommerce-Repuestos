import { useEffect, useState, type SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";
import { useAuth } from "@/components/auth/AuthContext";
import { sendResetRequest } from "./login.helpers";
import type { Usuario, ResetStep } from "@/types/pagination";

export function useLoginPage() {
  const router = useRouter();
  const { user, loading: authLoading, refreshUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  const [isResetOpen, setIsResetOpen] = useState(false);
  const [resetStep, setResetStep] = useState<ResetStep>("email");
  const [resetEmail, setResetEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isResetLoading, setIsResetLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);
  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    const usuario: Usuario = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      await login(usuario.email, usuario.password);
      await refreshUser();
      router.push("/");
    } catch (error) {
      setPopupMessage(
        error instanceof Error
          ? `No se pudo iniciar sesión:\n${error.message}`
          : "No se pudo iniciar sesión",
      );
    } finally {
      setLoading(false);
    }
  }

  function openResetModal() {
    setResetEmail(email.trim().toLowerCase());
    setResetCode("");
    setNewPassword("");
    setConfirmPassword("");
    setResetStep("email");
    setIsResetOpen(true);
  }

  function closeResetModal() {
    setIsResetOpen(false);
  }

  async function handleResetSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isResetLoading) return;

    try {
      setIsResetLoading(true);

      if (resetStep === "email") {
        const normalizedEmail = resetEmail.trim().toLowerCase();

        if (!normalizedEmail) {
          throw new Error("Ingresá un correo electrónico.");
        }

        await sendResetRequest("/api/auth/forgotPassword", {
          email: normalizedEmail,
        });

        setResetStep("code");
        return;
      }

      if (resetStep === "code") {
        if (!/^\d{6}$/.test(resetCode)) {
          throw new Error("Ingresá un código válido de seis dígitos.");
        }

        await sendResetRequest("/api/auth/verifyResetCode", {
          code: resetCode,
        });

        setResetStep("password");
        return;
      }

      if (newPassword.length < 8) {
        throw new Error("La contraseña debe tener al menos 8 caracteres.");
      }

      if (newPassword !== confirmPassword) {
        throw new Error("Las contraseñas no coinciden.");
      }

      await sendResetRequest("/api/auth/resetPassword", {
        code: resetCode,
        password: newPassword,
      });

      setIsResetOpen(false);
      setPopupMessage(
        "Tu contraseña se actualizó correctamente. Ya podés iniciar sesión.",
      );
    } catch (error) {
      setPopupMessage(
        error instanceof Error
          ? error.message
          : "No se pudo completar la recuperación de contraseña.",
      );
    } finally {
      setIsResetLoading(false);
    }
  }

  return {
    email,
    setEmail,
    loading,
    handleSubmit,

    popupMessage,
    setPopupMessage,

    isResetOpen,
    resetStep,
    resetEmail,
    setResetEmail,
    resetCode,
    setResetCode,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    isResetLoading,

    openResetModal,
    closeResetModal,
    handleResetSubmit,

    authLoading,
    user,
  };
}
