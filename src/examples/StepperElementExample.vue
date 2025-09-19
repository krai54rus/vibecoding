<template>
  <div class="stepper-example">
    <vue-stepper
      :steps="steps"
      :current-step="currentStep"
      @step-click="handleStepClick"
    >
      <template v-for="(step, index) in steps" :key="step.name">
        <div :slot="`step-${index}`" class="step-content">
          <h2>{{ step.title }}</h2>
          <div v-if="index === 0">
            <div class="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="John Doe" />
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" placeholder="john@example.com" />
            </div>
          </div>
          <div v-else-if="index === 1">
            <div class="form-group">
              <label>Phone Number</label>
              <input type="tel" placeholder="+1 (555) 000-0000" />
            </div>
            <div class="form-group">
              <label>Address</label>
              <textarea placeholder="Enter your address" rows="3"></textarea>
            </div>
          </div>
          <div v-else>
            <div class="review-section">
              <h3>Review Information</h3>
              <div class="review-item"><strong>Name:</strong> John Doe</div>
              <div class="review-item">
                <strong>Email:</strong> john@example.com
              </div>
              <div class="review-item">
                <strong>Phone:</strong> +1 (555) 000-0000
              </div>
              <div class="review-item">
                <strong>Address:</strong> 123 Main St, City, Country
              </div>
            </div>
          </div>
        </div>
      </template>
    </vue-stepper>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Step } from "../types/stepper";
import "../components/custom-elements";

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
    name: "review",
    title: "Review",
    status: "pending",
  },
];

const handleStepClick = (event: CustomEvent<number>) => {
  const index = event.detail;
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

<style scoped>
.stepper-example {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
}

.form-group textarea {
  resize: vertical;
}

.review-section {
  background-color: #f9fafb;
  padding: 1.5rem;
  border-radius: 0.5rem;
}

.review-section h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: #111827;
}

.review-item {
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
}

.review-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.review-item strong {
  display: inline-block;
  width: 100px;
  color: #4b5563;
}
</style>
