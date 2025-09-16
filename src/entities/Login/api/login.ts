import {api} from "@/shared/api";
import type {AuthResponse, LoginDto} from "../model/types";

export const login = async (data: LoginDto): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", data);
    return response.data;
};