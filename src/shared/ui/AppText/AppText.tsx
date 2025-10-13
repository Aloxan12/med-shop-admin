import cls from "./AppText.module.scss";
import { classNames } from "@/shared/lib/classNames";
import type { ReactNode } from "react";

type TextColorType = "primary" | "secondary" | "muted";
type TextSizeType = "big" | "medium" | "small";
type TextWeightType = "bold" | "medium" | "normal";
type TextClip = "clip0" | "clip1" | "clip2" | "clip3" | "clip4";

interface AppTextProps {
  className?: string;
  color?: TextColorType;
  size?: TextSizeType;
  weight?: TextWeightType;
  clip?: TextClip;
  children?: ReactNode;
}

export const AppText = ({
  color = "primary",
  size = "medium",
  weight = "normal",
  clip = "clip0",
  children,
  className,
}: AppTextProps) => {
  const mods = {
    [cls.isClip]: !!clip,
    [cls[clip]]: !!clip,
  };

  return (
    <div
      className={classNames(cls.textWrap, mods, [
        cls[color],
        cls[size],
        cls[weight],
        className,
      ])}
    >
      {children}
    </div>
  );
};
