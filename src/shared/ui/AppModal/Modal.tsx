import type { ReactNode } from "react";
import cls from "./AppModal.module.scss";
import { classNames, type Mods } from "../../lib/classNames/classNames";

import { useAppModal } from "../../lib/hooks/useAppModal";
import { AppLoader } from "../AppLoader";
import { AppText } from "../AppText";
import { AppPortal } from "@/shared/ui/Portal";

const ANIMATION_DELAY = 300;

type ModalWidth =
  | "small"
  | "default"
  | "medium"
  | "large"
  | "extraLarge"
  | "full";

interface AppModalProps {
  className?: string;
  classNameContent?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
  width?: ModalWidth;
  lazy?: boolean;
  delay?: number;
  isLoading?: boolean;
}

export const AppModal = ({
  children,
  className,
  classNameContent,
  isOpen,
  onClose,
  title,
  width = "default",
  lazy,
  delay = ANIMATION_DELAY,
  isLoading,
}: AppModalProps) => {
  const { isMounted, closeHandler, isClosing } = useAppModal({
    isOpen,
    delay,
    onClose,
  });

  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
    "app-modal": isOpen,
  };

  if (lazy && !isMounted && !isOpen) {
    return null;
  }

  return (
    <AppPortal>
      <div className={classNames(cls.modalWrapper, mods, [className])}>
        <div className={cls.modalBg} onClick={closeHandler}></div>
        <div
          className={classNames(cls.modalContent, {}, [
            classNameContent,
            cls[width],
          ])}
        >
          {isLoading && <AppLoader loaderType="block" />}
          {title && (
            <div className={cls.titleWrap}>
              <AppText size={"big"} weight="bold">
                {title}
              </AppText>
              <span onClick={closeHandler} className={cls.icoClose}>
                Х
              </span>
            </div>
          )}
          <div className={cls.modalContentChildren}>{children}</div>
        </div>
      </div>
    </AppPortal>
  );
};
