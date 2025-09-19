<template>
  <Stepper :steps="steps" :selected-step="currentStep">
    <template #default="{ selectedStep, steps }">
      <!-- Content for all steps in one place -->
      <div v-if="selectedStep === 'step1'">Content for Step 1</div>
      <div v-if="selectedStep === 'step2'">Content for Step 2</div>
      <!-- Add more conditions for other steps -->
    </template>
  </Stepper>
</template>

<script setup>
const steps = [
  { name: "step1", title: "Step 1", status: "completed" },
  { name: "step2", title: "Step 2", status: "current" },
  // ... more steps
];

const currentStep = ref("step1"); // Control which step content is visible
</script>
