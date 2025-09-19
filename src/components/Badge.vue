<script setup lang="ts">
interface Props {
  variant?: "success" | "warning" | "error" | "info";
  size?: "sm" | "md";
  withIcon?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "info",
  size: "md",
  withIcon: false,
});

const badgeClasses = computed(() => ({
  badge: true,
  [`badge-${props.variant}`]: true,
  [`badge-${props.size}`]: true,
  "with-icon": props.withIcon,
}));
</script>

<template>
  <span :class="badgeClasses">
    <span v-if="withIcon" class="badge-icon">
      <slot name="icon"></slot>
    </span>
    <span class="badge-content">
      <slot></slot>
    </span>
  </span>
</template>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: 500;
  border-radius: 9999px;
}

.badge-success {
  background-color: #dcfce7;
  color: #15803d;
}

.badge-warning {
  background-color: #fef3c7;
  color: #b45309;
}

.badge-error {
  background-color: #fee2e2;
  color: #b91c1c;
}

.badge-info {
  background-color: #dbeafe;
  color: #1d4ed8;
}

.badge-sm {
  padding: 0.25rem 0.625rem;
  font-size: 0.75rem;
}

.badge-sm :deep(svg) {
  width: 0.875rem;
  height: 0.875rem;
}

.badge-md {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
}

.badge-md :deep(svg) {
  width: 1rem;
  height: 1rem;
}

.badge-icon {
  display: flex;
  align-items: center;
}

.badge-content {
  line-height: 1;
}
</style>
