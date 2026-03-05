import React, { type ChangeEvent, useState } from "react";
import cls from "./AppInput.module.scss";
import { classNames } from "@/shared/lib/classNames";
import { inputMaskFn } from "./helpers/inputMaskFn.ts";
import { Eye, EyeOff, Search } from "lucide-react";

export type InputMaskType = "float" | "integer" | "negativeInteger";

type HTMLInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "readOnly"
>;

interface AppInputProps extends HTMLInputProps {
  value?: string | File | null;
  label?: string;
  // допускаем любой тип значения, чтобы и строки, и File были валидны
  onChange?: (value: any) => void;
  mask?: InputMaskType;
  fullWidth?: boolean;
  error?: string;
  readOnly?: boolean;
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
  readOnly,
  ...otherProps
}: AppInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShow = () => setShowPassword((prev) => !prev);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (type === "file") {
      const file = e.target.files?.[0] ?? null;
      onChange?.(file);
      return;
    }
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
          {...otherProps}
          readOnly={readOnly}
          type={actualType}
          placeholder={placeholder}
          value={
            type === "file" ? undefined : typeof value === "string" ? value : ""
          }
          onFocus={readOnly ? (e) => e.target.blur() : otherProps.onFocus}
          onChange={onChangeHandler}
          className={cls.inputBase}
        />
        {type === "password" && (
          <div className={cls.iconButton} onClick={toggleShow}>
            {showPassword ? <EyeOff size={"15"} /> : <Eye size={"15"} />}
          </div>
        )}
        {type === "search" && (
          <div className={cls.iconButton}>{<Search size={"15"} />}</div>
        )}
      </div>
      {error && <div className={cls.errorBlock}>{error}</div>}
    </div>
  );
};
