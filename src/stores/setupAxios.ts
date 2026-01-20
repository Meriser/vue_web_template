import axios, { AxiosError } from "axios";
import { useAuthStore } from "./auth";
import swal from "sweetalert2";
import router from "@/router";

// API 基礎 URL
const VITE_API_URL = import.meta.env.VITE_API_URL;

// axios 實例
const AXIOS = axios.create({
  baseURL: VITE_API_URL,
});

// ========== 請求攔截器 ==========
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
  // 請求錯誤處理：只處理請求發送前的錯誤（配置錯誤、請求被取消等）
  (error: AxiosError) => {
    // 請求發送前的錯誤，通常沒有 response
    return Promise.reject(error);
  }
);

// ========== 回應攔截器 ==========
AXIOS.interceptors.response.use(
  // 回應成功處理
  (response) => {
    return response;
  },
  // 回應錯誤處理：處理所有伺服器回應的錯誤
  async (error: AxiosError) => {
    const authStore = useAuthStore();

    // 在 401 處理中
    if (error.response?.status === 401) {
      swal.fire({
        title: "未授權",
        text: "請重新登入",
        icon: "error",
      });
      authStore.clearToken();

      // 避免在登入頁面時重複跳轉
      if (router.currentRoute.value.path !== "/login") {
        router.push("/login");
      }

      return Promise.reject(error);
    }

    // 處理網路錯誤
    if (error.name === "AxiosError" && error.code === "ERR_NETWORK") {
      swal.fire({
        title: "網路錯誤",
        text: "請檢查網路連線",
        icon: "error",
      });
      return Promise.reject(error);
    }

    // 處理其他錯誤
    if (error.response) {
      // 伺服器有回應，但 status code 不是 200-299
      const status = error.response.status;
      const message = (error.response.data as any)?.message || error.message;

      swal.fire({
        title: "錯誤",
        text: `[${status}] ${message}`,
        icon: "error",
      });
    } else {
      // 請求已發送，但沒有收到回應
      swal.fire({
        title: "錯誤",
        text: error.message || "發生未知錯誤",
        icon: "error",
      });
    }

    return Promise.reject(error);
  }
);

export { AXIOS };
