'use client';

import { DualButton } from '@atoms/DualButton';
import { TableRow } from '@molecules/TableRow';
import React, { useState } from 'react';

export interface TableProps {
  data: Record<string, string | null>[];
  columns: {
    key: string;
    label: string;
    type?: 'text' | 'badge';
    badgeColorMap?: Record<string, string>;
  }[];
  isDark?: boolean;

}

export const Table = ({ data, columns, isDark = false }: TableProps) => {
  const bgColor = isDark ? 'bg-dark-900' : 'bg-black-50';
  const textColor = isDark ? 'text-white-50' : 'text-black-950';

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / 6);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * 6;
  const endIndex = startIndex + 6;
  const currentData = data.slice(startIndex, endIndex);

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
              <TableRow key={index} data={row} columns={columns} isDark={isDark} />
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
