<template>
  <div class="registration-page">
    <h1>Create Your Account</h1>
    <Stepper
      :steps="steps"
      :current-step="currentStep"
      @step-click="handleStepClick"
    >
      <!-- Step 1: Personal Information -->
      <template #step-0>
        <div class="step-form">
          <h2>Personal Information</h2>
          <div class="form-group">
            <label for="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              v-model="formData.fullName"
              class="form-input"
              placeholder="Enter your full name"
              :class="{ error: errors.fullName }"
            />
            <span class="error-text" v-if="errors.fullName">{{
              errors.fullName
            }}</span>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              v-model="formData.email"
              class="form-input"
              placeholder="Enter your email"
              :class="{ error: errors.email }"
            />
            <span class="error-text" v-if="errors.email">{{
              errors.email
            }}</span>
          </div>
          <div class="form-group">
            <label for="birthDate">Birth Date123</label>
            <div class="date-picker-root">
              <input
                type="text"
                :value="formData.birthDate ? formData.birthDate.toString() : ''"
                placeholder="Select a date"
                readonly
                style="margin-bottom: 0.5rem; width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 4px; background: #f9fafb; font-size: 1rem; cursor: pointer;"
              />
              <DatePickerUI v-model="formData.birthDate" label="Birth Date" />
            </div>
            <span class="error-text" v-if="errors.birthDate">{{ errors.birthDate }}</span>
          </div>
          <div class="step-actions">
            <button class="btn btn-primary" @click="nextStep">Next</button>
          </div>
        </div>
      </template>

      <!-- Step 2: Account Details -->
      <template #step-1>
        <div class="step-form">
          <h2>Account Details</h2>
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              v-model="formData.username"
              class="form-input"
              placeholder="Choose a username"
              :class="{ error: errors.username }"
            />
            <span class="error-text" v-if="errors.username">{{
              errors.username
            }}</span>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="formData.password"
              class="form-input"
              placeholder="Enter your password"
              :class="{ error: errors.password }"
            />
            <span class="error-text" v-if="errors.password">{{
              errors.password
            }}</span>
          </div>
          <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              v-model="formData.confirmPassword"
              class="form-input"
              placeholder="Confirm your password"
              :class="{ error: errors.confirmPassword }"
            />
            <span class="error-text" v-if="errors.confirmPassword">{{
              errors.confirmPassword
            }}</span>
          </div>
          <div class="step-actions">
            <button class="btn btn-secondary" @click="previousStep">
              Back
            </button>
            <button class="btn btn-primary" @click="nextStep">Next</button>
          </div>
        </div>
      </template>

      <!-- Step 3: Preferences -->
      <template #step-2>
        <div class="step-form">
          <h2>Preferences</h2>
          <div class="form-group">
            <label>Interests</label>
            <div class="checkbox-group">
              <label
                class="checkbox-label"
                v-for="interest in availableInterests"
                :key="interest.value"
              >
                <input
                  type="checkbox"
                  v-model="formData.interests"
                  :value="interest.value"
                />
                {{ interest.label }}
              </label>
            </div>
            <span class="error-text" v-if="errors.interests">{{
              errors.interests
            }}</span>
          </div>
          <div class="form-group">
            <label for="notification">Notification Preferences</label>
            <select
              id="notification"
              v-model="formData.notifications"
              class="form-input"
              :class="{ error: errors.notifications }"
            >
              <option value="">Select notification preference</option>
              <option value="all">All Notifications</option>
              <option value="important">Important Only</option>
              <option value="none">No Notifications</option>
            </select>
            <span class="error-text" v-if="errors.notifications">{{
              errors.notifications
            }}</span>
          </div>
          <div class="step-actions">
            <button class="btn btn-secondary" @click="previousStep">
              Back
            </button>
            <button class="btn btn-primary" @click="nextStep">Next</button>
          </div>
        </div>
      </template>

      <!-- Step 4: Review -->
      <template #step-3>
        <div class="step-form">
          <h2>Review Your Information</h2>
          <div class="review-info">
            <div class="review-section">
              <h3>Personal Information</h3>
              <p><strong>Name:</strong> {{ formData.fullName }}</p>
              <p><strong>Email:</strong> {{ formData.email }}</p>
            </div>
            <div class="review-section">
              <h3>Account Details</h3>
              <p><strong>Username:</strong> {{ formData.username }}</p>
              <p><strong>Password:</strong> ********</p>
            </div>
            <div class="review-section">
              <h3>Preferences</h3>
              <p><strong>Interests:</strong> {{ formatInterests }}</p>
              <p><strong>Notifications:</strong> {{ formatNotifications }}</p>
            </div>
          </div>
          <div class="step-actions">
            <button class="btn btn-secondary" @click="previousStep">
              Back
            </button>
            <button class="btn btn-primary" @click="submitForm">Submit</button>
          </div>
        </div>
      </template>
    </Stepper>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Stepper from "../components/Stepper.vue";
import type { Step } from "../types/stepper";
import { DatePickerRoot, DatePickerField, DatePickerContent } from "reka-ui";
import type { DateValue } from "@internationalized/date";
import DatePickerUI from "../components/DatePickerUI.vue";

interface FormData {
  fullName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  interests: string[];
  notifications: string;
  birthDate: DateValue | any | null;
}

interface FormErrors {
  [key: string]: string;
}

const currentStep = ref(0);
const errors = ref<FormErrors>({});

const steps: Step[] = [
  { name: "personal", title: "Personal Info", status: "current" },
  { name: "account", title: "Account", status: "pending" },
  { name: "preferences", title: "Preferences", status: "pending" },
  { name: "review", title: "Review", status: "pending" },
];

const formData = ref<FormData>({
  fullName: "",
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
  interests: [],
  notifications: "",
  birthDate: null,
});

const availableInterests = [
  { value: "technology", label: "Technology" },
  { value: "design", label: "Design" },
  { value: "business", label: "Business" },
  { value: "marketing", label: "Marketing" },
  { value: "development", label: "Development" },
];

const formatInterests = computed(() => {
  return formData.value.interests.length > 0
    ? formData.value.interests
        .map(
          (interest) =>
            availableInterests.find((i) => i.value === interest)?.label ||
            interest
        )
        .join(", ")
    : "None selected";
});

const formatNotifications = computed(() => {
  const notificationMap: { [key: string]: string } = {
    all: "All Notifications",
    important: "Important Only",
    none: "No Notifications",
  };
  return notificationMap[formData.value.notifications] || "Not selected";
});

const validateStep = (step: number): boolean => {
  errors.value = {};
  let isValid = true;

  switch (step) {
    case 0:
      if (!formData.value.fullName.trim()) {
        errors.value.fullName = "Full name is required";
        isValid = false;
      }
      if (!formData.value.email.trim()) {
        errors.value.email = "Email is required";
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
        errors.value.email = "Please enter a valid email address";
        isValid = false;
      }
      if (!formData.value.birthDate) {
        errors.value.birthDate = "Birth date is required";
        isValid = false;
      }
      break;

    case 1:
      if (!formData.value.username.trim()) {
        errors.value.username = "Username is required";
        isValid = false;
      }
      if (!formData.value.password) {
        errors.value.password = "Password is required";
        isValid = false;
      } else if (formData.value.password.length < 8) {
        errors.value.password = "Password must be at least 8 characters long";
        isValid = false;
      }
      if (formData.value.password !== formData.value.confirmPassword) {
        errors.value.confirmPassword = "Passwords do not match";
        isValid = false;
      }
      break;

    case 2:
      if (formData.value.interests.length === 0) {
        errors.value.interests = "Please select at least one interest";
        isValid = false;
      }
      if (!formData.value.notifications) {
        errors.value.notifications = "Please select a notification preference";
        isValid = false;
      }
      break;
  }

  return isValid;
};

const updateStepStatuses = (newStep: number) => {
  console.log("updateStepStatuses", newStep);
  steps.forEach((step, index) => {
    if (index < newStep) {
      step.status = "completed";
    } else if (index === newStep) {
      step.status = "current";
    } else {
      step.status = "pending";
    }
  });
};

const handleStepClick = (stepIndex: number) => {
  console.log("handleStepClick", stepIndex);
  if (stepIndex < currentStep.value || validateStep(currentStep.value)) {
    currentStep.value = stepIndex;
    updateStepStatuses(stepIndex);
  }
};

const nextStep = () => {
  if (validateStep(currentStep.value) && currentStep.value < steps.length - 1) {
    currentStep.value++;
    updateStepStatuses(currentStep.value);
  }
};

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
    updateStepStatuses(currentStep.value);
  }
};

const submitForm = () => {
  if (validateStep(currentStep.value)) {
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData.value);
    alert("Registration successful!");
  }
};
</script>

<style lang="scss" scoped>
.registration-page {
  max-width: 800px;
  margin: 0 auto;
  padding: $spacing-6;

  h1 {
    text-align: center;
    margin-bottom: $spacing-8;
    color: $gray-800;
  }
}

.step-form {
  h2 {
    color: $gray-700;
    margin-bottom: $spacing-6;
  }

  h3 {
    color: $gray-600;
    margin-bottom: $spacing-3;
  }
}

.form-group {
  margin-bottom: $spacing-4;

  label {
    display: block;
    margin-bottom: $spacing-2;
    color: $gray-700;
    font-weight: 500;
  }
}

.form-input {
  width: 100%;
  padding: $spacing-3;
  border: 1px solid $gray-300;
  border-radius: $border-radius;
  font-size: $font-size-base;
  transition: $transition-base;

  &:focus {
    outline: none;
    border-color: $primary-color;
    box-shadow: 0 0 0 2px rgba($primary-color, 0.1);
  }

  &.error {
    border-color: #dc2626;
  }
}

.error-text {
  display: block;
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: $spacing-1;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: $spacing-2;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: $spacing-2;
  cursor: pointer;

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
}

.review-info {
  background: $gray-50;
  border-radius: $border-radius;
  padding: $spacing-4;
}

.review-section {
  margin-bottom: $spacing-4;
  padding-bottom: $spacing-4;
  border-bottom: 1px solid $gray-200;

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }

  p {
    margin: $spacing-2 0;
    color: $gray-600;

    strong {
      color: $gray-700;
    }
  }
}

.step-actions {
  display: flex;
  justify-content: space-between;
  gap: $spacing-4;
  margin-top: $spacing-6;

  button {
    min-width: 120px;
  }
}
</style>

<style scoped>
/* Custom DatePicker styles */
.date-picker-root {
  width: 100%;
  min-width: 220px;
  position: relative;
  font-family: inherit;
}
.date-picker-root .date-picker-field {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  background: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: border-color 0.2s;
}
.date-picker-root .date-picker-field:focus {
  outline: none;
  border-color: #2196f3;
  box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.1);
}
.date-picker-root .date-picker-content {
  position: absolute;
  z-index: 10;
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  margin-top: 0.5rem;
  padding: 1rem;
  min-width: 250px;
  min-height: 250px;
}
.date-picker-root .date-picker-calendar {
  width: 100%;
}
</style>
