<script setup lang="ts">
import BaseIcon from "./BaseIcon.vue";

defineProps<{
  size?: "xs" | "sm" | "md" | "lg" | number;
  color?: string;
}>();
</script>

<template>
  <BaseIcon :size="size" :color="color">
    <circle cx="12" cy="12" r="10" fill="currentColor" fill-opacity="0.1" />
    <path
      d="M15 9l-6 6m0-6l6 6"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </BaseIcon>
</template>
