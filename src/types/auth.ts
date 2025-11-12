// 範例：登入請求 Type
export type LoginRequest = {
  account: string;
  password: string;
}
// 範例：登入回應 Type
export type LoginResponse = {
  token: string;
}