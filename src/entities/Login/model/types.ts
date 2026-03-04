export interface TelegramDto {
  chatId: string;
  userId: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user?: {
    id: string;
    email: string;
  };
}

export interface User {
  id: string;
  email: string;
}
