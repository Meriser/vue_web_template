<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  Menu as IconMenu,
  HomeFilled,
  User,
  Setting,
  Back,
} from "@element-plus/icons-vue";
import SvgMenu from "@/components/svg/SvgMenu.vue";

const router = useRouter();
const isCollapse = ref(false);

// Menu 配置，導航至對應頁面
const menuItems = ref([
  {
    title: "首頁",
    icon: HomeFilled,
    to: "/",
  },
  {
    title: "用戶管理",
    icon: User,
    to: "/users",
  },
  {
    title: "設置",
    icon: Setting,
    to: "/settings",
  },
]);

// 切換側邊欄收合狀態
const handleToggleCollapse = () => {
  isCollapse.value = !isCollapse.value;
};

// 返回上一頁
const handleGoBack = () => {
  router.go(-1);
};

// 處理菜單選擇
const handleMenuSelect = (to: string) => {
  router.push(to);
};
</script>

<template>
  <div class="h-screen flex">
    <!-- 左側導航選單 -->
    <el-aside
      :width="isCollapse ? '64px' : '220px'"
      class="bg-gray-800 transition-all duration-300"
    >
      <!-- Logo 區域和收合按鈕 -->
      <div class="h-16 flex items-center justify-between pl-[22px] bg-gray-900">
        <div class="flex items-center text-white">
          <el-icon class="mr-2" :size="20">
            <IconMenu />
          </el-icon>
          <span
            v-if="!isCollapse"
            class="text-lg font-semibold whitespace-nowrap"
            >後台系統</span
          >
        </div>
      </div>

      <!-- 選單列表 -->
      <el-menu
        :default-active="router.currentRoute.value.path"
        :collapse="isCollapse"
        :collapse-transition="false"
        background-color="#1f2937"
        text-color="#ffffff"
        active-text-color="#fff"
        @select="handleMenuSelect"
        class="border-none"
      >
        <el-menu-item v-for="item in menuItems" :key="item.to" :index="item.to">
          <el-icon><component :is="item.icon" /></el-icon>
          <template #title class="whitespace-nowrap">
            {{ item.title }}
          </template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 右側內容區域 -->
    <el-container class="flex-1">
      <!-- 頂部 App Bar -->
      <el-header
        class="min-h-[64px] bg-primary text-white flex items-center justify-between px-4 shadow-md"
      >
        <!-- 左側收合按鈕 -->
        <div class="flex items-center text-lg font-semibold">
          <el-button
            class="w-[32px] bg-transparent hover:bg-transparent"
            @click="handleToggleCollapse"
            :title="isCollapse ? '展開選單' : '收合選單'"
          >
            <el-icon :size="24" class="text-white">
              <SvgMenu :width="24" :height="24" />
            </el-icon>
          </el-button>
        </div>

        <!-- 右側操作按鈕 -->
        <div class="flex items-center gap-2">
          <el-button
            circle
            text
            @click="handleGoBack"
            title="返回上一頁"
            class="group transition-all duration-200"
          >
            <el-icon
              class="text-white group-hover:text-primary transition-all duration-200"
              :size="24"
            >
              <Back />
            </el-icon>
          </el-button>
        </div>
      </el-header>

      <!-- 主要內容區域 -->
      <el-main class="bg-gray-100 overflow-auto">
        <RouterView />
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
:deep(.el-menu-item.is-active) {
  background-color: var(--color-primary);
}
</style>
