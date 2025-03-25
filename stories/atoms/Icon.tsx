import React from 'react';
import * as MuiIcons from "@mui/icons-material";

export interface IconProps {
  isDark: boolean;
  color: string;
  icon: string;
}

export const Icon = ({
  isDark,
  color,
  icon,
}: IconProps) => {
  const bgColor = isDark ? `bg-[${color}]` : `bg-[${color}]/20`;
  const textColor = isDark ? `text-white-50` : `text-[${color}]`;

  const IconComponent = icon ? MuiIcons[icon as keyof typeof MuiIcons] : null;

  return (
    <div className={`p-3 rounded-2xl ${bgColor}`}>
      {IconComponent && <IconComponent fontSize="large" className={textColor} />}
    </div>
  );
} 
