<script setup lang="ts">
interface Props {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  iconLeft?: boolean;
  iconRight?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md",
  iconLeft: false,
  iconRight: false,
});

const buttonClasses = computed(() => ({
  button: true,
  [`button-${props.variant}`]: true,
  [`button-${props.size}`]: true,
  "with-icon-left": props.iconLeft,
  "with-icon-right": props.iconRight,
}));
</script>

<template>
  <button :class="buttonClasses">
    <span v-if="iconLeft" class="icon-left">
      <slot name="icon-left"></slot>
    </span>
    <span class="button-content">
      <slot></slot>
    </span>
    <span v-if="iconRight" class="icon-right">
      <slot name="icon-right"></slot>
    </span>
  </button>
</template>

<style scoped>
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 500;
  border-radius: 0.375rem;
  transition: all 0.2s;
}

.button-primary {
  background-color: #3b82f6;
  color: white;
  border: none;
}

.button-primary:hover {
  background-color: #2563eb;
}

.button-secondary {
  background-color: #9ca3af;
  color: white;
  border: none;
}

.button-outline {
  background-color: transparent;
  border: 1px solid #e5e7eb;
  color: #374151;
}

.button-sm {
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
}

.button-sm :deep(svg) {
  width: 1rem;
  height: 1rem;
}

.button-md {
  padding: 0.625rem 1rem;
  font-size: 1rem;
}

.button-md :deep(svg) {
  width: 1.25rem;
  height: 1.25rem;
}

.button-lg {
  padding: 0.75rem 1.25rem;
  font-size: 1.125rem;
}

.button-lg :deep(svg) {
  width: 1.5rem;
  height: 1.5rem;
}

.icon-left,
.icon-right {
  display: flex;
  align-items: center;
}
</style>
