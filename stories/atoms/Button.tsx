import React from 'react';

export interface ButtonProps {
  isDark?: boolean;
  isSubmit?: boolean;
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit';
  label?: string;
  onClick?: () => void;
}

export const Button = ({
  isDark = false,
  isSubmit = false,
  size = 'medium',
  type = 'button',
  label,
  ...props
}: ButtonProps) => {
  const color = isSubmit ? 'bg-primary-600 text-white-50' : isDark ? 'bg-action-error text-white' : 'bg-action-error/20 text-action-error';
  const hover = isSubmit ? 'hover:bg-primary-800' : isDark ? 'hover:bg-action-error' : 'hover:bg-action-error/40';

  const sizes = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg',
  };

  return (
    <button
      type={type}
      className={`px-5 py-3 ${color} rounded-md duration-500 font-bold ${sizes[size]} ${hover}`}
      {...props}
    >
      {label}
    </button>
  );
};
