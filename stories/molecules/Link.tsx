import { Logo } from '../atoms/Logo';
import React, { ReactNode } from 'react';

export interface LinkProps {
  textType?: string;
  href?: string;
  size?: 'small' | 'medium' | 'large' | 'smallest';
  logo?: string;
  height?: number;
  width?: number;
  alt?: string;
  target?: string;
  children?: ReactNode;
}

export const Link = ({
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
}: LinkProps) => {
  const baseColor = 'text-primary-400 hover:text-primary-600'

  const sizes = {
    smallest: 'text-xs',
    small: 'text-sm',
    medium: '',
    large: 'text-lg',
  };

  return (
    <div className="flex gap-2 items-center">
      {logo && (
        <Logo
          alt={alt || 'Logo'}
          src={logo}
          width={width}
          height={height}
          className="rounded-full"
        />
      )}

      <a
        href={href}
        className={`${baseColor} ${sizes[size]}`}
        target={target}
        {...props}
      >
        {children}
      </a>
    </div>
  );
};
