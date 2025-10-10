export const emailRule = {
  required: "Email обязателен",
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Неверный формат",
  },
};
export const passwordRule = {
  required: "Пароль обязателен",
  minLength: { value: 5, message: "Минимум 5 символов" },
};
