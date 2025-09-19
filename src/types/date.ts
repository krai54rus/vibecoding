import type { ComponentProps } from 'vue-component-type-helpers'
import type { DateRangePickerRoot } from 'reka-ui'

// Props inferred from the DateRangePickerRoot component
export type DateRangePickerRootProps = ComponentProps<typeof DateRangePickerRoot>

// Extended props that allow string values for minValue and maxValue
export type DateRangePickerProps = Omit<DateRangePickerRootProps, 'minValue' | 'maxValue'> & {
  minValue?: DateRangePickerRootProps['minValue'] | string
  maxValue?: DateRangePickerRootProps['maxValue'] | string
}

/*
Usage example:

<script setup lang="ts">
import type { DateRangePickerProps } from '@/types/date'
const props: DateRangePickerProps = {
  minValue: '2024-01-01',
  maxValue: '2025-12-31'
}
</script>
*/