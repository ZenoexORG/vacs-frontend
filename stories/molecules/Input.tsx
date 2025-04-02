import React from 'react';

export interface InputProps {
  isDark?: boolean;
  label?: string;
  type?: 'text' | 'email' | 'password';
  id?: string;
  placeholder?: string;
  onCard?: boolean;
}

export const Input = ({
  isDark = false,
  label,
  id,
  type = 'text',
  placeholder,
  onCard,
  ...props
}: InputProps) => {
  const color =
    onCard
      ? isDark
        ? 'bg-dark-800 placeholder:text-white-300'
        : 'bg-white-50 placeholder:text-black-500'
      : isDark
        ? 'bg-dark-900 placeholder:text-white-300'
        : 'bg-black-50 placeholder:text-black-500'

  return (
    <input
      type={type}
      id={id}
      name={id}
      placeholder={placeholder}
      className={`px-5 py-3 rounded-md ${color}`}
      {...props}
    />
  );
};
