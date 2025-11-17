<script setup lang="ts">
// 欄位配置介面
export type TableColumn<T = any> = {
  title: string; // 欄位標題
  dataField?: keyof T; // 資料欄位名稱
  width?: string | number; // 欄位寬度（可以是 '100px' 或 100）
  minWidth?: string | number; // 最小寬度
  align?: "left" | "center" | "right"; // 對齊方式
  fixed?: boolean | "left" | "right"; // 固定列
  sortable?: boolean; // 是否可排序
  maxTextLength?: number; // 最大文字長度（超過顯示省略號）
  component?: (row: T) => any; // 自定義渲染函數
};

// Props 定義
interface Props<T = any> {
  columns: TableColumn<T>[]; // 欄位配置
  rows: T[]; // 資料列
  isLoading?: boolean; // 載入狀態
  page?: number; // 當前頁碼（用於編號計算）
  pageSize?: number; // 每頁筆數
  height?: string | number; // 表格高度
  maxHeight?: string | number; // 表格最大高度
  stripe?: boolean; // 斑馬紋
  border?: boolean; // 是否顯示邊框
  highlightCurrentRow?: boolean; // 是否高亮當前行
  emptyText?: string; // 空資料文字
}

// 設定預設值
const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
  stripe: false,
  border: false,
  highlightCurrentRow: true,
  emptyText: "查無資料!",
});

// 截斷文字（超過最大長度顯示省略號）
const truncateText = (text: string, maxLength: number) => {
  if (text && text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

// 取得儲存格值
const getCellValue = (row: any, column: TableColumn, rowIndex: number) => {
  // 特殊處理：編號欄位
  if (column.dataField === "No." && props.page && props.pageSize) {
    return rowIndex + 1 + (props.page - 1) * props.pageSize;
  }

  // 一般欄位
  if (column.dataField) {
    const value = row[column.dataField];

    // 如果有設定最大文字長度
    if (column.maxTextLength && typeof value === "string") {
      return truncateText(value, column.maxTextLength);
    }

    return value ?? "-";
  }

  return "-";
};

// 處理排序
const handleSortChange = (sortData: any) => {
  console.log("Sort changed:", sortData);
  // 可以 emit 事件讓父組件處理排序
};
</script>

<template>
  <!-- Element Plus Table -->
  <el-table
    :data="rows"
    :height="height"
    :max-height="maxHeight"
    :stripe="stripe"
    :border="border"
    :highlight-current-row="highlightCurrentRow"
    :empty-text="emptyText"
    v-loading="isLoading"
    @sort-change="handleSortChange"
  >
    <!-- 動態生成欄位 -->
    <el-table-column
      v-for="(column, index) in columns"
      :key="`column-${index}`"
      :prop="column.dataField as string"
      :label="column.title"
      :width="column.width"
      :min-width="column.minWidth"
      :align="column.align || 'left'"
      :fixed="column.fixed"
      :sortable="column.sortable"
      :show-overflow-tooltip="!!column.maxTextLength"
    >
      <!-- 自定義內容 -->
      <template #default="{ row, $index }">
        <!-- 如果有自定義組件 -->
        <component v-if="column.component" :is="column.component(row)" />

        <!-- 否則顯示一般文字 -->
        <span v-else>
          {{ getCellValue(row, column, $index) }}
        </span>
      </template>
    </el-table-column>
  </el-table>
</template>
