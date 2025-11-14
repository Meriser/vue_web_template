<script setup lang="ts">
import { motion } from "motion-v";
import { ref, onMounted } from "vue";

// 定義 Props
interface Props {
  y?: number;
  duration?: number;
  delay?: number;
}

// 設定預設值
const props = withDefaults(defineProps<Props>(), {
  y: 30,
  duration: 0.5,
  delay: 0,
});

// 動畫顯示狀態
const show = ref<Boolean>(false);

// 掛載時顯示動畫
onMounted(() => {
  requestAnimationFrame(() => {
    show.value = true;
  });
});
</script>

<template>
  <motion.div
    :initial="{ opacity: 0, y: props.y }"
    :animate="show ? { opacity: 1, y: 0 } : { opacity: 0, y: props.y }"
    :transition="{
      duration: props.duration,
      delay: props.delay,
    }"
  >
    <!-- slot 傳入任意子元件，例如：<FadeInDiv><div>Hello</div></FadeInDiv> -->
    <slot />
  </motion.div>
</template>
