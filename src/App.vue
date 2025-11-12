<script setup lang="ts">
import { RouterView } from "vue-router";
import Layout from "@/views/Layout.vue";
</script>

<template>
  <v-app>
    <!-- 僅於登入頁時顯示登入畫面，不使用 Layout -->
    <template v-if="$route.name === 'Login'">
      <RouterView />
    </template>

    <!-- 後台管理介面，套用 Layout 通用頁面布局 -->
    <template v-else>
      <Layout />
    </template>
  </v-app>
</template>

<style scoped></style>
