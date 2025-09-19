<script setup lang="ts">
import { computed } from "vue";
import StepperItem from "./StepperItem.vue";
import type { Step } from "../types/stepper";

interface Props {
  steps: Step[];
  size?: "xs" | "md";
  selectedStep?: string;
  currentStep: number;
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  selectedStep: "",
});

const containerClasses = computed(() => ({
  stepper: true,
  "stepper-xs": props.size === "xs",
  "stepper-md": props.size === "md",
}));

const isStepSelected = (stepName: string) => {
  return props.selectedStep === stepName;
};

defineEmits<{
  (e: "step-click", index: number): void;
}>();
</script>

<template>
  <div class="stepper-container">
    <div class="stepper">
      <div class="stepper-header">
        <div
          v-for="(step, index) in steps"
          :key="step.name"
          class="step-indicator"
          :class="{
            active: currentStep === index,
            completed: index < currentStep,
          }"
          @click="$emit('step-click', index)"
        >
          <div class="step-number">
            <template v-if="index < currentStep">
              <svg class="check-icon" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </template>
            <template v-else>
              {{ index + 1 }}
            </template>
          </div>
          <span class="step-title">{{ step.title }}</span>
          <div v-if="index < steps.length - 1" class="step-line"></div>
        </div>
      </div>
      <div class="step-content">
        <slot
          :name="`step-${currentStep}`"
          :step="steps[currentStep]"
          :index="currentStep"
        >
          <!-- Fallback to content slot if no specific step slot is provided -->
          <slot
            name="content"
            :step="steps[currentStep]"
            :index="currentStep"
            :selectedStep="selectedStep"
            :steps="steps"
          ></slot>
        </slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// Variables are now globally imported through Vite config
.stepper-container {
  width: 100%;
}

.stepper {
  display: flex;
  flex-direction: column;
  gap: $spacing-6;
}

.stepper-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 0 $spacing-4;
}

.step-indicator {
  display: flex;
  align-items: center;
  cursor: pointer;
  flex: 1;

  &.active {
    .step-number {
      background-color: $primary-color;
      color: $white;
    }

    .step-title {
      color: $primary-color;
      font-weight: 600;
    }
  }

  &.completed {
    .step-number {
      background-color: $primary-color;
      color: $white;
    }

    .step-line {
      background-color: $primary-color;
    }
  }
}

.step-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: $gray-200;
  color: $gray-600;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  transition: $transition-base;
  flex-shrink: 0;

  .check-icon {
    width: 18px;
    height: 18px;
    fill: currentColor;
  }
}

.step-title {
  margin: 0 $spacing-4;
  color: $gray-600;
  font-size: $font-size-base;
  transition: $transition-base;
  white-space: nowrap;
}

.step-line {
  height: 2px;
  flex: 1;
  background-color: $gray-200;
  transition: $transition-base;
  margin: 0 $spacing-2;
}

.step-content {
  padding: $spacing-4;
  background-color: $white;
  border-radius: $border-radius;
  box-shadow: $shadow-sm;
  min-height: 300px;
}

.stepper-actions {
  display: flex;
  justify-content: space-between;
  gap: $spacing-4;
  padding: 0 $spacing-4;
}

.btn {
  padding: $spacing-2 $spacing-4;
  border-radius: $border-radius;
  font-weight: 500;
  cursor: pointer;
  transition: $transition-base;
  border: none;
  min-width: 100px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &-primary {
    background-color: $primary-color;
    color: $white;

    &:hover:not(:disabled) {
      background-color: darken($primary-color, 10%);
    }
  }

  &-secondary {
    background-color: $gray-200;
    color: $gray-700;

    &:hover:not(:disabled) {
      background-color: $gray-300;
    }
  }
}
</style>
