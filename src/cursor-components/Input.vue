<script setup lang="ts">
interface Props {
  modelValue: string;
  placeholder?: string;
  type?: "text" | "password" | "email";
  size?: "sm" | "md" | "lg";
  iconLeft?: boolean;
  iconRight?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  size: "md",
  iconLeft: false,
  iconRight: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const containerClasses = computed(() => ({
  "input-container": true,
  [`input-${props.size}`]: true,
  "with-icon-left": props.iconLeft,
  "with-icon-right": props.iconRight,
}));
</script>

<template>
  <div :class="containerClasses">
    <span v-if="iconLeft" class="icon-left">
      <slot name="icon-left"></slot>
    </span>
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      @input="
        emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
    <span v-if="iconRight" class="icon-right">
      <slot name="icon-right"></slot>
    </span>
  </div>
</template>

<style scoped>
.input-container {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;
}

input {
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  transition: all 0.2s;
}

input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px #3b82f6;
}

.icon-left,
.icon-right {
  position: absolute;
  display: flex;
  align-items: center;
  color: #6b7280;
}

.icon-left {
  left: 0.75rem;
}

.icon-right {
  right: 0.75rem;
}

/* Size variants */
.input-sm {
  font-size: 0.875rem;
}

.input-sm input {
  padding: 0.5rem 0.75rem;
}

.input-sm.with-icon-left input {
  padding-left: 2.25rem;
}

.input-sm.with-icon-right input {
  padding-right: 2.25rem;
}

.input-sm :deep(svg) {
  width: 1rem;
  height: 1rem;
}

.input-md {
  font-size: 1rem;
}

.input-md input {
  padding: 0.625rem 0.75rem;
}

.input-md.with-icon-left input {
  padding-left: 2.5rem;
}

.input-md.with-icon-right input {
  padding-right: 2.5rem;
}

.input-md :deep(svg) {
  width: 1.25rem;
  height: 1.25rem;
}

.input-lg {
  font-size: 1.125rem;
}

.input-lg input {
  padding: 0.75rem 1rem;
}

.input-lg.with-icon-left input {
  padding-left: 3rem;
}

.input-lg.with-icon-right input {
  padding-right: 3rem;
}

.input-lg :deep(svg) {
  width: 1.5rem;
  height: 1.5rem;
}
</style>
