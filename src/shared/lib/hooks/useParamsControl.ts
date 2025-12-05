import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface UseParamsControlTypeBase<T> {
  paramsList: (keyof T)[];
}

interface UseParamsControlTypeWithoutPagination<T>
  extends UseParamsControlTypeBase<T> {
  withPagination: false;
  resetPagination?: never;
  limit?: never;
}

interface UseParamsControlTypeWithPagination<T>
  extends UseParamsControlTypeBase<T> {
  withPagination: true;
  limit?: number;
}

type UseParamsControlType<T> =
  | UseParamsControlTypeWithoutPagination<T>
  | UseParamsControlTypeWithPagination<T>;

export const useParamsControl = <T>({
  paramsList,
  withPagination,
  // limit,
}: UseParamsControlType<T>) => {
  const [searchParams] = useSearchParams();
  const search = searchParams.toString();
  const [params, setParams] = useState<null | T>(null);

  const fullParamsList: (keyof T)[] = withPagination
    ? ["limit" as keyof T, "page" as keyof T, ...paramsList]
    : paramsList;

  useEffect(() => {
    const newParams = {} as {
      [key in keyof T]?: string | number | boolean;
    };
    fullParamsList.forEach((param) => {
      if (param) {
        newParams[param] = searchParams.get(param as string)
          ? (searchParams.get(param as string) as string)
          : undefined;
      }
    });

    const newState = Object.entries(newParams).reduce(
      (newPrams, [param, value]) =>
        value !== undefined ? { ...newPrams, [param]: value } : newPrams,
      {},
    ) as T;
    setParams(newState);
    // eslint-disable-next-line
    }, [search]);

  return params as T;
};
