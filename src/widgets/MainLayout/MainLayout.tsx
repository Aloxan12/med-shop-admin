import cls from "./MainLayout.module.scss";
import { Header } from "@/widgets/Header/Header.tsx";
import { Sidebar } from "@/widgets/Sidebar";
import { Outlet } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useAuthStore } from "@/entities/Login";
import { useUserDetail } from "@/entities/Users/api/useUser.ts";

export const MainLayout = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const { user, token, setUser } = useAuthStore();
  const { data } = useUserDetail({});

  const onSidebarToggle = useCallback(
    () => setIsOpenSidebar((prev) => !prev),
    [],
  );

  useEffect(() => {
    if (!user && !!token && data) {
      setUser(data);
    }
  }, [user, token, data, setUser]);

  return (
    <main>
      <Header onOpenMenu={onSidebarToggle} />
      <Sidebar isOpen={isOpenSidebar} onClose={onSidebarToggle} />
      <div className={cls.pageWrap}>
        <Outlet />
      </div>
    </main>
  );
};
