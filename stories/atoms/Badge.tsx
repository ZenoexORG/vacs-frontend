import React from 'react';
import hexToRGBA from '../../shared/functions/hexToRBGA';
import toTitleCase from '../../shared/format/toTitleCase';

export interface BadgeProps {
  isDark?: boolean;
  color: string;
  size?: 'small' | 'medium' | 'large';
  label?: string;
}

export const Badge = ({
  isDark = false,
  size = 'medium',
  color,
  label,
  ...props
}: BadgeProps) => {
  const bgColor = isDark ? color : hexToRGBA(color, 0.3);
  const textColor = isDark ? `#FFF` : color;

  const sizes = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-5 py-3',
    large: 'px-6 py-4 text-lg',
  };

  return (
    <span
      className={`rounded-lg font-bold ${sizes[size]} flex items-center justify-center`}
      style={{ backgroundColor: bgColor, color: textColor }}
      {...props}
    >
      {label === 'utb' ? label.toUpperCase() : toTitleCase(label || '')}
    </span>
  );
};
