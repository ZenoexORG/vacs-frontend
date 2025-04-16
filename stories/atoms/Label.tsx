import React from 'react';

export interface LabelProps {
  isDark?: boolean;
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit';
  htmlFor?: string;
  label?: string;
  onClick?: () => void;
}

function toCamelCase(text: string) {
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export const Label = ({
  isDark = false,
  size = 'medium',
  type = 'button',
  htmlFor,
  label,
  ...props
}: LabelProps) => {
  const color = isDark ? 'text-white-200' : 'text-black-800';

  const sizes = {
    small: 'text-xs',
    medium: 'text-sm',
    large: '',
  };

  return (
    <label
      htmlFor={htmlFor}
      className={`pl-5 ${color} ${sizes[size]}`}
      {...props}
    >
      {toCamelCase(label || '')}
    </label>
  );
};
