import React, { type ChangeEvent } from "react";
import cls from "./AppInput.module.scss";
import { classNames } from "@/shared/lib/classNames";
import { inputMaskFn } from "./helpers/inputMaskFn.ts";

export type InputMaskType = "float" | "integer" | "negativeInteger";

type HTMLInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "readOnly"
>;

interface AppInputProps extends HTMLInputProps {
  value?: string;
  label?: string;
  onChange?: (value: string) => void;
  mask?: InputMaskType;
  fullWidth?: boolean;
  error?: string;
}

export const AppInput = ({
  value,
  placeholder,
  label,
  fullWidth,
  onChange,
  type,
  mask,
  error,
  ...otherProps
}: AppInputProps) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (type === "date") {
      if (e.target.value.length > 10) {
        return;
      }
      onChange?.(e.target.value);
      return;
    }
    if (mask) {
      onChange?.(inputMaskFn(e.target.value, mask));
      return;
    }
    onChange?.(e.currentTarget.value);
  };
  const mods = {
    "full-width": !!fullWidth,
    [cls.error]: !!error,
  };
  return (
    <div className={classNames(cls.inputWrap, mods)}>
      {!!label && <label className={cls.label}>{label}</label>}
      <div className={cls.inputBlock}>
        <input
          value={value || ""}
          type={type}
          placeholder={placeholder}
          onChange={onChangeHandler}
          {...otherProps}
          className={cls.inputBase}
        />
      </div>
      {error && <div className={cls.errorBlock}>{error}</div>}
    </div>
  );
};
