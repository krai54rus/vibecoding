import { defineCustomElement, h, computed, PropType } from 'vue'
import type { Step } from '../types/stepper'

// Define styles as a string since web components need self-contained styles
const styles = `
  .stepper-container {
    width: 100%;
    font-family: system-ui, -apple-system, sans-serif;
  }

  .stepper {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .stepper-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 0 1rem;
  }

  .step-indicator {
    display: flex;
    align-items: center;
    cursor: pointer;
    flex: 1;
  }

  .step-indicator.active .step-number {
    background-color: #2563eb;
    color: white;
  }

  .step-indicator.active .step-title {
    color: #2563eb;
    font-weight: 600;
  }

  .step-indicator.completed .step-number {
    background-color: #2563eb;
    color: white;
  }

  .step-indicator.completed .step-line {
    background-color: #2563eb;
  }

  .step-number {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #e5e7eb;
    color: #4b5563;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  .check-icon {
    width: 18px;
    height: 18px;
    fill: currentColor;
  }

  .step-title {
    margin: 0 1rem;
    color: #4b5563;
    font-size: 0.875rem;
    transition: all 0.2s ease;
    white-space: nowrap;
  }

  .step-line {
    height: 2px;
    flex: 1;
    background-color: #e5e7eb;
    transition: all 0.2s ease;
    margin: 0 0.5rem;
  }

  .step-content {
    padding: 1rem;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    min-height: 300px;
  }

  ::slotted(*) {
    margin: 0;
    font-family: inherit;
  }
`

const StepperElement = defineCustomElement({
  props: {
    steps: {
      type: Array as PropType<Step[]>,
      required: true
    },
    currentStep: {
      type: Number,
      required: true
    },
    size: {
      type: String as PropType<'xs' | 'md'>,
      default: 'md'
    },
    selectedStep: {
      type: String,
      default: ''
    }
  },
  emits: ['step-click'],
  styles: [styles],
  setup(props, { emit }) {
    const containerClasses = computed(() => ({
      'stepper-container': true,
      [`stepper-${props.size}`]: true
    }))

    const handleStepClick = (index: number) => {
      emit('step-click', index)
    }

    return () => h('div', { class: containerClasses.value }, [
      h('div', { class: 'stepper' }, [
        h('div', { class: 'stepper-header' }, 
          props.steps.map((step, index) => 
            h('div', {
              key: step.name,
              class: {
                'step-indicator': true,
                'active': props.currentStep === index,
                'completed': index < props.currentStep
              },
              onClick: () => handleStepClick(index)
            }, [
              h('div', { class: 'step-number' }, 
                index < props.currentStep
                  ? h('svg', {
                      class: 'check-icon',
                      viewBox: '0 0 20 20',
                      fill: 'currentColor'
                    }, [
                      h('path', {
                        'fill-rule': 'evenodd',
                        d: 'M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z',
                        'clip-rule': 'evenodd'
                      })
                    ])
                  : (index + 1).toString()
              ),
              h('span', { class: 'step-title' }, step.title),
              index < props.steps.length - 1
                ? h('div', { class: 'step-line' })
                : null
            ])
          )
        ),
        h('div', { class: 'step-content' }, [
          h('slot', {
            name: `step-${props.currentStep}`,
          }, [
            // Fallback content slot
            h('slot', {
              name: 'content',
              step: props.steps[props.currentStep],
              index: props.currentStep,
              selectedStep: props.selectedStep,
              steps: props.steps
            })
          ])
        ])
      ])
    ])
  }
})

// Register the custom element
customElements.define('vue-stepper', StepperElement)

// Export the custom element constructor
export default StepperElement 