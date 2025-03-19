import { Logo } from '../atoms/Logo';
import React, { ReactNode } from 'react';

export interface TextProps {
  isDark?: boolean;
  textType?: string;
  href?: string;
  isNav?: boolean;
  size?: 'small' | 'medium' | 'large' | 'smallest';
  logo?: string;
  isSelect?: boolean;
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
  isNav = false,
  logo,
  height,
  isSelect,
  width,
  href,
  alt,
  target,
  children,
  ...props
}: TextProps) => {
  // Color base con hover dinámico
  const baseColor =
    textType === 'ref'
      ? 'text-primary-400 hover:text-primary-600'
      : isDark
        ? 'text-white-200'
        : 'text-black-800 group-hover:text-white-50';

  // Estilos condicionales
  const styles =
    isNav && isSelect
      ? 'font-bold text-white-50'
      : isDark
        ? 'font-bold text-white-50'
        : 'font-bold text-black-950 group-hover:text-white-50';

  // Tamaños de texto
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

      {textType === 'ref' ? (
        <a
          href={href}
          className={`${baseColor} ${sizes[size]} ${styles}`}
          target={target}
          {...props}
        >
          {children}
        </a>
      ) : (
        <p className={`duration-500 ease-in-out ${baseColor} ${sizes[size]} ${styles}`} {...props}>
          {children}
        </p>
      )}
    </div>
  );
};

