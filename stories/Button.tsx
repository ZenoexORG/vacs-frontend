import React from 'react';

export interface ButtonProps {
  isSubmit?: boolean;
  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick?: () => void;
}

export const Button = ({
  isSubmit = false,
  size = 'medium',
  label,
  ...props
}: ButtonProps) => {
  const color = isSubmit ? 'bg-primary-600 text-white' : 'bg-action-error/20 text-action-error';

  const sizes = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  return (
    <button
      type="button"
      className={`${color} font-bold ${sizes[size]} rounded-md`}
      {...props}
    >
      {label}
    </button>
  );
};
