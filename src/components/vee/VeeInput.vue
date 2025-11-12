<script setup lang="ts">
import { useField } from "vee-validate";
import { computed, ref } from "vue";
import { View, Hide } from "@element-plus/icons-vue";

// 定義 Props
interface Props {
  name: string;
  label: string;
  type?: "text" | "password" | "email" | "number";
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  size?: "large" | "default" | "small";
  prefixIcon?: any;
  clearable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  disabled: false,
  required: false,
  size: "default",
  clearable: true,
});

// 使用 vee-validate 的 useField
const { value, errorMessage, handleBlur, handleChange, meta } = useField<
  string | number | undefined
>(() => props.name, undefined, {
  validateOnValueUpdate: false,
});

// 密碼顯示控制
const showPassword = ref(false);

// 動態計算輸入框類型
const inputType = computed(() => {
  if (props.type === "password" && showPassword.value) {
    return "text";
  }
  return props.type;
});

// 處理輸入變更
const handleInput = (newValue: string | number | undefined) => {
  const safeValue = newValue ?? "";
  value.value = safeValue;
  handleChange(safeValue);
};

// 錯誤狀態
const showError = computed(() => !!errorMessage.value && meta.touched);
</script>

<template>
  <div class="mb-4">
    <label :for="props.name" class="block mb-1 font-medium text-gray-700">
      {{ props.label }}
      <span v-if="props.required" class="text-red-500 ml-1">*</span>
    </label>

    <el-input
      :model-value="value ?? ''"
      @update:model-value="handleInput"
      :type="inputType"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :size="props.size"
      :prefix-icon="props.prefixIcon"
      :clearable="props.clearable"
      :id="props.name"
      v-bind="$attrs"
      @blur="handleBlur"
      :class="{
        'is-error': showError,
      }"
    >
      <!-- 密碼顯示/隱藏按鈕 -->
      <template v-if="props.type === 'password'" #suffix>
        <el-icon class="cursor-pointer" @click="showPassword = !showPassword">
          <View v-if="showPassword" />
          <Hide v-else />
        </el-icon>
      </template>
    </el-input>

    <Transition name="fade">
      <span v-if="showError" class="text-red-500 text-sm mt-1 block">
        * {{ errorMessage }}
      </span>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

:deep(.el-input.is-error .el-input__wrapper) {
  box-shadow: 0 0 0 1px var(--el-color-danger) inset;
}

:deep(.el-input.is-error .el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px var(--el-color-danger) inset;
}

:deep(.el-input.is-error .el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px var(--el-color-danger) inset;
}
</style>
