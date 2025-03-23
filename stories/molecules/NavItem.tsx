'use client';

import React from 'react';
import * as MuiIcons from "@mui/icons-material";
import { Title } from '@atoms/Title';

export interface NavItemProps {
  isDark?: boolean;
  isSelect?: boolean;
  label?: string;
  icon?: string;
  onClick?: () => void;
}

export const NavItem = ({ isDark = false, isSelect = false, label, icon, onClick }: NavItemProps) => {
  const baseTextColor = isDark ? "text-white-50" : "text-black-950";
  const hoverTextColor = isSelect ? "text-white-50" : "group-hover:text-white-50";
  const textColor = `${baseTextColor} ${hoverTextColor}`;
  const bgColor = isSelect ? 'bg-primary-600 text-white-50' : "group-hover:bg-primary-400";

  const IconComponent = icon ? MuiIcons[icon as keyof typeof MuiIcons] : null;

  return (
    <div className="group flex gap-6 items-stretch mr-6 cursor-pointer" onClick={onClick}>
      <div className={`w-2 rounded-r-lg ${bgColor}`}></div>

      <div className={`w-full px-5 py-3 rounded-lg flex gap-5 items-center ${bgColor}`}>
        {IconComponent && <IconComponent fontSize="medium" className={textColor} />}
        <Title isDark={isDark} isSelect={isSelect} size="smallest" isNav>{label}</Title>
      </div>
    </div>
  );
};
