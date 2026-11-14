"use client";
import styles from "./navBar.module.css";
import Cart from "../icon/Cart.jsx";
import { motion, AnimatePresence } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "../../lib/auth";
import { useAuth } from "../../components/auth/AuthContext";
import { usePermissions } from "@/components/permission/useUserGuard";
import { useEffect } from "react";

export const DropDown = ({
  carrito = false,
  dropDownOpen,
  onClickDropDown,
}) => {
  const { refreshUser } = useAuth();
  const { isAdmin, loading } = usePermissions();

  const router = useRouter();
  const pathname = usePathname();

  const panelPath = isAdmin ? "/admin" : "/panel";

  useEffect(() => {
    onClickDropDown();
  }, [pathname]);

  useEffect(() => {
    if (!dropDownOpen || !carrito) return;

    const timer = setTimeout(() => {
      onClickDropDown();
    }, 3000);

    return () => clearTimeout(timer);
  }, [dropDownOpen, carrito, onClickDropDown]);

  const handleNavigateAndClose = (path) => {
    onClickDropDown();
    router.push(path);
  };

  const handleLogout = async () => {
    try {
      await logout();
      await refreshUser();
      onClickDropDown();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
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
              <Cart />
              Carrito
            </li>
          )}

          <li onClick={() => !loading && handleNavigateAndClose(panelPath)}>
            {isAdmin ? "Panel de administrador" : "Panel de usuario"}
          </li>

          <li onClick={handleLogout}>Cerrar sesión</li>
        </motion.ul>
      )}
    </AnimatePresence>
  );
};
