<template>
  <div class="date-picker-ui-root">
    <DatePickerRoot
      v-model="innerValue"
      :min-value="props.minValue ?? defaultMin"
      :max-value="props.maxValue ?? defaultMax"
    >
      <DatePickerField :label="label" />
      <DatePickerContent>
        <DatePickerCalendar>
          <slot name="trigger">
            <DatePickerTrigger />
          </slot>
          <slot name="arrow">
            <DatePickerArrow />
          </slot>
          <DatePickerHeader>
            <slot name="prev">
              <DatePickerPrev />
            </slot>
            <slot name="heading">
              <DatePickerHeading />
            </slot>
            <slot name="next">
              <DatePickerNext />
            </slot>
          </DatePickerHeader>
          <DatePickerGrid>
            <DatePickerGridHead>
              <slot name="head-cell">
                <!-- Slot for DatePickerHeadCell, must be provided by user with required props -->
              </slot>
            </DatePickerGridHead>
            <DatePickerGridBody>
              <DatePickerGridRow>
                <slot name="cell">
                  <!-- Slot for DatePickerCell, must be provided by user with required props -->
                  <slot name="cell-trigger">
                    <!-- Slot for DatePickerCellTrigger, must be provided by user with required props -->
                  </slot>
                </slot>
              </DatePickerGridRow>
            </DatePickerGridBody>
          </DatePickerGrid>
        </DatePickerCalendar>
        <slot name="input">
          <!-- Slot for DatePickerInput, must be provided by user with required props -->
        </slot>
      </DatePickerContent>
    </DatePickerRoot>
    <slot name="label">
      <Label v-if="label" :for="label">{{ label }}</Label>
    </slot>
    <div v-if="innerValue" class="date-value-display">
      {{ formattedDate }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import {
  DatePickerArrow,
  DatePickerCalendar,
  DatePickerCell,
  DatePickerCellTrigger,
  DatePickerContent,
  DatePickerField,
  DatePickerGrid,
  DatePickerGridBody,
  DatePickerGridHead,
  DatePickerGridRow,
  DatePickerHeadCell,
  DatePickerHeader,
  DatePickerHeading,
  DatePickerInput,
  DatePickerNext,
  DatePickerPrev,
  DatePickerRoot,
  DatePickerTrigger,
  Label,
} from "reka-ui";
import type { DateValue } from "@internationalized/date";
import { parseDate } from "@internationalized/date";

const props = defineProps<{
  modelValue: DateValue | any | null;
  label?: string;
  minValue?: DateValue;
  maxValue?: DateValue;
}>();
const emit = defineEmits(["update:modelValue"]);

const innerValue = ref<DateValue | any | null>(props.modelValue);

// Default min/max: 01.01.1900 - 31.12.2100
const defaultMin: DateValue = parseDate("1900-01-01");
const defaultMax: DateValue = parseDate("2100-12-31");

watch(
  () => props.modelValue,
  (val) => {
    if (val !== innerValue.value) innerValue.value = val;
  }
);
watch(innerValue, (val) => {
  emit("update:modelValue", val);
});

const formattedDate = computed(() => {
  if (!innerValue.value) return "";
  // Try to get ISO string, then format as dd.mm.yyyy
  let iso = "";
  if (typeof innerValue.value.toString === "function") {
    iso = innerValue.value.toString();
  } else if (typeof innerValue.value === "string") {
    iso = innerValue.value;
  }
  // Acceptable ISO: yyyy-mm-dd or yyyy-mm-ddTHH:MM:SSZ
  const match = iso.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (match) {
    return `${match[3]}.${match[2]}.${match[1]}`;
  }
  return iso;
});
</script>

<style scoped>
.date-picker-ui-root {
  width: 100%;
  min-width: 220px;
  position: relative;
  font-family: inherit;
}

.date-picker-ui-root .date-picker-field {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  background: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: border-color 0.2s;
}
.date-picker-ui-root .date-picker-field:focus {
  outline: none;
  border-color: #2196f3;
  box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.1);
}

.date-picker-ui-root .date-picker-content {
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

.date-picker-ui-root .date-picker-calendar {
  width: 100%;
  border-radius: 8px;
  background: #f9fafb;
  padding: 0.5rem;
  box-shadow: 0 2px 8px rgba(33, 150, 243, 0.05);
  margin-top: 0.5rem;
}

.date-picker-ui-root .date-picker-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  background: #2196f3;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: 0 1px 2px rgba(33, 150, 243, 0.08);
}
.date-picker-ui-root .date-picker-trigger:hover,
.date-picker-ui-root .date-picker-trigger:focus {
  background: #1769aa;
  outline: none;
}
.date-value-display {
  margin-top: 0.5rem;
  font-size: 1rem;
  color: #2196f3;
  font-weight: 500;
}
</style>

<!--
Sample usage (with DateValue for min/max):

<script setup lang="ts">
import { ref } from 'vue';
import DatePickerUI from './components/DatePickerUI.vue';
import { parseDate } from '@internationalized/date';

const date = ref(null);
</script>

<DatePickerUI
  v-model="date"
  label="Birth Date"
  :min-value="parseDate('2000-01-01')"
  :max-value="parseDate('2025-12-31')"
/>
-->
