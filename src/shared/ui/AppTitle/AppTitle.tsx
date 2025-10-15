import { type JSX, type ReactNode } from "react";
import cls from "./AppTitle.module.scss";
import { classNames } from "@/shared/lib/classNames";

interface AppTitleProps {
  className?: string;
  mode?: "h1" | "h2";
  children?: ReactNode;
}

export const AppTitle = ({
  mode = "h1",
  className,
  children,
}: AppTitleProps) => {
  const Tag = mode as keyof JSX.IntrinsicElements;
  return (
    <Tag className={classNames(cls.titleWrap, {}, [className, cls[mode]])}>
      {children}
    </Tag>
  );
};
