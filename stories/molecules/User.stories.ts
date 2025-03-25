import type { Meta, StoryObj } from '@storybook/react';
import { User } from './User';

const meta = {
  title: 'Molecules/User',
  component: User,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof User>;

export default meta;
type Story = StoryObj<typeof meta>;

