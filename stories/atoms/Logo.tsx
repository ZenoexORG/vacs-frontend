import Image from 'next/image';
import React from 'react';

export interface LogoProps {
  alt: string;
  src: string;
  width?: number;
  height?: number;
  className?: string;
}

export const Logo = ({
  alt,
  src,
  width,
  height,
  className,
}: LogoProps) => {
  return (
    <Image
      alt={alt}
      src={src}
      width={width}
      height={height}
      className={className}
    />
  );
};
