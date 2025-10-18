import React, { type ChangeEvent, useState } from "react";
import cls from "./AppInput.module.scss";
import { classNames } from "@/shared/lib/classNames";
import { inputMaskFn } from "./helpers/inputMaskFn.ts";
import { Eye, EyeOff } from "lucide-react";

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
  const [showPassword, setShowPassword] = useState(false);
  const toggleShow = () => setShowPassword((prev) => !prev);
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
  const actualType = type === "password" && showPassword ? "text" : type;
  return (
    <div className={classNames(cls.inputWrap, mods)}>
      {!!label && <label className={cls.label}>{label}</label>}
      <div className={cls.inputBlock}>
        <input
          value={value || ""}
          type={actualType}
          placeholder={placeholder}
          onChange={onChangeHandler}
          {...otherProps}
          className={cls.inputBase}
        />
        {type === "password" && (
          <div className={cls.iconButton} onClick={toggleShow}>
            {showPassword ? <EyeOff /> : <Eye />}
          </div>
        )}
      </div>
      {error && <div className={cls.errorBlock}>{error}</div>}
    </div>
  );
};
