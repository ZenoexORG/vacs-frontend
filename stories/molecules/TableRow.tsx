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
  onEdit?: () => void;
  onDelete?: () => void;
}

const formatDate = (dateStr: string) => {
  const [day, month, year] = dateStr.split('-');
  const date = new Date(`${year}-${month}-${day}`);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const TableRow = ({ data, columns, isDark = false, onEdit, onDelete }: TableRowProps) => {
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
          const groupedPermissions: Record<string, Set<string>> = {};

          data[col.key].forEach((perm: string) => {
            const [category, action] = perm.split(':');

            if (!groupedPermissions[category]) {
              groupedPermissions[category] = new Set();
            }

            groupedPermissions[category].add(action);
          });

          const categories = Object.keys(groupedPermissions);

          if (categories.length > 0) {
            const firstCategory = categories[0];

            const formattedCategory = firstCategory.charAt(0).toUpperCase() + firstCategory.slice(1).toLowerCase();
            const formattedActions = Array.from(groupedPermissions[firstCategory])
              .map((action) => action.charAt(0).toUpperCase() + action.slice(1).toLowerCase())
              .join(', ');

            const remainingCategoriesCount = categories.length - 1;

            content = (
              <>
                {formattedCategory}: {formattedActions}
                {remainingCategoriesCount > 0 && (
                  <span className='text-action-success'> [+{remainingCategoriesCount} Categories]</span>
                )}
              </>
            );
          } else {
            content = <span className='text-muted'>No permissions</span>;
          }
        } else if (col.key === 'soat') {
          content = (
            <>
              {formatDate(data[col.key])}
            </>
          )
        } else if (col.key === 'actions') {
          content = (
            <DualButton
              leftAction={onEdit}
              rightAction={onDelete}
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
