<script setup lang="ts">
import { ref, computed } from "vue";
import { View, Hide } from "@element-plus/icons-vue";

// 定義組件 props 的類型，並設置可選屬性
interface Props {
  type?: string;                        // 輸入框型態（如 text、password）
  placeholder?: string;                 // 預設顯示提示文字
  size?: "large" | "default" | "small"; // 輸入框尺寸
  prefixIcon?: any;                     // 輸入框前綴 icon
  clearable?: boolean;                  // 是否可清除輸入內容
  inputClass?: string;                  // 輸入框 class 樣式
}

// 設定 props 預設值
const props = withDefaults(defineProps<Props>(), {
  type: "text",
  size: "default",
  clearable: true,
  inputClass: "w-[200px]",
});

// 聲明父組件 v-model 綁定的值（支持 undefined，因為清空時會是 undefined）
const modelValue = defineModel<string | number | undefined>();

// 控制密碼顯示/隱藏的狀態
const showPassword = ref(false);

// 動態計算輸入框型態，若為密碼欄則依 showPassword 顯示密文或明文
const inputType = computed(() => {
  if (props.type === "password") {
    return showPassword.value ? "text" : "password";
  }
  return props.type;
});

// 切換密碼顯示、隱藏
function handleShowPassword() {
  showPassword.value = !showPassword.value;
}
</script>

<template>
  <!-- v-bind="$attrs" 將父組件傳遞的所有屬性(如事件、原生屬性等)向下傳遞給 el-input 元件 -->
  <el-input
    v-bind="$attrs"
    v-model="modelValue"
    :type="inputType"
    :placeholder="placeholder"
    :size="size"
    :prefix-icon="prefixIcon"
    :clearable="clearable"
    :class="inputClass"
  >
    <template v-if="type === 'password'" #suffix>
      <el-icon class="cursor-pointer" @click="handleShowPassword">
        <component :is="showPassword ? View : Hide" />
      </el-icon>
    </template>
  </el-input>
</template>
