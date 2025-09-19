import { defineComponent, h, ref, PropType } from 'vue'
import Stepper from './Stepper.vue'
import type { Step } from '../types/stepper'
import './RenderComp.scss'

export default defineComponent({
  name: 'RenderComp',
  props: {
    // Required props
    steps: {
      type: Array as PropType<Step[]>,
      required: true
    },
    currentStep: {
      type: Number,
      required: true
    },
    // Optional props
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
  setup(props, { emit }) {
    const handleStepClick = (index: number) => {
      emit('step-click', index)
    }

    const renderStepContent = (step: Step, index: number) => {
      switch (step.name) {
        case 'personal':
          return [
            h('h2', { class: 'step-title' }, 'Personal Information'),
            h('p', { class: 'step-description' }, 'Please enter your personal details below:'),
            h('div', { class: 'form-group' }, [
              h('label', { class: 'form-label' }, 'Full Name'),
              h('input', {
                type: 'text',
                placeholder: 'John Doe',
                class: 'form-input'
              })
            ]),
            h('div', { class: 'form-group' }, [
              h('label', { class: 'form-label' }, 'Email'),
              h('input', {
                type: 'email',
                placeholder: 'john@example.com',
                class: 'form-input'
              })
            ])
          ]
        case 'contact':
          return [
            h('h2', { class: 'step-title' }, 'Contact Details'),
            h('p', { class: 'step-description' }, 'How can we reach you?'),
            h('div', { class: 'form-group' }, [
              h('label', { class: 'form-label' }, 'Phone Number'),
              h('input', {
                type: 'tel',
                placeholder: '+1 (555) 000-0000',
                class: 'form-input'
              })
            ]),
            h('div', { class: 'form-group' }, [
              h('label', { class: 'form-label' }, 'Address'),
              h('textarea', {
                placeholder: 'Enter your full address',
                class: 'form-input form-textarea',
                rows: 3
              })
            ])
          ]
        case 'preferences':
          return [
            h('h2', { class: 'step-title' }, 'Preferences'),
            h('p', { class: 'step-description' }, 'Tell us about your preferences:'),
            h('div', { class: 'form-group' }, [
              h('label', { class: 'form-label' }, 'Interests'),
              h('div', { class: 'checkbox-group' }, [
                h('label', { class: 'checkbox-label' }, [
                  h('input', {
                    type: 'checkbox',
                    class: 'checkbox-input'
                  }),
                  'Technology'
                ]),
                h('label', { class: 'checkbox-label' }, [
                  h('input', {
                    type: 'checkbox',
                    class: 'checkbox-input'
                  }),
                  'Design'
                ]),
                h('label', { class: 'checkbox-label' }, [
                  h('input', {
                    type: 'checkbox',
                    class: 'checkbox-input'
                  }),
                  'Business'
                ])
              ])
            ]),
            h('div', { class: 'form-group' }, [
              h('label', { class: 'form-label' }, 'Newsletter'),
              h('div', { class: 'radio-group' }, [
                h('label', { class: 'radio-label' }, [
                  h('input', {
                    type: 'radio',
                    name: 'newsletter',
                    value: 'daily',
                    class: 'radio-input'
                  }),
                  'Daily Updates'
                ]),
                h('label', { class: 'radio-label' }, [
                  h('input', {
                    type: 'radio',
                    name: 'newsletter',
                    value: 'weekly',
                    class: 'radio-input'
                  }),
                  'Weekly Digest'
                ])
              ])
            ])
          ]
        case 'review':
          return [
            h('h2', { class: 'step-title' }, 'Review'),
            h('p', { class: 'step-description' }, 'Please review your information:'),
            h('div', { class: 'review-section' }, [
              h('div', { class: 'review-group' }, [
                h('h3', { class: 'review-subtitle' }, 'Personal Information'),
                h('div', { class: 'review-item' }, [
                  h('span', { class: 'review-label' }, 'Name:'),
                  h('span', { class: 'review-value' }, 'John Doe')
                ]),
                h('div', { class: 'review-item' }, [
                  h('span', { class: 'review-label' }, 'Email:'),
                  h('span', { class: 'review-value' }, 'john@example.com')
                ])
              ]),
              h('div', { class: 'review-group' }, [
                h('h3', { class: 'review-subtitle' }, 'Contact Details'),
                h('div', { class: 'review-item' }, [
                  h('span', { class: 'review-label' }, 'Phone:'),
                  h('span', { class: 'review-value' }, '+1 (555) 000-0000')
                ]),
                h('div', { class: 'review-item' }, [
                  h('span', { class: 'review-label' }, 'Address:'),
                  h('span', { class: 'review-value' }, '123 Main St, City, Country')
                ])
              ]),
              h('div', { class: 'review-group' }, [
                h('h3', { class: 'review-subtitle' }, 'Preferences'),
                h('div', { class: 'review-item' }, [
                  h('span', { class: 'review-label' }, 'Interests:'),
                  h('span', { class: 'review-value' }, 'Technology, Design')
                ]),
                h('div', { class: 'review-item' }, [
                  h('span', { class: 'review-label' }, 'Newsletter:'),
                  h('span', { class: 'review-value' }, 'Weekly Digest')
                ])
              ])
            ])
          ]
        default:
          return [
            h('div', { class: 'step-error' }, [
              h('h2', { class: 'step-title' }, 'Unknown Step'),
              h('p', { class: 'step-description' }, `Content for step "${step.name}" is not defined.`)
            ])
          ]
      }
    }

    return () => h('div', { class: 'render-comp' }, [
      h(Stepper, {
        steps: props.steps,
        currentStep: props.currentStep,
        size: props.size,
        selectedStep: props.selectedStep,
        onStepClick: handleStepClick
      }, {
        content: ({ step, index }: { step: Step, index: number }) => h('div', { class: 'step-content' }, renderStepContent(step, index))
      })
    ])
  }
}) 