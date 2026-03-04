import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "@/entities/Login";
import { telegramLogin } from "../api/telegramLogin.ts";

export const useTelegramAuth = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const chatId = searchParams.get("chat_id");
  const { token, user } = useAuthStore((state) => state);

  useEffect(() => {
    if (chatId && token && user) {
      telegramLogin({ chatId, userId: user.id }).finally(() => {
        searchParams.delete("chat_id");
        setSearchParams(searchParams.toString());
      });
    }
    // eslint-disable-next-line
    }, [chatId, token, user]);
};
