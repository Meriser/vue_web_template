<script setup lang="ts">
import { ElButton } from "element-plus";
import type { ButtonType } from "element-plus";
import type { Component } from "vue";

// ButtonProps 定義
defineProps<{
  type?: ButtonType;
  size?: "large" | "default" | "small";
  plain?: boolean;
  round?: boolean;
  circle?: boolean;
  text?: boolean;
  bg?: boolean;
  link?: boolean;
  icon?: string | Component;
  loading?: boolean;
  disabled?: boolean;
  autoInsertSpace?: boolean;
  nativeType?: "button" | "submit" | "reset";
}>();
</script>

<template>
  <!-- 包裹 slot，支持自定義按鈕內容，並將所有 props 傳遞給 el-button -->
  <el-button v-bind="$props">
    <slot />
  </el-button>
</template>
