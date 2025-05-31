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

