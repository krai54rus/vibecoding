<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import Stepper from "./Stepper.vue";
import StepperIcons from "./StepperIcons.vue";

interface FormData {
  personal: {
    fullName: string;
    email: string;
  };
  address: {
    street: string;
    city: string;
  };
  payment: {
    cardNumber: string;
    expiryDate: string;
  };
}

const currentStep = ref("personal");

const formData = reactive<FormData>({
  personal: {
    fullName: "",
    email: "",
  },
  address: {
    street: "",
    city: "",
  },
  payment: {
    cardNumber: "",
    expiryDate: "",
  },
});

const validationRules = {
  personal: (data: FormData["personal"]) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return data.fullName.length >= 3 && emailRegex.test(data.email);
  },
  address: (data: FormData["address"]) => {
    return data.street.length >= 5 && data.city.length >= 2;
  },
  payment: (data: FormData["payment"]) => {
    const cardRegex = /^\d{16}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    return (
      cardRegex.test(data.cardNumber.replace(/\s/g, "")) &&
      expiryRegex.test(data.expiryDate)
    );
  },
};

const stepValidation = reactive({
  personal: false,
  address: false,
  payment: false,
  review: true,
});

const steps = computed(() => [
  {
    name: "personal",
    title: "Personal Info",
    status: getStepStatus("personal"),
  },
  {
    name: "address",
    title: "Address",
    status: getStepStatus("address"),
  },
  {
    name: "payment",
    title: "Payment",
    status: getStepStatus("payment"),
  },
  {
    name: "review",
    title: "Review",
    status: getStepStatus("review"),
  },
]);

function getStepStatus(stepName: keyof FormData | "review") {
  if (currentStep.value === stepName) {
    return "current";
  }

  if (stepName === "review") {
    const allPreviousValid =
      stepValidation.personal &&
      stepValidation.address &&
      stepValidation.payment;
    return allPreviousValid ? "current" : "pending";
  }

  if (stepValidation[stepName]) {
    return "completed";
  }

  const currentIndex = ["personal", "address", "payment", "review"].indexOf(
    currentStep.value
  );
  const stepIndex = ["personal", "address", "payment", "review"].indexOf(
    stepName
  );

  if (currentIndex > stepIndex && !stepValidation[stepName]) {
    return "error";
  }

  return "pending";
}

function validateStep(stepName: keyof FormData) {
  if (stepName in validationRules) {
    stepValidation[stepName] = validationRules[stepName](formData[stepName]);
  }
  return stepValidation[stepName];
}

function updateStep(stepName: string) {
  if (currentStep.value !== "review") {
    const isValid = validateStep(currentStep.value as keyof FormData);
    if (!isValid) {
      return; // Don't proceed if current step is invalid
    }
  }
  currentStep.value = stepName;
}

function formatCardNumber(value: string) {
  const cleaned = value.replace(/\s/g, "");
  const groups = cleaned.match(/.{1,4}/g) || [];
  return groups.join(" ");
}
</script>

<template>
  <div class="stepper-test">
    <Stepper :steps="steps" :selected-step="currentStep">
      <template #default="{ selectedStep }">
        <div class="content-card">
          <!-- Personal Info Step -->
          <div
            v-if="selectedStep === 'personal'"
            class="step-content personal-step"
          >
            <h2>Personal Information</h2>
            <div class="form-group">
              <label>Full Name</label>
              <input
                type="text"
                v-model="formData.personal.fullName"
                placeholder="John Doe"
                :class="{
                  error:
                    !stepValidation.personal &&
                    formData.personal.fullName.length > 0,
                }"
              />
              <span
                class="error-text"
                v-if="
                  !stepValidation.personal &&
                  formData.personal.fullName.length > 0
                "
              >
                Name must be at least 3 characters
              </span>
            </div>
            <div class="form-group">
              <label>Email</label>
              <input
                type="email"
                v-model="formData.personal.email"
                placeholder="john@example.com"
                :class="{
                  error:
                    !stepValidation.personal &&
                    formData.personal.email.length > 0,
                }"
              />
              <span
                class="error-text"
                v-if="
                  !stepValidation.personal && formData.personal.email.length > 0
                "
              >
                Please enter a valid email address
              </span>
            </div>
            <button class="next-button" @click="updateStep('address')">
              Continue
            </button>
          </div>

          <!-- Address Step -->
          <div
            v-if="selectedStep === 'address'"
            class="step-content address-step"
          >
            <h2>Shipping Address</h2>
            <div class="form-group">
              <label>Street Address</label>
              <input
                type="text"
                v-model="formData.address.street"
                placeholder="123 Main St"
                :class="{
                  error:
                    !stepValidation.address &&
                    formData.address.street.length > 0,
                }"
              />
              <span
                class="error-text"
                v-if="
                  !stepValidation.address && formData.address.street.length > 0
                "
              >
                Street address must be at least 5 characters
              </span>
            </div>
            <div class="form-group">
              <label>City</label>
              <input
                type="text"
                v-model="formData.address.city"
                placeholder="New York"
                :class="{
                  error:
                    !stepValidation.address && formData.address.city.length > 0,
                }"
              />
              <span
                class="error-text"
                v-if="
                  !stepValidation.address && formData.address.city.length > 0
                "
              >
                City must be at least 2 characters
              </span>
            </div>
            <div class="button-group">
              <button class="back-button" @click="updateStep('personal')">
                Back
              </button>
              <button class="next-button" @click="updateStep('payment')">
                Continue
              </button>
            </div>
          </div>

          <!-- Payment Step -->
          <div
            v-if="selectedStep === 'payment'"
            class="step-content payment-step"
          >
            <h2>Payment Details</h2>
            <div class="form-group">
              <label>Card Number</label>
              <input
                type="text"
                v-model="formData.payment.cardNumber"
                placeholder="**** **** **** ****"
                @input="
                  formData.payment.cardNumber = formatCardNumber(
                    $event.target.value
                  )
                "
                :class="{
                  error:
                    !stepValidation.payment &&
                    formData.payment.cardNumber.length > 0,
                }"
              />
              <span
                class="error-text"
                v-if="
                  !stepValidation.payment &&
                  formData.payment.cardNumber.length > 0
                "
              >
                Please enter a valid 16-digit card number
              </span>
            </div>
            <div class="form-group">
              <label>Expiry Date</label>
              <input
                type="text"
                v-model="formData.payment.expiryDate"
                placeholder="MM/YY"
                :class="{
                  error:
                    !stepValidation.payment &&
                    formData.payment.expiryDate.length > 0,
                }"
              />
              <span
                class="error-text"
                v-if="
                  !stepValidation.payment &&
                  formData.payment.expiryDate.length > 0
                "
              >
                Please enter a valid expiry date (MM/YY)
              </span>
            </div>
            <div class="button-group">
              <button class="back-button" @click="updateStep('address')">
                Back
              </button>
              <button class="next-button" @click="updateStep('review')">
                Continue
              </button>
            </div>
          </div>

          <!-- Review Step -->
          <div
            v-if="selectedStep === 'review'"
            class="step-content review-step"
          >
            <h2>Review Order</h2>
            <div class="review-item">
              <h3>Personal Info</h3>
              <p>{{ formData.personal.fullName }}</p>
              <p>{{ formData.personal.email }}</p>
            </div>
            <div class="review-item">
              <h3>Shipping Address</h3>
              <p>{{ formData.address.street }}</p>
              <p>{{ formData.address.city }}</p>
            </div>
            <div class="review-item">
              <h3>Payment</h3>
              <p>{{ formData.payment.cardNumber }}</p>
              <p>Expires: {{ formData.payment.expiryDate }}</p>
            </div>
            <div class="button-group">
              <button class="back-button" @click="updateStep('payment')">
                Back
              </button>
              <button
                class="submit-button"
                :disabled="
                  !stepValidation.personal ||
                  !stepValidation.address ||
                  !stepValidation.payment
                "
              >
                Submit Order
              </button>
            </div>
          </div>
        </div>
      </template>
      <template #step-personal="{ step, index }">
        <div class="custom-step-with-icon">
          <StepperIcons
            :type="'circle'"
            :status="step.status"
            :text="(index + 1).toString()"
          />
          <div class="step-info">
            <h3>{{ step.title }}</h3>
            <span class="step-status" :class="step.status">
              {{ step.status }}
            </span>
          </div>
        </div>
      </template>
      <template #step-address="{ step, index }">
        <div class="custom-step-with-icon">
          <StepperIcons
            :type="'hexagon'"
            :status="step.status"
            :text="(index + 1).toString()"
          />
          <div class="step-info">
            <h3>{{ step.title }}</h3>
            <span class="step-status" :class="step.status">
              {{ step.status }}
            </span>
          </div>
        </div>
      </template>
      <template #step-payment="{ step, index }">
        <div class="custom-step-with-icon">
          <StepperIcons
            :type="'square'"
            :status="step.status"
            :text="(index + 1).toString()"
          />
          <div class="step-info">
            <h3>{{ step.title }}</h3>
            <span class="step-status" :class="step.status">
              {{ step.status }}
            </span>
          </div>
        </div>
      </template>
    </Stepper>
  </div>
</template>

<style scoped>
.stepper-test {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.content-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.step-content {
  padding: 2rem;
  min-height: 400px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.step-content::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  z-index: 1;
}

.step-content > * {
  position: relative;
  z-index: 2;
}

.personal-step {
  background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.address-step {
  background-image: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);
}

.payment-step {
  background-image: linear-gradient(135deg, #fad961 0%, #f76b1c 100%);
}

.review-step {
  background-image: linear-gradient(135deg, #5ee7df 0%, #b490ca 100%);
}

h2 {
  color: #1a202c;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  font-weight: 600;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  color: #4a5568;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  background: white;
  font-size: 1rem;
  transition: all 0.2s;
}

input:focus {
  outline: none;
  border-color: #4299e1;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
}

input.error {
  border-color: #f56565;
}

input.error:focus {
  box-shadow: 0 0 0 3px rgba(245, 101, 101, 0.2);
}

.error-text {
  color: #f56565;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  display: block;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

button {
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.next-button {
  background: #4299e1;
  color: white;
  border: none;
}

.next-button:hover:not(:disabled) {
  background: #3182ce;
}

.back-button {
  background: transparent;
  border: 1px solid #4299e1;
  color: #4299e1;
}

.back-button:hover:not(:disabled) {
  background: #ebf8ff;
}

.submit-button {
  background: #48bb78;
  color: white;
  border: none;
}

.submit-button:hover:not(:disabled) {
  background: #38a169;
}

.review-item {
  background: rgba(255, 255, 255, 0.8);
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.review-item h3 {
  color: #2d3748;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.review-item p {
  color: #4a5568;
  margin: 0.25rem 0;
}

.custom-step-with-icon {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background: white;
  transition: all 0.2s;
}

.custom-step-with-icon:hover {
  background: rgba(43, 50, 168, 0.05);
}

.step-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.step-info h3 {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: #1f2937;
}

.step-status {
  font-size: 0.75rem;
  text-transform: capitalize;
}

.step-status.pending {
  color: #94a3b8;
}

.step-status.current {
  color: #2b32a8;
}

.step-status.completed {
  color: #16a34a;
}

.step-status.error {
  color: #dc2626;
}
</style>
