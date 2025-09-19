import type { Meta, StoryObj } from '@storybook/vue3';
import BaseIcon from './BaseIcon.vue';

const meta = {
  title: 'Components/Icons/BaseIcon',
  component: BaseIcon,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['xs', 'sm', 'md', 'lg', 24, 32, 48]
      }
    },
    color: {
      control: 'color'
    }
  }
} satisfies Meta<typeof BaseIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic icon with default props
export const Default: Story = {
  render: (args) => ({
    components: { BaseIcon },
    setup() {
      return { args };
    },
    template: `
      <BaseIcon v-bind="args">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </BaseIcon>
    `
  }),
  args: {
    size: 'md',
    color: 'currentColor'
  }
};

// Small red icon
export const SmallRed: Story = {
  render: (args) => ({
    components: { BaseIcon },
    setup() {
      return { args };
    },
    template: `
      <BaseIcon v-bind="args">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </BaseIcon>
    `
  }),
  args: {
    size: 'sm',
    color: '#FF0000'
  }
};

// Large custom size icon
export const LargeCustom: Story = {
  render: (args) => ({
    components: { BaseIcon },
    setup() {
      return { args };
    },
    template: `
      <BaseIcon v-bind="args">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </BaseIcon>
    `
  }),
  args: {
    size: 48,
    color: '#0066FF'
  }
}; 