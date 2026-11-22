"use client";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { SideBarLayout } from "@/components/ui/sideBarLayout/SideBarLayout";
import { MagazineActions } from "@/components/pageData";
import styles from "@/components/ui/ui.module.css";

const MagazineViewer = dynamic(
  () =>
    import("../../components/magazine/MagazineViewer").then(
      (mod) => mod.MagazineViewer,
    ),
  {
    ssr: false,
    loading: () => <p>Cargando revista...</p>,
  },
);

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const magazine =
    MagazineActions.find((item) => item.id === searchParams.get("tab")) ??
    MagazineActions[0];

  const handleButtonClick = (id: string) => {
    if (!MagazineActions.some((item) => item.id === id)) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", id);
    router.push(`/revista?${params}`, { scroll: false });
  };

  return (
    <SideBarLayout
      buttons={MagazineActions}
      onButtonClick={handleButtonClick}
      selectedButton={magazine.id}
    >
      <div className={styles.contentSideBar}>
        <MagazineViewer key={magazine.id} file={magazine.file} />
      </div>
    </SideBarLayout>
  );
}
