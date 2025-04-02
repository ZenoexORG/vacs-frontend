'use client';

import { Badge } from '@atoms/Badge';
import { DualButton } from '@atoms/DualButton';
import { Delete, ModeEdit } from '@mui/icons-material';
import React from 'react';

export interface TableRowProps {
  data: Record<string, any>;
  columns: {
    key: string;
    label: string;
    type?: 'text' | 'badge';
    badgeColorMap?: Record<string, string>;
  }[];
  isDark?: boolean;
}

export const TableRow = ({ data, columns, isDark = false }: TableRowProps) => {
  const bgColor = isDark ? 'bg-dark-800' : 'bg-white-50';
  const textColor = isDark ? 'text-white-50' : 'text-black-950';

  return (
    <tr className={`border-b border-black-300/40 ${bgColor} ${textColor}`}>
      {columns.map((col) => {
        let content = data[col.key] || 'None';

        if (col.type === 'badge' && col.badgeColorMap) {
          content = (
            <Badge
              color={col.badgeColorMap[data[col.key] || ''] || '#ccc'}
              label={data[col.key] || 'None'}
              isDark={isDark}
              size="small"
            />
          );
        } else if (col.key === 'permissions' && Array.isArray(data[col.key])) {
          const formattedPermissions = data[col.key].map((item: any) => {
            const category = item.category.charAt(0).toUpperCase() + item.category.slice(1).toLowerCase();
            const actions = item.actions.map((perm: string) => perm.charAt(0).toUpperCase() + perm.slice(1).toLowerCase()).join(', ');
            return `${category}: ${actions}`;
          });
          const categoriesCount = data[col.key].length - 1;
          content =
            <>
              {formattedPermissions[0]}
              {categoriesCount > 0 && (
                <span className='text-action-success'>
                  {' '}
                  [+{categoriesCount} Categories]
                </span>
              )}
            </>
        } else if (col.key === 'actions') {
          content = (
            <DualButton
              leftAction={() => console.log('Edit')}
              rightAction={() => console.log('Delete')}
              leftIcon={<ModeEdit className='text-action-warning' />}
              rightIcon={<Delete className='text-action-error' />}
              isDark={isDark}
              onCard
            />
          );
        } else if (col.key === 'color') {
          content = (
            <span className='px-2 py-1 rounded' style={{ color: data[col.key] }}>
              {data[col.key]}
            </span>
          );
        }

        return (
          <td key={col.key} className="py-[1.15rem] px-5 text-sm">
            {content}
          </td>
        );
      })}
    </tr>
  );
};
