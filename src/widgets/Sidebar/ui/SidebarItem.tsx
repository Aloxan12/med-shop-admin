import cls from "./SidebarItem.module.scss";
import type { SidebarItemType } from "../model/types/sidebarType.ts";
import { AppFlex } from "@/shared/ui/AppFlex";
import { NavLink } from "react-router-dom";
import { classNames } from "@/shared/lib/classNames";

interface SidebarItemProps {
  item: SidebarItemType;
  onClose?: () => void;
}

export const SidebarItem = ({ item, onClose }: SidebarItemProps) => {
  const { ico: Ico, path, name } = item;
  return (
    <NavLink
      to={path || ""}
      className={({ isActive }) =>
        classNames(cls.itemWrap, { [cls.active]: isActive })
      }
      onClick={onClose}
    >
      <AppFlex gap="8">
        <Ico />
        <span>{name}</span>
      </AppFlex>
    </NavLink>
  );
};
