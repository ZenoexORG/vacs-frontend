import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import React from 'react';

export interface DualButtonProps {
  isDark?: boolean;
  leftAction?: () => void;
  rightAction?: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onCard?: boolean;
}

export const DualButton = ({
  isDark = false,
  leftAction,
  rightAction,
  leftIcon,
  rightIcon,
  onCard,
}: DualButtonProps) => {
  const colors =
    onCard
      ? isDark
        ? 'bg-dark-700 text-white-50'
        : 'bg-dark-50 text-black-950'
      : isDark
        ? 'bg-dark-800 text-white-50'
        : 'bg-white-50 text-black-950'

  const hovers =
    onCard
      ? isDark
        ? 'hover:bg-dark-600'
        : 'hover:bg-dark-100'
      : isDark
        ? 'hover:bg-dark-700'
        : 'hover:bg-white-100';

  return (
    <div
      className={`flex items-stretch rounded-lg border border-black-300/40 justify-between ${colors}`}
    >
      <button
        onClick={leftAction}
        className={`flex items-center w-full justify-center py-1 px-2 ${hovers} rounded-l-lg ease-in-out duration-500`}
      >
        {leftIcon || <ChevronLeft />}
      </button>

      <div className='w-px self-stretch bg-black-300/40' />

      <button
        onClick={rightAction}
        className={`flex items-center w-full justify-center py-1 px-2 ${hovers} rounded-r-lg ease-in-out duration-500`}
      >
        {rightIcon || <ChevronRight />}
      </button>
    </div>
  );
};
