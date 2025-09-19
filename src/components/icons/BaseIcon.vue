<script setup lang="ts">
interface Props {
  size?: "xs" | "sm" | "md" | "lg" | number;
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  color: "currentColor",
});

const sizeMap = {
  xs: "1rem", // 16px
  sm: "1.25rem", // 20px
  md: "1.5rem", // 24px
  lg: "2rem", // 32px
};

const computedSize =
  typeof props.size === "number" ? `${props.size}px` : sizeMap[props.size];
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="computedSize"
    :height="computedSize"
    viewBox="0 0 24 24"
    fill="none"
    :stroke="color"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <slot></slot>
  </svg>
</template>
