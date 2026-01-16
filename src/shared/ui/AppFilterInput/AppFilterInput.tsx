import { AppInput } from "@/shared/ui/AppInput";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

type PropsType = {
  placeholder?: string;
  searchParam: string;
};

export const AppFilterInput = ({ placeholder, searchParam }: PropsType) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState("");

  useEffect(() => {
    if (value) {
      searchParams.set(searchParam, value);
    } else {
      searchParams.delete(searchParam);
    }
    setSearchParams(searchParams.toString());
  }, [value]);

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
