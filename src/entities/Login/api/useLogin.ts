import { useAppMutation } from "@/shared/api";
import { login } from "../api/login";
import type { AuthResponse, LoginDto } from "../model/types";
import { useAuthStore } from "../model/authStore.ts";
import type { UseMutationResult } from "@tanstack/react-query";

export const useLogin = (): UseMutationResult<
  AuthResponse,
  unknown,
  LoginDto,
  unknown
> => {
  const setToken = useAuthStore((state) => state.setToken);

  return useAppMutation<AuthResponse, LoginDto>((data) => login(data), {
    onSuccess: (res) => {
      setToken(res.accessToken, res.refreshToken, res.user);
      localStorage.setItem("accessToken", res.accessToken);
      console.log("✅ User logged in:"); // res.user.email);
    },
    onError: (err) => {
      console.error("❌ Login failed:", err);
    },
  });
};
