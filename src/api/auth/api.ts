import { type AxiosResponse } from "axios";
import { AXIOS } from "@/stores/setupAxios";
import { AuthPath } from "./path";
import type { ApiResponse } from "@/types/api";
import type { LoginRequest, LoginResponse } from "@/types/auth";
import ApiHandleError from "@/utils/apiHandleError";


// 簡易 API 範例： 登入 POST /auth/login
export async function login(req: LoginRequest) {
  try {
    const res: AxiosResponse<ApiResponse<LoginResponse>> = await AXIOS.post(
      AuthPath.LOGIN,
      req
    );
    return res.data.data;
  } catch (error) {
    ApiHandleError(error, AuthPath.LOGIN);
  }
}
