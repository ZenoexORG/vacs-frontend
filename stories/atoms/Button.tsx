import React from 'react';

export interface ButtonProps {
  isDark?: boolean;
  isSubmit?: boolean;
  isCancel?: boolean;
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit';
  label?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  isOutline?: boolean;
  className?: string;
}

export const Button = ({
  isDark = false,
  isOutline = false,
  isSubmit = false,
  isCancel,
  size = 'medium',
  label,
  children,
  className,
  onClick,
}: ButtonProps) => {
  const bgColor =
    isSubmit
      ? 'bg-primary-600 text-white-50 hover:bg-primary-800'
      : isCancel
        ? isDark
          ? 'bg-action-error text-white hover:bg-action-error'
          : 'bg-action-error/20 text-action-error hover:bg-action-error/40'
        : isOutline
          ? isDark
            ? 'text-white-300 border border-white-200'
            : 'text-white-400 border border-white-200'
          : isDark
            ? 'bg-dark-700 text-white'
            : 'bg-black-50 text-black-500';

  const sizes = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-5 py-3',
    large: 'px-6 py-4 text-lg',
  };

  return (
    <button
      type={isSubmit ? 'submit' : 'button'}
      className={`flex items-center justify-center gap-3 rounded-md duration-500 font-bold ${sizes[size]} ${bgColor} ${className}`}
      onClick={onClick}
    >
      {label || children}
    </button>
  );
};
