import type { Meta, StoryObj } from '@storybook/react';
import { Notification } from './Notification';

const meta = {
  title: 'Atoms/Notification',
  component: Notification,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Notification>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
  },
};
