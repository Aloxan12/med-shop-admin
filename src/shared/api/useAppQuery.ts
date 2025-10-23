import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";

// type QueryKey = readonly [string, ...unknown[]];

export function useAppQuery<TData, TError = unknown>(
  key: readonly unknown[], // <- вместо QueryKey
  queryFn: () => Promise<TData>,
  options?: UseQueryOptions<TData, TError, TData, readonly unknown[]>,
): UseQueryResult<TData, TError> {
  return useQuery<TData, TError, TData, readonly unknown[]>({
    queryKey: key,
    queryFn,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
    retry: 1,
    ...options,
  });
}
