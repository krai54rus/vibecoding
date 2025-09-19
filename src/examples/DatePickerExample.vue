<template>
  <div style="max-width: 400px; margin: 2rem auto">
    <h2>DatePicker Example</h2>
    <DatePickerRoot v-model="testData">
      <DatePickerField label="TestLabel" />
      <DatePickerContent />
    </DatePickerRoot>
    <div style="margin-top: 1rem">
      <strong>Selected Date:</strong>
      {{ testData ? testData.toString() : "None" }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { DatePickerRoot, DatePickerField, DatePickerContent } from "reka-ui";
import type { DateValue } from "@internationalized/date";

const testData = ref<DateValue | any | null>(null);
</script>
