import { Header } from "@/widgets/Header/Header.tsx";
import { Sidebar } from "@/widgets/Sidebar";
import { Outlet } from "react-router-dom";
import { useCallback, useState } from "react";

export const MainLayout = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  const onSidebarToggle = useCallback(
    () => setIsOpenSidebar((prev) => !prev),
    [],
  );

  return (
    <main>
      <Header onOpenMenu={onSidebarToggle} />
      <Sidebar isOpen={isOpenSidebar} />
      <Outlet />
    </main>
  );
};
