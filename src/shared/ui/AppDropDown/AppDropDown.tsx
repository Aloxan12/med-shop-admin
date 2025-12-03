import React, { useEffect, useRef, useState } from "react";
import s from "./AppDropDown.module.scss";
import { AppInput } from "@/shared/ui/AppInput";
import { classNames, type Mods } from "@/shared/lib/classNames";

interface AppDropdownProps<T, TKey extends keyof T> {
  options: T[];
  propsName?: TKey;
  propsValue?: TKey;
  onSelect: (option: T) => void;
  placeholder: string;
  value: T | null;
  fullWidth?: boolean;
  error?: string;
}

export const AppDropdown = <T, TKey extends keyof T>({
  options,
  onSelect,
  placeholder,
  propsName,
  propsValue,
  value,
  fullWidth,
  error,
}: AppDropdownProps<T, TKey>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option: T, e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(option);
    setIsOpen(false);
  };

  const mods: Mods = {
    [s.fullWidth]: !!fullWidth,
  };

  const valueRepresent = value
    ? propsName
      ? `${value[propsName]}`
      : `${value}`
    : "";

  return (
    <div
      className={classNames(s.dropdownContainer, mods)}
      onClick={toggleDropdown}
      ref={dropdownRef}
    >
      <AppInput
        placeholder={placeholder}
        value={valueRepresent}
        readOnly
        fullWidth={fullWidth}
        error={error}
      />
      {isOpen && (
        <ul className={s.dropdownList}>
          {options.map((option) => {
            const optionName = propsName ? `${option[propsName]}` : `${option}`;
            const optionValue = propsValue
              ? `${option[propsValue]}`
              : `${option}`;

            const currentValue =
              propsValue && value ? `${value[propsValue]}` : `${value || ""}`;

            return (
              <li
                key={optionValue}
                className={classNames(s.dropdownListItem, {
                  [s.active]: optionValue === currentValue,
                })}
                onClick={(e) => handleSelect(option, e)}
              >
                {optionName}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
