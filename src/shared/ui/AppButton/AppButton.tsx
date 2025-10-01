import React from "react";
import cls from "./AppButton.module.scss";
import {type LucideIcon} from "lucide-react";
import {classNames, type Mods} from "@/shared/lib/classNames";

type ButtonVariantType = "primary" | "secondary" | "danger" | "ghost"

interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string;
    onClick?: () => void;
    icoLeft?: LucideIcon
    icoRight?: LucideIcon
    variant?: ButtonVariantType
    fullWidth?: boolean
}

export const AppButton = ({
                              text,
                              onClick,
                              disabled,
                              icoLeft: IcoLeft,
                              icoRight: IcoRight,
                              variant = 'primary',
                              fullWidth,
                              ...otherProps
                          }: AppButtonProps) => {

    const onClickHandler = () => {
        if (!disabled) {
            onClick?.()
        }
    }

    const mods: Mods = {
        'full-width': fullWidth,
        [cls.disabled]: disabled
    }

    return (
        <button disabled={disabled} onClick={onClickHandler}
                className={classNames(cls.button, mods, [cls[variant]])} {...otherProps}>
            {IcoLeft && <IcoLeft size={16}/>}
            <span>{text}</span>
            {IcoRight && <IcoRight size={16}/>}
        </button>
    );
}