import { createPinia } from 'pinia'
import type { Pinia } from 'pinia'

/**
 * 創建並配置 Pinia 實例
 * 可在此處添加全局插件、持久化等配置
 */
export function setupStore(): Pinia {
  const pinia = createPinia()

  // TODO: 可在此處添加 Pinia 插件
  // 例如：pinia.use(piniaPluginPersistedstate)
  
  return pinia
}

// 匯出所有 store modules
export * from './auth'
