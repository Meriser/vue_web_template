<script setup lang="ts">
// 定義 Loading Options 型別
interface LoadingProps {
  text?: string;
  className?: string;
}

// Props 預設值
const props = withDefaults(defineProps<LoadingProps>(), {
  text: "Loading...",
  className: "text-sm text-gray-500",
});
</script>

<template>
  <div class="flex flex-col justify-center items-center gap-1">
    <el-loading-spinner class="text-primary" />
    <p :class="props.className">{{ props.text }}</p>
  </div>
</template>

<style scoped></style>
