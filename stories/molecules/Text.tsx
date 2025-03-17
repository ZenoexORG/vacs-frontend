import { Logo } from '@atoms/Logo';
import React, { ReactNode } from 'react';

export interface TextProps {
  isDark?: boolean;
  textType?: string;
  href?: string;
  size?: 'small' | 'medium' | 'large';
  logo?: string;
  height?: number;
  width?: number;
  alt?: string;
  target?: string;
  children?: ReactNode;
}

export const Text = ({
  isDark = false,
  textType = 'normal',
  size = 'medium',
  logo,
  height,
  width,
  href,
  alt,
  target,
  children,
  ...props
}: TextProps) => {
  const color = textType === 'ref' ? 'text-primary-400 duration-500 hover:text-primary-600' : isDark ? 'text-white-200' : 'text-black-800';

  const sizes = {
    small: 'text-sm',
    medium: '',
    large: 'text-lg',
  };

  return (
    <>
      {textType === 'ref' ? (
        <a
          href={href}
          className={`flex gap-2 items-center ${color} ${sizes[size]}`}
          target={target}
          {...props}
        >
          {logo && <Logo alt={alt || 'Logo'} src={logo} width={width} height={height} className="rounded-full" />}
          {children}
        </a>
      ) : (
        <p
          className={`${color} ${sizes[size]}`}
          {...props}
        >
          {children}
        </p>
      )}
    </>
  );
};
