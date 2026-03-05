import { AppInput } from "@/shared/ui/AppInput";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "@/shared/lib/hooks/useDebounce.ts";

type PropsType = {
  placeholder?: string;
  searchParam: string;
};

export const AppFilterInput = ({ placeholder, searchParam }: PropsType) => {
  const [searchParams, setSearchParams] = useSearchParams();
  // Инициализируем значение из URL, если оно там есть
  const [value, setValue] = useState(searchParams.get(searchParam) || "");

  const debounceValue = useDebounce(value);

  useEffect(() => {
    if (debounceValue) {
      searchParams.set(searchParam, value);
    } else {
      searchParams.delete(searchParam);
    }
    setSearchParams(searchParams.toString());
    // eslint-disable-next-line
    }, [debounceValue]);

  useEffect(() => {
    const paramValue = searchParams.get(searchParam) || "";
    // Синхронизируем локальное состояние, если параметр был очищен/изменён извне
    if (paramValue !== value) {
      setValue(paramValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, searchParam]);

  return (
    <AppInput
      placeholder={placeholder}
      type={"search"}
      value={value}
      onChange={setValue}
    />
  );
};
