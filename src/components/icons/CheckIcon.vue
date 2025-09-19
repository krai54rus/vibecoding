<script setup lang="ts">
import BaseIcon from "./BaseIcon.vue";

defineProps<{
  size?: "xs" | "sm" | "md" | "lg" | number;
  color?: string;
}>();
</script>

<template>
  <BaseIcon :size="size" :color="color">
    <path d="M5 13l4 4L19 7" />
  </BaseIcon>
</template>
