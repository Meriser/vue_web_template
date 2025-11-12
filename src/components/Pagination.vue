<script setup lang="ts">
import { computed } from 'vue';

// Props
interface Props {
  total: number; // 總筆數
  pageSize?: number; // 每頁顯示的筆數
}
const props = withDefaults(defineProps<Props>(), {
  pageSize: 10,
});

// defineModel 自動處理雙向綁定，無需額外定義 page prop
const currentPage = defineModel<number>('page', {
  default: 1,
  required: true,
});

// 計算總頁數，確保至少為 1
const totalPages = computed(() => {
  const pages = Math.ceil(props.total / props.pageSize);
  return Math.max(1, pages); // 至少顯示 1 頁
});
</script>

<template>
  <div class="w-full flex justify-center py-2 bg-white">
    <el-pagination
      v-model:current-page="currentPage"
      :page-size="props.pageSize"
      :total="props.total"
      layout="prev, pager, next"
      background
      class="el-pagination--primary"
    />
  </div>
</template>

<style scoped></style>
