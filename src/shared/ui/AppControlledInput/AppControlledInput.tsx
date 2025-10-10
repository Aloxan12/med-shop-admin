import {
  type Control,
  Controller,
  type RegisterOptions,
} from "react-hook-form";
import { AppInput, type InputMaskType } from "../AppInput/AppInput.tsx";

interface ControlledAppInputProps {
  name: string;
  control: Control<any>;
  label?: string;
  type?: string;
  mask?: InputMaskType;
  fullWidth?: boolean;
  placeholder?: string;
  rules?: RegisterOptions<any>;
}

export const ControlledAppInput = ({
  name,
  control,
  label,
  type,
  mask,
  fullWidth,
  placeholder,
  rules,
}: ControlledAppInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <>
          <AppInput
            {...field}
            type={type}
            mask={mask}
            label={label}
            fullWidth={fullWidth}
            placeholder={placeholder}
            onChange={(val: string) => field.onChange(val)}
            error={fieldState?.error?.message || ""}
          />
        </>
      )}
    />
  );
};
