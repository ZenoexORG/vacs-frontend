import Image from 'next/image';
import React from 'react';

export interface LogoProps {
  alt: string;
  src: string;
  width?: number;
  height?: number;
}

export const Logo = ({
  alt,
  src,
  width,
  height,
  ...props
}: LogoProps) => {
  return (
    <Image
      alt={alt}
      src={src}
      width={width}
      height={height}
      {...props}
    />
  );
};
