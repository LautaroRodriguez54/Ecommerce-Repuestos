"use client";
import { AuthForm } from "../auth/AuthForm";
import { ModalContainer } from "../ui/modal/ModalContainer";
import { Button } from "../ui/Button/Button";
import stylesAuth from "../auth/auth.module.css";

interface Props {
  title: string;
  onClose: () => void;
  onSubmit?: React.SubmitEventHandler<HTMLFormElement>;
  submitText?: string;
  children: React.ReactNode;
}
export const AdminModal = ({
  title,
  onClose,
  onSubmit,
  submitText = "Actualizar",
  children,
}: Props) => {
  return (
    <ModalContainer onClose={onClose}>
      <AuthForm title={title}>
        {onSubmit ? (
          <form className={stylesAuth.form} onSubmit={onSubmit}>
            {children}

            <div className={stylesAuth.buttonZone}>
              <Button buttonText={submitText} variant="primary" />
            </div>
          </form>
        ) : (
          <div className={stylesAuth.form}>{children}</div>
        )}
      </AuthForm>
    </ModalContainer>
  );
};
