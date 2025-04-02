import React, { ReactNode } from 'react';

export interface CardProps {
  isDark?: boolean;
  children?: ReactNode;
  space?: number;
  className?: string;
}

export const Card = ({
  isDark = false,
  children,
  space = 3,
  className,
}: CardProps) => {
  const color = isDark ? 'bg-dark-900' : 'bg-white-50';

  return (
    <div className={`p-${space} ${color} rounded-lg flex flex-col gap-${space} ${className}`}>
      {children}
    </div>
  );
};
