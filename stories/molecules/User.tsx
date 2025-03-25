'use client';

import React from 'react';
import { Title } from '@atoms/Title';
import { Logo } from '@atoms/Logo';
import { Text } from '@atoms/Text';

export interface UserProps {
  isDark?: boolean;
  logo: string;
  height: number;
  width: number;
  alt: string
  name?: string;
  role?: string;
}

export const User = ({
  isDark = false,
  logo,
  height,
  width,
  alt,
  name,
  role,
}: UserProps) => {
  return (
    <div className="flex gap-4 items-center">
      <Logo
        alt={alt || 'Logo'}
        src={logo}
        width={width}
        height={height}
        className="rounded-full"
      />

      <div className='flex flex-col gap-0.5'>
        <Title isDark={isDark} size="small">{name}</Title>
        <Text isDark={isDark} size="smallest">{role}</Text>
      </div>
    </div>
  );
};
