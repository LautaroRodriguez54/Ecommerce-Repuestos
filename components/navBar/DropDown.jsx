import styles from "./navBar.module.css";
import Cart from "../icon/Cart.jsx";
import { motion, AnimatePresence } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "../../lib/auth.ts";
import { useAuth } from "../../components/auth/AuthContext";
import { useEffect } from "react";

export const DropDown = ({
  carrito = false,
  dropDownOpen,
  onClickDropDown,
}) => {
  const { refreshUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    onClickDropDown();
  }, [pathname]);

  useEffect(() => {
    if (!dropDownOpen || !carrito) return;

    const timer = setTimeout(async () => {
      onClickDropDown();
    }, 3000);

    return () => clearTimeout(timer);
  }, [dropDownOpen]);

  const handleNavigateAndClose = (path) => {
    router.push(path);
    onClickDropDown();
  };
  const handlelogOut = async () => {
    try {
      await logout();
      await refreshUser();
      onClickDropDown();
      router.push("/");
    } catch (error) {
      setPopupMessage(
        error instanceof Error
          ? `No se pudo cerrar sesión:\n${error.message}`
          : "No se pudo cerrar sesión",
      );
    }
  };
  return (
    <AnimatePresence>
      {dropDownOpen && (
        <motion.ul
          className={styles.dropDown}
          initial={{ opacity: 0, y: -1 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -1 }}
          transition={{ duration: 0.4 }}
          onHoverEnd={onClickDropDown}
        >
          {carrito && (
            <li
              className={styles.dropDownItem}
              onClick={() => handleNavigateAndClose("/carrito")}
            >
              <button className={styles.iconCart}>
                <Cart />
              </button>
              Carrito
            </li>
          )}
          <li onClick={() => handleNavigateAndClose("/panel")}>
            Panel de usuario
          </li>
          <li onClick={handlelogOut}>Cerrar sesión</li>
        </motion.ul>
      )}
    </AnimatePresence>
  );
};
