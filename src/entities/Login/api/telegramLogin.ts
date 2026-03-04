import { api } from "@/shared/api";
import type { TelegramDto } from "../model/types";

export const telegramLogin = async (data: TelegramDto): Promise<void> => {
  const response = await api.post<void>("/bot/authorized", data);
  return response.data;
};
