import Link from "next/link";
import styles from "../ui.module.css";

export const Button = ({
  buttonText,
  linkHref = "",
  isMobile = false,
  isButton = true,
  variant = "secundary",
  rounded = false,
  squared = false,
  Icon = null,
  isSelected = false,
  type,
  onClick = () => {},
}) => {
  const buttonVariant = isSelected
    ? "selected"
    : type
      ? type === "admin"
        ? "secundary"
        : "outline"
      : variant;

  const shapeClass = rounded
    ? styles.roundedBtn
    : squared
      ? styles.squaredBtn
      : "";

  const baseClass = isMobile
    ? styles.clientButton
    : styles[buttonVariant];

  const className = `${baseClass} ${shapeClass}`;

  const content = (
    <>
      {Icon && (
        <span className={styles.iconNameButton}>
          <Icon />
        </span>
      )}
      {buttonText}
    </>
  );

  return isButton ? (
    <button className={className} onClick={onClick}>
      {content}
    </button>
  ) : (
    <Link href={linkHref} className={className}>
      {content}
    </Link>
  );
};