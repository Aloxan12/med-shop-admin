import React, { type DetailedHTMLProps, type HTMLAttributes } from "react";
import cls from "./AppFlex.module.scss";
import { classNames, type Mods } from "../../lib/classNames/classNames";

export type FlexJustify = "start" | "center" | "end" | "between";
type FlexAlign = "start" | "center" | "end" | "stretch";
type FlexDirection = "row" | "column";
export type FlexGap =
  | "4"
  | "8"
  | "10"
  | "12"
  | "16"
  | "20"
  | "22"
  | "24"
  | "26"
  | "32";

const justifyClasses: Record<FlexJustify, string> = {
  start: cls.justifyStart,
  center: cls.justifyCenter,
  end: cls.justifyEnd,
  between: cls.justifyBetween,
};

const alignClasses: Record<FlexAlign, string> = {
  start: cls.alignStart,
  center: cls.alignCenter,
  end: cls.alignEnd,
  stretch: cls.alignStretch,
};

const directionClasses: Record<FlexDirection, string> = {
  row: cls.directionRow,
  column: cls.directionColumn,
};

const gapClasses: Record<FlexGap, string> = {
  4: cls.gap4,
  8: cls.gap8,
  10: cls.gap10,
  12: cls.gap12,
  16: cls.gap16,
  20: cls.gap20,
  22: cls.gap22,
  24: cls.gap24,
  26: cls.gap26,
  32: cls.gap32,
};

type DivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export interface FlexProps extends DivProps {
  className?: string;
  children: React.ReactNode;
  justify?: FlexJustify;
  align?: FlexAlign;
  direction?: FlexDirection;
  gap?: FlexGap;
  fullWidth?: boolean;
  fullHeight?: boolean;
  wrap?: boolean;
}

export const AppFlex = (props: FlexProps) => {
  const {
    className,
    children,
    justify = "start",
    align = "center",
    direction = "row",
    gap,
    fullWidth,
    fullHeight,
    wrap,
    ...otherProps
  } = props;

  const classes = [
    className,
    justifyClasses[justify],
    alignClasses[align],
    directionClasses[direction],
    gap && gapClasses[gap],
  ];

  const mods: Mods = {
    "full-width": fullWidth,
    "full-height": fullHeight,
    [cls.wrap]: wrap,
  };

  return (
    <div className={classNames(cls.flex, mods, classes)} {...otherProps}>
      {children}
    </div>
  );
};
