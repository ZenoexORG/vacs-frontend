import React from 'react';

export interface OptionProps {
  label?: string;
  value?: string;
  isDark?: boolean;
}

export const Option = ({
  label,
  value,
  isDark = false,
}: OptionProps) => {
  const color = isDark ? 'text-white' : 'text-black';

  return (
    <option value={value} className={`${color}`}>
      {label}
    </option>
  );
};
