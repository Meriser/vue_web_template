<script setup lang="ts" generic="T extends string | number">
import { ElSelect, ElOption } from "element-plus";
import type { OptionType } from "@/types/option";
import { computed } from "vue";

// 定義 props
interface Props {
  modelValue: T | null;
  options: OptionType<T>[];
  selectType: "all" | "one"; // all: 全部選項，one: 單一選項
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  filterable?: boolean;
  size?: "large" | "default" | "small";
  selectClass?: string;
}
// 設置預設值
const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  selectType: "one",
  clearable: false,
  filterable: false,
  size: "large",
  selectClass: "w-[120px]",
});

// 計算內部顯示的值：將 null/undefined 轉換為 -1 以顯示 "全部"
const internalValue = computed(() => {
  // 如果是 "all" 模式且值為 null/undefined，則顯示 -1（全部）
  if (props.selectType === "all" && (props.modelValue === null || props.modelValue === undefined)) {
    return -1 as T;
  }
  return props.modelValue;
});


// 計算下拉選項內容
const options = computed(() => {
  // 這裡 ALL 對應 selectType: "all"，且全部 value 為 -1，型別需要注意
  if (props.selectType === "all") {
    // "全部"選項需符合 OptionType<T> 型別，T 可為 string 或 number
    // 若目前 T 型別支援 -1 作為 value，則直接插入
    const allOption: OptionType<T> = { label: "全部", value: -1 as T };
    return [allOption, ...props.options];
  }
  return props.options;
});

// 定義 emits，支援 v-model 的雙向綁定（update:modelValue），以及選擇變更時觸發 change 事件
const emit = defineEmits<{
  (e: "update:modelValue", value: T | null): void;
  (e: "change", value: T | null): void;
}>();

// 處理選擇器的值變化，分別觸發 update:modelValue 與 change 事件
function handleUpdate(val: T | null) {
  // 如果是 "全部" 選項 (value === -1)，則發送 null
  const emitValue = (val as any) === -1 ? null : val;
  emit("update:modelValue", emitValue);
  // 如果不是 null，則發送 change 事件
  if (emitValue !== null) {
    emit("change", emitValue);
  }
}
</script>

<template>
  <el-select
    @update:model-value="handleUpdate"
    v-bind="$props"
    :model-value="internalValue"
    :class="selectClass"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>
