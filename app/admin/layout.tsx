
"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SideBarLayout } from "../../components/ui/sideBarLayout/SideBarLayout";
import { adminActions } from "@/components/pageData.js";
import styles from "../../components/ui/ui.module.css";
import { UserContent } from "@/components/admin/User/UserContent";
import { OrderContent } from "@/components/admin/Order/OrderContent";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tab = searchParams.get("tab");
  const selectedButton = tab === "users" ? "users" : "orders";

  const handleButtonClick = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", id);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <SideBarLayout
      page="admin"
      buttons={adminActions}
      onButtonClick={handleButtonClick}
      selectedButton={selectedButton}
    >
      <div className={styles.contentWrapperSideBar}>
        <h1 className={styles.title}>
          GESTIÓN DE {selectedButton === "users" ? "USUARIOS" : "PEDIDOS"}
        </h1>

        <div className={styles.contentSideBar}>
          {selectedButton === "users" && <UserContent />}
          {selectedButton === "orders" && <OrderContent />}
        </div>
      </div>
    </SideBarLayout>
  );
}
