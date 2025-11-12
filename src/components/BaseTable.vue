<script setup lang="ts">
import { computed } from 'vue';
import { motion } from 'motion-v';
import Loading from '@/components/Loading.vue';

// 欄位配置介面
export type TableColumn<T = any> = {
  title: string; // 欄位標題
  dataField?: keyof T; // 資料欄位名稱
  width?: string; // 欄位寬度
  align?: 'left' | 'center' | 'right'; // 對齊方式
  maxTextLength?: number; // 最大文字長度（超過顯示省略號）
  component?: (row: T) => any; // 自定義渲染函數
};

// Props 定義
interface Props<T = any> {
  columns: TableColumn<T>[]; // 欄位配置
  rows: T[]; // 資料列（直接是物件陣列）
  title?: string; // 表格標題
  mdiIcon?: string; // 標題圖示
  isLoading?: boolean; // 載入狀態
  page?: number; // 當前頁碼（用於編號計算）
  pageSize?: number; // 每頁筆數
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
});

// 計算欄位寬度（自動均分）
const getColumnWidth = (column: TableColumn) => {
  if (column.width) {
    return column.width;
  }

  // 計算沒有設定寬度的欄位數量
  const columnsWithoutWidth = props.columns.filter(col => !col.width);
  const columnsWithWidth = props.columns.filter(col => col.width);

  // 計算已使用的寬度百分比
  const usedWidth = columnsWithWidth.reduce((sum, col) => {
    const width = col.width || '0%';
    const percentage = parseFloat(width);
    return sum + (width.includes('%') ? percentage : 0);
  }, 0);

  // 剩餘寬度均分
  const remainingWidth = 100 - usedWidth;
  const autoWidth = remainingWidth / columnsWithoutWidth.length;

  return `${autoWidth}%`;
};

// 計算欄位對齊方式
const getColumnAlign = (column: TableColumn, _index: number) => {
  if (column.align) {
    return `text-${column.align}`;
  }
  return 'text-left';
};

// 判斷是否無資料
const isNoData = computed(() => props.rows.length === 0);

// 截斷文字（超過最大長度顯示省略號）
const truncateText = (text: string, maxLength: number) => {
  if (text && text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};

// 取得儲存格值
const getCellValue = (row: any, column: TableColumn, rowIndex: number) => {
  // 特殊處理：編號欄位
  if (column.dataField === 'No.' && props.page && props.pageSize) {
    return rowIndex + 1 + (props.page - 1) * props.pageSize;
  }

  // 一般欄位
  if (column.dataField) {
    const value = row[column.dataField];

    // 如果有設定最大文字長度
    if (column.maxTextLength && typeof value === 'string') {
      return truncateText(value, column.maxTextLength);
    }

    return value ?? '-';
  }

  return '-';
};
</script>

<template>
  <motion.div
    :initial="{ opacity: 0, y: 20 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.3, ease: 'easeInOut' }"
  >
    <!-- 標題區域 -->
    <div v-if="title" class="flex justify-center items-center mb-2">
      <span v-if="mdiIcon" class="mr-2 text-[1.5rem] text-secondary">
        {{ mdiIcon }}
      </span>
      <h2 class="font-bold text-[1.5rem]">{{ title }}</h2>
    </div>
    
    <!-- 載入中狀態 -->
    <div
      v-if="isLoading"
      class="w-full bg-white py-8"
    >
      <Loading />
    </div>
    <!-- 表格容器 -->
    <table v-else class="w-full text-base table-fixed bg-white">
      <!-- 表頭 -->
      <thead>
        <tr>
          <th
            v-for="(column, index) in columns"
            :key="`header-${index}`"
            :style="{ width: getColumnWidth(column) }"
            :class="getColumnAlign(column, index)"
            class="font-bold text-lg py-4"
          >
            <b v-show="rows.length > 0">{{ column.title }}</b>
          </th>
        </tr>
      </thead>


      <!-- 無資料狀態 -->
      <tbody v-if="isNoData">
        <tr>
          <td
            :colspan="columns.length"
            class="py-12 text-center text-gray-500 font-bold text-lg"
          >
            查無資料!
          </td>
        </tr>
      </tbody>

      <!-- 資料列 -->
      <tbody v-else>
        <tr
          v-for="(row, rowIndex) in rows"
          :key="`row-${rowIndex}`"
          class="border-t border-gray-200 hover:bg-gray-50 last:border-b-0"
        >
          <td
            v-for="(column, colIndex) in columns"
            :key="`cell-${rowIndex}-${colIndex}`"
            :style="{ width: getColumnWidth(column) }"
            :class="getColumnAlign(column, colIndex)"
            class="py-4"
          >
            <!-- 自定義組件渲染 -->
            <template v-if="column.component">
              <component :is="column.component(row)" />
            </template>

            <!-- 一般文字渲染 -->
            <template v-else>
              <span
                v-if="column.maxTextLength"
                class="block overflow-hidden text-ellipsis whitespace-nowrap"
                :title="row[column.dataField as string]"
              >
                {{ getCellValue(row, column, rowIndex) }}
              </span>
              <span v-else>
                {{ getCellValue(row, column, rowIndex) }}
              </span>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </motion.div>
</template>

<style scoped></style>
