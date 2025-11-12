// Store 相關類型定義

// 用戶資訊介面
export type UserInfo = {
  id?: string | number;
  name?: string;
  email?: string;
  avatar?: string;
  role?: string;
  [key: string]: any;
};

// 認證 Store 狀態
export type AuthState = {
  token: string | null;
  userInfo: UserInfo | null;
};
