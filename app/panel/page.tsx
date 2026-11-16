"use client";
import { useClientGuard } from "@/components/permission/useUserGuard";
import { PermissionGate } from "@/components/permission/PermissionGate";
import { PanelFooter } from "@/components/panel/PanelFooter";
import { OrdersPanel } from "@/components/panel/orders/OrdersPanel";
import styles from "@/components/panel/panel.module.css";
import { ContentSection } from "@/components/ui/ContentSection";
export default function Page() {
  const { authorized, loading } = useClientGuard();

  return (
    <PermissionGate loading={loading} authorized={authorized}>
      <div className={styles.containerPanel}>
        <ContentSection title="PANEL DE USUARIO">
          <div className={styles.panelWrapper}>
            <div className={styles.orders}>
              <OrdersPanel />
            </div>
            <PanelFooter />
          </div>
        </ContentSection>
      </div>
    </PermissionGate>
  );
}
