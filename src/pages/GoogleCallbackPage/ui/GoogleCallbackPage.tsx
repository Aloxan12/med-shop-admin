import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/entities/Login";
import type { User } from "@/entities/Login/model/types.ts";

const GoogleCallbackPage = () => {
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");
    const user: User | null = params.get("user")
      ? JSON.parse(params.get("user")!)
      : null;
    if (accessToken && refreshToken && user) {
      setToken(accessToken, refreshToken, user);
      navigate("/");
    }
  }, [navigate, setToken]);

  return <div>Авторизация через Google...</div>;
};

export default GoogleCallbackPage;
