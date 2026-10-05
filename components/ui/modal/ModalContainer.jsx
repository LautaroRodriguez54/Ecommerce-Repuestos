import style from "./modal.module.css";
import XMark from "@/components/icon/XMark";
export const ModalContainer = ({
  title = "",
  onClose = () => {},
  children,
}) => {
  return (
    <div
      className={
        title ? style.ModalContainer : style.ModalContainerWithoutTitle
      }
      onClick={(event) => event.stopPropagation()}
    >
      <div className={style.title}>
        {title ? (
          <p>{title}</p>
        ) : (
          <button onClick={onClose}>
            <XMark />
          </button>
        )}
      </div>
      <div className={style.form}>{children}</div>
    </div>
  );
};
