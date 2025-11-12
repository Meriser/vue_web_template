<script setup lang="ts">
import { computed } from 'vue';

// 定義組件 props 的類型，並設置可選屬性
interface Props {
  width?: number;
  height?: number;
}

// 設定預設的 width 和 height，如果父組件沒有傳入則使用 24
const props = withDefaults(defineProps<Props>(), {
  width: 24,
  height: 24,
});

// 計算 rect 寬度：icon總寬度減去左右邊距(各4)
const rectWidth = computed(() => props.width - 8);
</script>

<template>
  <svg :width="width" :height="height" :viewBox="`0 0 ${width} ${height}`" fill="none">
    <rect x="4" y="7" :width="rectWidth" height="2" rx="1" fill="currentColor"/>
    <rect x="4" y="11" :width="rectWidth" height="2" rx="1" fill="currentColor"/>
    <rect x="4" y="15" :width="rectWidth" height="2" rx="1" fill="currentColor"/>
  </svg>
</template>
