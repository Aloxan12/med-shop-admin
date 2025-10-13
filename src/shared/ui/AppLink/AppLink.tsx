import { type ReactNode } from "react";
import cls from "./AppLink.module.scss";
import { Link } from "lucide-react";

interface AppLinkProps {
  children: ReactNode;
}

export const AppLink = ({ children }: AppLinkProps) => {
  return <Link className={cls.link}>{children}</Link>;
};
