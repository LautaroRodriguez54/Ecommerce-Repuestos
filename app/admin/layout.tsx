'use client'
import { useState } from "react";
import { SideBarLayout } from "../../components/ui/sideBarLayout/SideBarLayout.jsx";
import { adminActions } from "@/components/pageData.js";
import styles from "../../components/admin/admin.module.css";
import { UserContent } from "@/components/admin/UserContent";
import { OrderContent } from "@/components/admin/OrderContent";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedButton, setSelectedButton] = useState("users");

  return (
    <SideBarLayout
      page="admin"
      buttons={adminActions}
      onButtonClick={setSelectedButton}
      selectedButton={selectedButton}
    >
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>GESTIÓN DE USUARIOS</h1>

        <div className={styles.content}>
          {selectedButton === "users" && <UserContent />}
          {selectedButton === "orders" && <OrderContent />}
        </div>
      </div>
    </SideBarLayout>
  );
}