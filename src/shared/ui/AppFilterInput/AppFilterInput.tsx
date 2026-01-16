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
  const [value, setValue] = useState("");

  const debounceValue = useDebounce(value);

  useEffect(() => {
    if (debounceValue) {
      searchParams.set(searchParam, value);
    } else {
      searchParams.delete(searchParam);
    }
    setSearchParams(searchParams.toString());
  }, [debounceValue]);

  return (
    <>
      <AppInput
        placeholder={placeholder}
        type={"search"}
        value={value}
        onChange={setValue}
      />
    </>
  );
};
