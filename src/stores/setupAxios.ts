import axios, { AxiosError } from "axios";
import { useAuthStore } from "./auth";
import swal from "sweetalert2";

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
    // 若回傳 401，則清除 token 並跳轉到登入頁
    if (error.response?.status === 401) {
      swal.fire({
        title: "未授權",
        text: "請重新登入",
        icon: "error",
      });
      useAuthStore().clearToken();
      return error;
    }

    // 若回傳網路錯誤，則顯示網路錯誤提示
    if (error.name === "AxiosError" && error.code === "ERR_NETWORK") {
      swal.fire({
        title: "網路錯誤",
        text: "請檢查網路連線",
        icon: "error",
      });
      return error;
    }

    // 錯誤提示
    swal.fire({
      title: "錯誤",
      text: error.message,
      icon: "error",
    });
    return Promise.reject(error);
  }
);

export { AXIOS };
