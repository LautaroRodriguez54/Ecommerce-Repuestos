import styles from "./form.module.css";
import { ModalContainer } from "../modal/ModalContainer";

export const Form = ({title, children}) => {
  return (
    <ModalContainer title={title}>
      <div className={styles.formContainerWrap}>
        {children}
        
      </div>
    </ModalContainer>
  );
};
