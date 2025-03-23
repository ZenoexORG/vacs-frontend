import React, { ReactNode } from 'react';

export interface TitleProps {
  isDark?: boolean;
  isNav?: boolean;
  size?: 'small' | 'medium' | 'large' | 'smallest';
  isSelect?: boolean;
  children?: ReactNode;
}

export const Title = ({
  isDark = false,
  size = 'medium',
  isNav = false,
  isSelect,
  children,
  ...props
}: TitleProps) => {
  const baseColor =
    isDark
      ? 'text-white-200'
      : 'text-black-800 group-hover:text-white-50';

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
  };

  return (
    <h2 className={`duration-500 ease-in-out ${baseColor} ${sizes[size]} ${styles}`} {...props}>
      {children}
    </h2>
  );
};
