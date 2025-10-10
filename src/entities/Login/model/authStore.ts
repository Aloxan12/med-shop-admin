import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { User } from "./types.ts";

interface AuthState {
  user: User | null;
  token: string | null;
  refresh: string | null;
  setToken: (token: string, refresh: string, user?: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refresh: null,
      setToken: (token, refresh, user) =>
        set({ user: user || null, token, refresh }),
      logout: () => set({ user: null, token: null, refresh: null }),
    }),
    {
      name: "auth-med-shop-storage", // ключ для localStorage
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
