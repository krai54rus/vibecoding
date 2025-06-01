<script setup lang="ts">
import SuccessIcon from "./icons/SuccessIcon.vue";
import ErrorIcon from "./icons/ErrorIcon.vue";

interface Props {
  status?: "pending" | "current" | "completed" | "error";
  title: string;
  name: string;
}

defineProps<Props>();

const getStatusColor = (status?: string) => {
  switch (status) {
    case "completed":
      return "#10b981"; // green
    case "error":
      return "#ef4444"; // red
    case "current":
      return "#3b82f6"; // blue
    default:
      return "#9ca3af"; // gray
  }
};
</script>

<template>
  <div class="stepper-item">
    <div class="stepper-indicator" :class="`status-${status}`">
      <slot name="status-icon">
        <template v-if="status === 'completed'">
          <SuccessIcon :color="getStatusColor(status)" />
        </template>
        <template v-else-if="status === 'error'">
          <ErrorIcon :color="getStatusColor(status)" />
        </template>
        <template v-else-if="status === 'current'">
          <div class="current-dot"></div>
        </template>
        <template v-else>
          <div class="pending-circle"></div>
        </template>
      </slot>
    </div>
    <div class="stepper-content">
      <div class="stepper-title">{{ title }}</div>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.stepper-item {
  display: flex;
  gap: 1rem;
  position: relative;
}

.stepper-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: #f3f4f6;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.status-completed {
  background-color: #dcfce7;
}

.status-error {
  background-color: #fee2e2;
}

.status-current {
  background-color: #dbeafe;
}

.current-dot {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background-color: #3b82f6;
}

.pending-circle {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  border: 2px dashed #9ca3af;
}

.stepper-content {
  flex: 1;
  padding-bottom: 2rem;
}

.stepper-title {
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: #374151;
}

:deep(svg) {
  width: 1.25rem;
  height: 1.25rem;
}
</style>
