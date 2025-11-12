<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[70vh] text-center">
    <h1 class="text-6xl font-bold text-indigo-500 mb-4">404</h1>
    <p class="text-xl text-gray-600 mb-8">你在期待什麼? 這裡沒東西</p>
    <el-button type="primary" size="large" @click="$router.push('/')">
      返回首頁
    </el-button>
  </div>
</template>

<style scoped></style>
