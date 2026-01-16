import { useEffect, useState } from "react";

export const useDebounce = <T>(value: T): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, 400); // всегда 400мс

    return () => clearTimeout(handler);
  }, [value]);

  return debouncedValue;
};
