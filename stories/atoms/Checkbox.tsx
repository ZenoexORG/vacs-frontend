import React from 'react';

export interface CheckboxProps {
  isDark?: boolean;
  checked?: boolean;
  id?: string;
  onChange?: (checked: boolean) => void;
}

export const Checkbox = ({
  isDark = false,
  checked = false,
  id,
  onChange
}: CheckboxProps) => {
  return (
    <label className={`relative w-12 h-6 flex items-center cursor-pointer`}>
      <input
        type="checkbox"
        id={id}
        name={id}
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        className="sr-only"
      />

      <div
        className={`
          w-full h-full rounded-full transition
          ${checked ? 'bg-primary-600/30' : isDark ? "bg-dark-900" : "bg-black-50"}
        `}
      />

      <div
        className={`
          absolute left-1 top-1 w-4 h-4 rounded-full transition-transform transform
          ${checked ? "translate-x-6 bg-primary-600" : isDark ? "bg-dark-950" : "bg-white-50"}
        `}
      />
    </label>
  );
};

