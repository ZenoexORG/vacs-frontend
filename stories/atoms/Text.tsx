import React, { ReactNode } from 'react';

export interface TextProps {
  isDark?: boolean;
  size?: 'small' | 'medium' | 'large' | 'smallest';
  children?: ReactNode;
  className?: string;
}

export const Text = ({
  isDark = false,
  size = 'medium',
  children,
  className = '',
}: TextProps) => {
  const baseColor =
    isDark
      ? 'text-white-200'
      : 'text-black-800 group-hover:text-white-50';

  const sizes = {
    smallest: 'text-xs',
    small: 'text-sm',
    medium: '',
    large: 'text-lg',
  };

  return (
    <div className="flex gap-2 items-center">
      <p className={`duration-500 ease-in-out ${baseColor} ${sizes[size]} ${className}`}>
        {children}
      </p>
    </div>
  );
};
