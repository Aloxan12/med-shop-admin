import {useAppMutation} from "@/shared/api";
import {login} from "../api/login";
import type {AuthResponse, LoginDto} from "../model/types";

export const useLogin = () => {
    return useAppMutation<AuthResponse, LoginDto>(
        (data) => login(data),
        {
            onSuccess: (res) => {
                localStorage.setItem("accessToken", res.accessToken);
                console.log("✅ User logged in:") // res.user.email);
            },
            onError: (err) => {
                console.error("❌ Login failed:", err);
            },
        }
    );
};