import {
  type MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface IUseAppModal {
  isOpen?: boolean;
  delay: number;
  onClose?: () => void;
}

export const useAppModal = ({ isOpen, delay, onClose }: IUseAppModal) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const timerRef = useRef(null) as MutableRefObject<ReturnType<
    typeof setTimeout
  > | null>;

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    }
  }, [isOpen]);

  const closeHandler = useCallback(() => {
    if (onClose) {
      setIsClosing(true);
      timerRef.current = setTimeout(() => {
        onClose?.();
        setIsClosing(false);
      }, delay);
    }
  }, [onClose]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isOpen && e.key === "Escape") {
        closeHandler();
      }
    },
    [closeHandler, isOpen],
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", onKeyDown);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        window.removeEventListener("keydown", onKeyDown);
      }
    };
  }, [isOpen, onKeyDown]);

  return {
    isMounted,
    isClosing,
    closeHandler,
  };
};
