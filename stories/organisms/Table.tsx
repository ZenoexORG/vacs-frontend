'use client';

import { DualButton } from '@atoms/DualButton';
import { TableRow } from '@molecules/TableRow';
import React, { useState } from 'react';
import { Role } from '../../types/roles';

export interface TableProps {
  data: Record<string, string | null>[];
  columns: {
    key: string;
    label: string;
    type?: 'text' | 'badge';
    badgeColorMap?: Record<string, string>;
  }[];
  isDark?: boolean;
  onEdit?: (item: any) => void;
  onDelete?: (item: Role) => void;
}

export const Table = ({ data, columns, isDark = false, onEdit, onDelete }: TableProps) => {
  const bgColor = isDark ? 'bg-dark-900' : 'bg-black-50';
  const textColor = isDark ? 'text-white-50' : 'text-black-950';

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / 6);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
          Page {currentPage} of {totalPages}
        </span>

        <DualButton
          leftAction={() => handlePageChange(currentPage - 1)}
          rightAction={() => handlePageChange(currentPage + 1)}
          isDark={isDark}
        />
      </div>
    </div>
  );
};
