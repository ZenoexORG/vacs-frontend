import React, { ReactNode } from 'react';

export interface CardProps {
  isDark?: boolean;
  children?: ReactNode;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const Card = ({
  isDark = false,
  children,
  size = 'medium',
  className,
}: CardProps) => {
  const color = isDark ? 'bg-dark-900' : 'bg-white-50';

  const sizes = {
    small: 'p-3 gap-3',
    medium: 'p-5 gap-5',
    large: 'p-10 gap-10',
  };

  return (
    <div className={`${sizes[size]} ${color} rounded-lg flex flex-col ${className}`}>
      {children}
    </div>
  );
};
