import { api } from "@/shared/api";
import type { GetUserListRequest, GetUserListResponse } from "../model/types";

export const getUserList = async (
  data: GetUserListRequest,
): Promise<GetUserListResponse> => {
  const response = await api.get<GetUserListResponse>("/users", {
    params: data,
  });
  return response.data;
};
