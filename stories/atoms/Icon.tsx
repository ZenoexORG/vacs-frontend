import React from 'react';
import * as MuiIcons from "@mui/icons-material";

export interface IconProps {
  isDark: boolean;
  color: string;
  icon: string;
}

const hexToRGBA = (hex: string, alpha: number) => {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const Icon = ({
  isDark,
  color,
  icon,
}: IconProps) => {
  const bgColor = isDark ? color : hexToRGBA(color, 0.3);
  const textColor = isDark ? `#FFF` : color;

  const IconComponent = icon ? MuiIcons[icon as keyof typeof MuiIcons] : null;

  return (
    <div className='p-3 rounded-2xl' style={{ backgroundColor: bgColor }}>
      {IconComponent && <IconComponent fontSize="large" style={{ color: textColor }} />}
    </div>
  );
} 
