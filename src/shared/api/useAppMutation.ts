import type {
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

export function useAppMutation<TData, TVariables, TError = unknown>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<
    UseMutationOptions<TData, TError, TVariables, unknown>,
    "mutationFn"
  >,
): UseMutationResult<TData, TError, TVariables, unknown> {
  return useMutation<TData, TError, TVariables>({
    mutationFn,
    retry: 0, // дефолт: не ретраить мутации
    ...options,
  });
}
