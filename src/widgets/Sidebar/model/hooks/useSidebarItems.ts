import { useAuthStore } from "@/entities/Login";
import { ChartColumnStacked, Tablets, Users } from "lucide-react";
import type { SidebarItemType } from "../types/sidebarType.ts";
import { allRouterPaths } from "@/app/router/allRouterPaths.ts";

export const useSidebarItems = () => {
  const user = useAuthStore((state) => state.user);

  const sidebarItems: SidebarItemType[] = [
    { name: "Пользователи", ico: Users, path: `/${allRouterPaths.users}` },
    { name: "Товары", ico: Tablets, path: `/${allRouterPaths.products}` },
    {
      name: "Категории",
      ico: ChartColumnStacked,
      path: `/${allRouterPaths.categories}`,
    },
  ];

  if (!user) return [];
  return sidebarItems;
};
