import type { Meta, StoryObj } from '@storybook/react';

import { Option } from './Option';

const meta = {
  title: 'Atoms/Option',
  component: Option,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Option>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'Option',
    value: 'option',
  },
};
