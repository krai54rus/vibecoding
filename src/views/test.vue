<script setup lang="ts">
import { ref } from "vue";
import RenderComp from "../components/RenderComp";
import type { Step } from "../types/stepper";

const currentStep = ref(0);
const steps: Step[] = [
  {
    name: "personal",
    title: "Personal Info",
    status: "current",
  },
  {
    name: "contact",
    title: "Contact Details",
    status: "pending",
  },
  {
    name: "preferences",
    title: "Preferences",
    status: "pending",
  },
  {
    name: "review",
    title: "Review",
    status: "pending",
  },
];

const handleStepClick = (index: number) => {
  currentStep.value = index;
  // Update steps status
  steps.forEach((step, i) => {
    if (i === index) {
      step.status = "current";
    } else if (i < index) {
      step.status = "completed";
    } else {
      step.status = "pending";
    }
  });
};
</script>

<template>
  <RenderComp
    :steps="steps"
    :current-step="currentStep"
    @step-click="handleStepClick"
  />
</template>
