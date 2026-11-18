"use client";

import styles from "./navBar.module.css";
import Cart from "../icon/Cart.jsx";
import { motion, AnimatePresence } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { logout } from "../../lib/auth";
import { useAuth } from "../../components/auth/AuthContext";

export const DropDown = ({
  carrito = false,
  dropDownOpen,
  onClickDropDown,
}) => {
  const { user, loading, refreshUser } = useAuth();

  const router = useRouter();
  const pathname = usePathname();

  const isAdmin = user?.role === "ADMIN";
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
      const isProtectedPage =
        pathname === panelPath ||
        pathname.startsWith(`${panelPath}/`) ||
        (isAdmin &&
          (pathname === "/register" || pathname.startsWith("/register/")));

      if (isProtectedPage) {
        router.replace("/");
      } else {
        await refreshUser();
        router.refresh();
      }
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
              <div className={styles.iconCart}>
                <Cart />
              </div>
              Carrito
            </li>
          )}

          <li
            onClick={() =>
              !loading && user && handleNavigateAndClose(panelPath)
            }
          >
            {isAdmin ? "Panel de administrador" : "Panel de usuario"}
          </li>

          <li onClick={handleLogout}>Cerrar sesión</li>
        </motion.ul>
      )}
    </AnimatePresence>
  );
};
