<script setup lang="ts">
import BaseIcon from "./BaseIcon.vue";

defineProps<{
  size?: "xs" | "sm" | "md" | "lg" | number;
  color?: string;
}>();
</script>

<template>
  <BaseIcon :size="size" :color="color">
    <circle cx="12" cy="12" r="10" stroke-dasharray="2" />
  </BaseIcon>
</template>
