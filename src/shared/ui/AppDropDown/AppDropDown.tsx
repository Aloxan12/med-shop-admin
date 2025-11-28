import React, { useState, useRef, useEffect } from "react";
import s from "./AppDropDown.module.scss";
import { AppInput } from "@/shared/ui/AppInput";

interface AppDropdownProps<T, TKey extends keyof T> {
  options: T[];
  propsName?: TKey;
  propsValue?: TKey;
  onSelect: (option: T) => void;
  placeholder: string;
  value: T | null;
}

export const AppDropdown = <T, TKey extends keyof T>({
  options,
  onSelect,
  placeholder,
  propsName,
  propsValue,
  value,
}: AppDropdownProps<T, TKey>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLUListElement>(null);

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
  const valueRepresent = value
    ? propsName
      ? `${value[propsName]}`
      : `${value}`
    : "";

  return (
    <div className={s.dropdownContainer} onClick={toggleDropdown}>
      <AppInput placeholder={placeholder} value={valueRepresent} />
      {isOpen && (
        <ul className={s.dropdownList} ref={dropdownRef}>
          {options.map((option) => {
            const optionName = propsName ? `${option[propsName]}` : `${option}`;
            const optionValue = propsValue
              ? `${option[propsValue]}`
              : `${option}`;

            return (
              <li
                key={optionValue}
                className={s.dropdownListItem}
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
