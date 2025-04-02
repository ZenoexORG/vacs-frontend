import { Meta, StoryObj } from '@storybook/react';
import { Table, TableProps } from './Table';

const meta: Meta<TableProps> = {
  title: 'Organisms/Table',
  component: Table,
  argTypes: {
    isDark: {
      control: 'boolean',
      description: 'Change the theme of the table to dark mode',
    },
  },
};

export default meta;

type Story = StoryObj<TableProps>;

export const Default: Story = {
  args: {
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'age', label: 'Age' },
      { key: 'status', label: 'Status', type: 'badge', badgeColorMap: { active: 'bg-green-500', inactive: 'bg-red-500' } },
    ],
    data: [
      { name: 'John Doe', age: '30', status: 'active' },
      { name: 'Jane Doe', age: '25', status: 'inactive' },
    ],
    isDark: false,
  },
};

export const DarkMode: Story = {
  args: {
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'age', label: 'Age' },
      { key: 'status', label: 'Status', type: 'badge', badgeColorMap: { active: 'bg-green-500', inactive: 'bg-red-500' } },
    ],
    data: [
      { name: 'John Doe', age: '30', status: 'active' },
      { name: 'Jane Doe', age: '25', status: 'inactive' },
    ],
    isDark: true,
  },
};
