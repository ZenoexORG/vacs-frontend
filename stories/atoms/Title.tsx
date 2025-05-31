import React, { ReactNode } from 'react';

export interface TitleProps {
  isDark?: boolean;
  isNav?: boolean;
  size?: 'small' | 'medium' | 'large' | 'smallest' | 'largest' | '2xl' | '3xl';
  isSelect?: boolean;
  children?: ReactNode;
  className?: string;
}

export const Title = ({
  isDark = false,
  size = 'medium',
  isNav = false,
  isSelect,
  children,
  className,
  ...props
}: TitleProps) => {
  const styles =
    isNav && isSelect
      ? 'font-bold text-white-50'
      : isDark
        ? 'font-bold text-white-50'
        : 'font-bold text-black-950 group-hover:text-white-50';

  const sizes = {
    smallest: 'text-xs',
    small: 'text-sm',
    medium: '',
    large: 'text-lg',
    largest: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
  };

  return (
    <h2 className={`${sizes[size]} ${styles} ${className}`} {...props}>
      {children}
    </h2>
  );
};
