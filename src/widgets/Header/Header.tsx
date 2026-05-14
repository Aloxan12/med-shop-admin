import cls from "./Header.module.scss";
import { Menu } from "lucide-react";
import { ThemeToggle } from "@/shared/ui/ThemeToggle";

interface HeaderProps {
  onOpenMenu: () => void;
}

export const Header = ({ onOpenMenu }: HeaderProps) => {
  return (
    <header className={cls.headerWrap}>
      <Menu className={cls.menu} onClick={onOpenMenu} />
      <span>Header</span>
      <div className={cls.actions}>
        <ThemeToggle />
      </div>
    </header>
  );
};
