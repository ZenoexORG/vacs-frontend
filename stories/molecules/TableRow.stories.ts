import type { Meta, StoryObj } from '@storybook/react';
import { TableRow, TableRowProps } from './TableRow';

const meta = {
  title: 'Molecules/TableRow',
  component: TableRow,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TableRow>;

export default meta;
type Story = StoryObj<typeof meta>;

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'entryDate', label: 'Entry Date' },
  { key: 'exitDate', label: 'Exit Date' },
  { key: 'vehicleId', label: 'Vehicle ID' },
  {
    key: 'type', label: 'Type', type: 'badge', badgeColorMap: {
      Authorized: '#14b8a6',
      Private: '#ef4444',
      Visitor: '#f97316',
      Provider: '#a855f7',
    }
  },
  { key: 'userId', label: 'User ID' },
];

export const Default: Story = {
  args: {
    data: {
      id: '00001',
      entryDate: '13:24 - 04 Sep 2024',
      exitDate: '20:55 - 04 Sep 2024',
      vehicleId: 'C48-F06',
      type: 'Authorized',
      userId: '1056763957',
    },
    columns,
    isDark: false,
  },
};

export const DarkMode: Story = {
  args: {
    data: {
      id: '00002',
      entryDate: '09:25 - 12 Jan 2026',
      exitDate: '',
      vehicleId: 'H65-O51',
      type: 'Private',
      userId: null,
    },
    columns,
    isDark: true,
  },
};
