import React, {type ChangeEvent} from "react";
import cls from './AppInput.module.scss'
import {classNames} from "@/shared/lib/classNames";
import {inputMaskFn} from "./helpers/inputMaskFn.ts";

export type InputMaskType = "float" | "integer" | "negativeInteger"

type HTMLInputProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "readOnly"
>;

interface AppInputProps extends HTMLInputProps {
    value?: string;
    onChange?: (value: string) => void;
    mask?: InputMaskType;
}

export const AppInput = ({value, onChange, type, mask, ...otherProps}: AppInputProps) => {

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
    }

    return (
        <div className={classNames(cls.inputWrap)}>
            <div className={cls.inputBlock}>
                <input value={value || ''} type={type} onChange={onChangeHandler} {...otherProps} />
            </div>
        </div>
    );
}