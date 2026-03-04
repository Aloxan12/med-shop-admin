import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "@/entities/Login";
import { telegramLogin } from "../api/telegramLogin.ts";

export const useTelegramAuth = () => {
  const [searchParams] = useSearchParams();
  const chatId = searchParams.get("chat_id");
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (chatId && token) {
      void telegramLogin({ chatId });
    }
  }, [chatId, token]);
};
