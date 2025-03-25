import React, { ReactNode } from 'react';

export interface CardProps {
  isDark?: boolean;
  children?: ReactNode;
  space?: number;
}

export const Card = ({
  isDark = false,
  children,
  space = 3,
}: CardProps) => {
  const color = isDark ? 'bg-dark-900' : 'bg-white-50';

  return (
    <div className={`p-${space} ${color} rounded-lg flex flex-col gap-${space}`}>
      {children}
    </div>
  );
};
