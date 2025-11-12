import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

// 擴展 RouteMeta 型別
declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
  }
}

// 定義路由
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { requiresAuth: true }, // 需要驗證
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 全域前置守衛：檢查是否需要驗證
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()
  
  // 如果路由需要驗證且用戶未登入
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // 重定向到登入頁面
    next({ name: 'Login' })
  } else if (to.name === 'Login' && authStore.isAuthenticated) {
    // 如果已登入且訪問登入頁面，重定向到首頁
    next({ name: 'Home' })
  } else {
    // 允許導航
    next()
  }
})

export default router;