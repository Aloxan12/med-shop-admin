import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";

type QueryKey = readonly [string, ...unknown[]];

export function useAppQuery<TData, TError = unknown>(
  key: QueryKey,
  queryFn: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
): UseQueryResult<TData, TError> {
  return useQuery<TData, TError>({
    queryKey: key,
    queryFn,
    staleTime: 1000 * 60, // дефолт: 1 минута
    refetchOnWindowFocus: false,
    retry: 1,
    ...options,
  });
}
