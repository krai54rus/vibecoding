import StepperElement from './StepperElement.ce'

// Export all custom elements
export {
  StepperElement
}

// Define types for the custom elements
declare global {
  interface HTMLElementTagNameMap {
    'vue-stepper': typeof StepperElement
  }
} 