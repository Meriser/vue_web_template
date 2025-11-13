<script setup lang="ts">
import { useField } from "vee-validate";
import { computed } from "vue";
import Input from "@/components/Input.vue";

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

    <Input
      :model-value="value ?? ''"
      @update:model-value="handleInput"
      :type="props.type"
      :placeholder="props.placeholder"
      :size="props.size"
      :prefix-icon="props.prefixIcon"
      :clearable="props.clearable"
      v-bind="$attrs"
      @blur="handleBlur"
      :class="{
        'is-error': showError,
      }"
    />

    <Transition name="fade">
      <span v-if="showError" class="text-red-500 text-sm mt-1 block">
        * {{ errorMessage }}
      </span>
    </Transition>
  </div>
</template>

<style scoped>
</style>
