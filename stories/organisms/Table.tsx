'use client';

import { DualButton } from '../atoms/DualButton';
import { TableRow } from '../molecules/TableRow';
import React from 'react';
import { Role } from '../../types/roles';
import { useT } from '../../app/i18n/useT';

export interface TableProps {
  data: any[];
  columns: {
    key: string;
    label: string;
    type?: 'text' | 'badge';
    badgeColorMap?: Record<string, string>;
  }[];
  page?: number;
  total?: number;
  isDark?: boolean;
  onEdit?: (item: any) => void;
  onDelete?: (item: Role) => void;
  onPageChange?: (page: number) => void;
}

export const Table = ({
  data = [],
  columns,
  isDark = false,
  page = 1,
  total = 1,
  onEdit,
  onDelete,
  onPageChange
}: TableProps) => {
  const { t } = useT('components');

  const bgColor = isDark ? 'bg-dark-900' : 'bg-black-50';
  const textColor = isDark ? 'text-white-50' : 'text-black-950';

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > total) return;
    onPageChange?.(newPage);
  };

  return (
    <div className='flex flex-col h-full justify-between'>
      <div className={`overflow-x-auto rounded-xl ${bgColor} ${textColor} border border-black-300/40`}>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-black-300/40">
              {columns.map((col) => (
                <th key={col.key} className="px-5 py-3 text-sm font-bold uppercase">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row, index) => (
              <TableRow
                key={index}
                data={row}
                columns={columns}
                isDark={isDark}
                onEdit={() => onEdit?.(row)}
                onDelete={() => onDelete?.(row)}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <span>
          {t('page')} {page} {t('of')} {total}
        </span>

        <DualButton
          isDark={isDark}
          leftAction={() => handlePageChange(page - 1)}
          rightAction={() => handlePageChange(page + 1)}
        />
      </div>
    </div >
  );
};
