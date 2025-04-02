import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { DualButton } from './DualButton';

const meta = {
  title: 'Atoms/DualButton',
  component: DualButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

  args: { leftAction: fn(), rightAction: fn() },
} satisfies Meta<typeof DualButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
  },
};

export const Secondary: Story = {
  args: {
  },
};

export const Large: Story = {
  args: {
  },
};

export const Small: Story = {
  args: {
  },
};
