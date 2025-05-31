import React, { ReactNode, forwardRef, Ref, MouseEventHandler } from 'react';

export interface CardProps {
  isDark?: boolean;
  children?: ReactNode;
  space?: number;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>; // ✅ añadir esto
}

export const Card = forwardRef<HTMLDivElement, CardProps>((
  {
    isDark = false,
    children,
    space = 0,
    size = 'medium',
    className,
    onClick, // ✅ recibirlo como prop
  },
  ref: Ref<HTMLDivElement>
) => {
  const color = isDark ? 'bg-dark-900' : 'bg-white-50';

  const sizes = {
    small: 'p-3 gap-3',
    medium: 'p-5 gap-5',
    large: 'p-10 gap-10',
  };

  return (
    <div
      ref={ref}
      onClick={onClick} // ✅ pasarlo al div
      className={`${sizes[size]} ${color} rounded-lg flex flex-col ${className}`}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

