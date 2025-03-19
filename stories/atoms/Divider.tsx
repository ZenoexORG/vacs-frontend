import React from 'react';

export interface DividerProps {
  isDark?: boolean;
}

export const Divider = ({
  isDark = false,
}: DividerProps) => {
  const color = isDark ? 'bg-dark-950' : 'bg-white-100';

  return (
    <div className={`w-full mt-3 h-0.5 rounded-lg ${color}`}></div>
  );
};
