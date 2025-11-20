<script setup lang="ts">
import { ElSelect, ElOption } from "element-plus";
import type { OptionType } from "@/types/option";

// 定義 props
const props = defineProps<{
  modelValue: string | number | null;
  options: OptionType<string | number>[];
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  filterable?: boolean;
  size?: "large" | "default" | "small";
}>();

// 定義 emits，支援 v-model 的雙向綁定（update:modelValue），以及選擇變更時觸發 change 事件
const emit = defineEmits<{
  (e: "update:modelValue", value: string | number | null): void;
  (e: "change", value: string | number): void;
}>();

// 處理選擇器的值變化，分別觸發 update:modelValue 與 change 事件
function handleUpdate(val: string | number | null) {
  emit("update:modelValue", val);
  emit("change", val as any);
}
</script>

<template>
  <el-select
    @update:model-value="handleUpdate"
    v-bind="$props"
    class="w-full"
  >
    <el-option
      v-for="item in props.options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>
