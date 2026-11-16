"use client";

import Link from "next/link";
import { Auth } from "../../components/auth/Auth";
import styles from "../../components/auth/auth.module.css";
import { ComponentData } from "../../components/ui/form/ComponentData";
import { FormField } from "../../components/ui/form/FormField";
import { Button } from "../../components/ui/Button/Button";
import { PopUp } from "../../components/ui/modal/PopUp";
import { AdminModal } from "../../components/admin/AdminModal";
import { PermissionGate } from "@/components/permission/PermissionGate";
import { useLoginPage } from "@/components/auth/login/login.hooks";
import {
  resetTitle,
  resetButtonText,
} from "@/components/auth/login/login.constants";

export default function Page() {

  const {
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
  } = useLoginPage();

  return (
    <PermissionGate
      loading={authLoading}
      authorized={!!user}
      requireAuth={false}
      status={403}
      title="SESIÓN ACTIVA"
      message="Ya tenés una sesión iniciada. Cerrá sesión para ingresar con otra cuenta."
      redirectBack
    >
      <Auth title="INICIAR SESIÓN" subtitle="Ingresá tus datos">
        <form className={styles.form} onSubmit={handleSubmit}>
          <ComponentData dataArea={styles.data} areaName="E-mail">
            <FormField
              type="email"
              placeHolder=""
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </ComponentData>

          <ComponentData dataArea={styles.data} areaName="Contraseña">
            <FormField
              type="password"
              placeHolder=""
              name="password"
              required
            />
          </ComponentData>

          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              openResetModal();
            }}
          >
            ¿Olvidaste tu contraseña?
          </Link>

          <div className={styles.buttonZone}>
            <Button
              buttonText={loading ? "Ingresando..." : "Enviar"}
              variant="primary"
            />
          </div>
        </form>

        {isResetOpen && (
          <AdminModal
            title={resetTitle[resetStep]}
            onClose={closeResetModal}
            onSubmit={handleResetSubmit}
            submitText={
              isResetLoading ? "Procesando..." : resetButtonText[resetStep]
            }
          >
            {resetStep === "email" && (
              <ComponentData dataArea={styles.data} areaName="E-mail">
                <FormField
                  type="email"
                  name="resetEmail"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                />
              </ComponentData>
            )}

            {resetStep === "code" && (
              <ComponentData
                dataArea={styles.data}
                areaName="Código de recuperación"
              >
                <FormField
                  type="text"
                  name="resetCode"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  required
                />
              </ComponentData>
            )}

            {resetStep === "password" && (
              <>
                <ComponentData
                  dataArea={styles.data}
                  areaName="Nueva contraseña"
                >
                  <FormField
                    type="password"
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </ComponentData>

                <ComponentData
                  dataArea={styles.data}
                  areaName="Confirmar contraseña"
                >
                  <FormField
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </ComponentData>
              </>
            )}
          </AdminModal>
        )}

        {popupMessage && (
          <PopUp message={popupMessage} onClose={() => setPopupMessage(null)} />
        )}
      </Auth>
    </PermissionGate>
  );
}
