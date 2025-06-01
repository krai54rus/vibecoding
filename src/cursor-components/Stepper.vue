<script setup lang="ts">
import { computed } from "vue";
import StepperItem from "./StepperItem.vue";

interface Step {
  name: string;
  title: string;
  status: "pending" | "current" | "completed" | "error";
}

interface Props {
  steps: Step[];
  size?: "xs" | "md";
  selectedStep?: string;
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
</script>

<template>
  <div class="stepper-container">
    <div :class="containerClasses">
      <template v-for="(step, index) in steps" :key="step.name">
        <!-- Default StepperItem -->
        <template v-if="!$slots[`step-${step.name}`]">
          <StepperItem
            :title="step.title"
            :name="step.name"
            :status="step.status"
          />
        </template>

        <!-- Custom StepperItem slot -->
        <template v-else>
          <slot
            :name="`step-${step.name}`"
            :step="step"
            :index="index"
            :is-selected="selectedStep === step.name"
          />
        </template>

        <!-- Connector slot with default -->
        <template v-if="index < steps.length - 1">
          <slot name="connector" :index="index" :step="step">
            <div class="stepper-connector"></div>
          </slot>
        </template>
      </template>
    </div>
    <div class="stepper-content-container">
      <slot :selected-step="selectedStep" :steps="steps"></slot>
    </div>
  </div>
</template>

<style scoped>
.stepper-container {
  display: flex;
  gap: 2rem;
}

.stepper {
  display: flex;
  flex-direction: column;
}

.stepper-content-container {
  flex: 1;
  padding: 1rem;
}

.stepper-connector {
  width: 2px;
  background-color: #e5e7eb;
  margin-left: 1rem;
  height: 2rem;
}

/* Size variants */
.stepper-xs {
  font-size: 0.875rem;
}

.stepper-xs :deep(.stepper-indicator) {
  width: 1.5rem;
  height: 1.5rem;
}

.stepper-xs :deep(.stepper-indicator svg) {
  width: 1rem;
  height: 1rem;
}

.stepper-md {
  font-size: 1rem;
}

.stepper-md :deep(.stepper-indicator) {
  width: 2rem;
  height: 2rem;
}

.stepper-md :deep(.stepper-indicator svg) {
  width: 1.25rem;
  height: 1.25rem;
}

.custom-step {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
}

.custom-step.is-selected {
  background: #ebf8ff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.step-number {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: #4299e1;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.step-info {
  flex: 1;
}

.step-info h3 {
  margin: 0;
  font-size: 1rem;
}

.custom-connector {
  padding: 0.5rem 0 0.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.custom-connector .line {
  width: 2px;
  height: 2rem;
  background: #e5e7eb;
  margin-left: 1rem;
}
</style>
