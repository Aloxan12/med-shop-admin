import { useAuthStore } from "@/entities/Login";
import { Users } from "lucide-react";

export const useSidebarItems = () => {
  const user = useAuthStore((state) => state.user);

  const sidebarItems = [
    { name: "Пользователи", ico: Users, to: "/users" },
    { name: "Товары", ico: Users, to: "/products" },
    { name: "Категории", ico: Users, to: "/categories" },
  ];

  if (!user) return [];
  return sidebarItems;
};
