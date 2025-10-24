import axios from "axios";
import { toast } from "react-hot-toast";

export const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;

    if (status === 401) {
      toast.custom("Unauthorized — maybe redirect to login?");
      // Можно вызывать logout или redirect
    } else if (status === 403) {
      toast.error("В доступе отказано");
    } else if (status === 500) {
      toast.error("Ошибка сервера");
    } else {
      toast.error("Unhandled error:" + `${JSON.stringify(error.message)}`);
    }
  } else {
    toast.error("Неизвестная ошибка:" + JSON.stringify(error || "Ошибка"));
  }
};
