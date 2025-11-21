<script setup lang="ts">
import { computed } from "vue";

// 定義 Props
interface Props {
  tag?: keyof HTMLElementTagNameMap;
}

const props = withDefaults(defineProps<Props>(), {
  tag: "div",
});

// 計算 tag 名稱
const tagName = computed(() => props.tag);
</script>

<template>
  <component :is="tagName">
    <slot />
  </component>
</template>
