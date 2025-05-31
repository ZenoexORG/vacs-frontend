import type { Meta, StoryObj } from '@storybook/react';
import { NavItem } from './NavItem';

const meta = {
  title: 'Molecules/NavItem',
  component: NavItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NavItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    icon: 'Dashboard',
    to: '/dashboard',
  },
};
