import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { UserInfo } from '@/types/store'

/**
 * 認證相關的 Store
 * 管理用戶登入狀態、Token 等
 */
export const useAuthStore = defineStore('auth', () => {
  // ========== State ==========
  const token = ref<string | null>(localStorage.getItem('token'))
  const userInfo = ref<UserInfo | null>(null)

  // ========== Getters ==========
  /**
   * 檢查是否已登入
   */
  const isAuthenticated = computed(() => !!token.value)

  /**
   * 獲取用戶名稱
   */
  const userName = computed(() => userInfo.value?.name || '訪客')

  // ========== Actions ==========
  /**
   * 設置 token
   * @param newToken - 新的認證 token
   */
  function setToken(newToken: string) {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  /**
   * 設置用戶資訊
   * @param info - 用戶資訊對象
   */
  function setUserInfo(info: UserInfo) {
    userInfo.value = info
    localStorage.setItem('userInfo', JSON.stringify(info))
  }

  /**
   * 清除 token 和用戶資訊（登出）
   */
  function clearToken() {
    token.value = null
    userInfo.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
  }

  /**
   * 獲取 token
   * @returns 當前的認證 token
   */
  function getToken(): string | null {
    return token.value
  }

  /**
   * 初始化用戶資訊（從 localStorage 恢復）
   */
  function initUserInfo() {
    const storedUserInfo = localStorage.getItem('userInfo')
    if (storedUserInfo) {
      try {
        userInfo.value = JSON.parse(storedUserInfo)
      } catch (error) {
        console.error('解析用戶資訊失敗:', error)
        localStorage.removeItem('userInfo')
      }
    }
  }

  // 初始化時恢復用戶資訊
  initUserInfo()

  return {
    // State 狀態
    token,
    userInfo,
    // Getters 計算屬性
    isAuthenticated,
    userName,
    // Actions 操作
    setToken,
    setUserInfo,
    clearToken,
    getToken,
    initUserInfo,
  }
})

