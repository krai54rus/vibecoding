<template>
  <div class="drag-item-placeholder" :class="{ active: isActive }">
    <div class="placeholder-content">
      <div class="placeholder-line"></div>
      <div class="placeholder-text">{{ text }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isActive: boolean;
  text?: string;
}>();
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables";

.drag-item-placeholder {
  padding: $spacing-2;
  margin: $spacing-1 0;
  border: 2px dashed transparent;
  border-radius: $border-radius;
  min-height: 60px;
  opacity: 0;
  transition: $transition-base;

  &.active {
    opacity: 1;
    border-color: $primary-color;
    background-color: rgba($primary-color, 0.05);
  }

  .placeholder-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: $spacing-2;
    padding: $spacing-2;
  }

  .placeholder-line {
    height: 12px;
    background: rgba($primary-color, 0.1);
    border-radius: $border-radius-sm;
    width: 70%;
  }

  .placeholder-text {
    font-size: $font-size-base;
    color: $gray-400;
  }
}
</style>
