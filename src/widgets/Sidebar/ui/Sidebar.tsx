import cls from "./Sidebar.module.scss";
import { useSidebarItems } from "../model/hooks/useSidebarItems.ts";
import { classNames, type Mods } from "@/shared/lib/classNames";
import { AppFlex } from "@/shared/ui/AppFlex";
import { useMemo } from "react";

interface SidebarProps {
  isOpen?: boolean;
}

export const Sidebar = ({ isOpen }: SidebarProps) => {
  const items = useSidebarItems();

  const mods: Mods = {
    [cls.isOpen]: !!isOpen,
  };

  const itemsRender = useMemo(
    () => items.map((item) => <div key={item.name}>{item.name}</div>),
    [items],
  );

  return (
    <div className={classNames(cls.sidebarWrap, mods)}>
      <AppFlex direction="column" gap="20">
        {itemsRender}
      </AppFlex>
    </div>
  );
};
