import axios, { AxiosError } from "axios";
import { useAuthStore } from "./auth";

// API 基礎 URL
const VITE_API_URL = import.meta.env.VITE_API_URL;

// axios 實例
const AXIOS = axios.create({
  baseURL: VITE_API_URL,
});

// axios 請求攔截器
AXIOS.interceptors.request.use(
  // 請求攔截器：自動在每個請求的 headers 加上 Bearer token（如果已登入）
  (config) => {
    // 取得 Pinia 的認證 store
    const authStore = useAuthStore();
    // 獲取當前 token
    const token = authStore.getToken();

    // 如果有 token，則在 headers 加上 Authorization 欄位
    if (config.headers && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  // 請求錯誤處理
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export { AXIOS };