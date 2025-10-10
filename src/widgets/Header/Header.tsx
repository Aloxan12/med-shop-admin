import cls from "./Header.module.scss";
import { Menu } from "lucide-react";

interface HeaderProps {
  onOpenMenu: () => void;
}

export const Header = ({ onOpenMenu }: HeaderProps) => {
  return (
    <header className={cls.headerWrap}>
      <Menu className={cls.menu} onClick={onOpenMenu} />
      <span>Header</span>
    </header>
  );
};
