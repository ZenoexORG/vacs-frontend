import React from 'react';

export interface BadgeProps {
  isDark?: boolean;
  color: string;
  size?: 'small' | 'medium' | 'large';
  label?: string;
}

const hexToRGBA = (hex: string, alpha: number) => {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

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
      {label}
    </span>
  );
};
