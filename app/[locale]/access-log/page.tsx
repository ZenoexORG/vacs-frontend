'use client';

import { Title } from "@atoms/Title";
import { useTheme } from "@contexts/themeContext";
import { Table } from "@organisms/Table";
import { useT } from "../../i18n/useT";

const data = [
  {
    id: '1',
    entryDate: '2025-04-01 08:00',
    exitDate: '2025-04-01 09:00',
    vehicleId: 'V1234',
    type: 'car',
    userId: 'U5678'
  },
  { id: '2', entryDate: '2025-04-01 10:00', exitDate: '2025-04-01 11:00', vehicleId: 'V5678', type: 'truck', userId: 'U1234' },
  { id: '3', entryDate: '2025-04-01 12:00', exitDate: '2025-04-01 13:00', vehicleId: 'V9101', type: 'bike', userId: 'U4321' },
  { id: '4', entryDate: '2025-04-01 12:00', exitDate: '2025-04-01 13:00', vehicleId: 'V9101', type: 'bike', userId: 'U4321' },
  { id: '5', entryDate: '2025-04-01 12:00', exitDate: '2025-04-01 13:00', vehicleId: 'V9101', type: 'bike', userId: 'U4321' },
  { id: '6', entryDate: '2025-04-01 12:00', exitDate: '2025-04-01 13:00', vehicleId: 'V9101', type: 'bike', userId: 'U4321' },
];

export default function AccessLog() {
  const { isDark } = useTheme();
  const { t } = useT('access_log');

  const columns = [
    { key: 'id', label: t('id') },
    { key: 'entryDate', label: t('entry_date') },
    { key: 'exitDate', label: t('exit_date') },
    { key: 'vehicleId', label: t('vehicle_id') },
    {
      key: 'type',
      label: t('type'),
      type: 'badge',
      badgeColorMap: {
        'car': '#578215',
        'truck': '#857238',
        'bike': '#985423'
      }
    },
    { key: 'userId', label: t('user_id') },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Title size="3xl" isDark={isDark}>
        {t('access_log')}
      </Title>

      <Table data={data} columns={columns} isDark={isDark} />
    </div>
  );
}
