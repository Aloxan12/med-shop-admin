import cls from "./Sidebar.module.scss";
import { useSidebarItems } from "../model/hooks/useSidebarItems.ts";
import { classNames, type Mods } from "@/shared/lib/classNames";
import { AppFlex } from "@/shared/ui/AppFlex";
import { type ReactNode, useMemo } from "react";
import { SidebarItem } from "@/widgets/Sidebar/ui/SidebarItem.tsx";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const items = useSidebarItems();

  const mods: Mods = {
    [cls.isOpen]: !!isOpen,
  };

  const itemsRender = useMemo(
    () =>
      items.map((item) => (
        <SidebarItem key={item.name} onClose={onClose} item={item} />
      )),
    [items, onClose],
  );

  return (
    <div className={classNames(cls.sidebarWrap, mods)}>
      <AppFlex direction="column" align="start" gap="20">
        {itemsRender as ReactNode}
      </AppFlex>
    </div>
  );
};
