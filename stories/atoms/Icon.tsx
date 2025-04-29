import React from 'react';
import * as MuiIcons from "@mui/icons-material";
import hexToRGBA from '../../shared/functions/hexToRBGA';

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
  const bgColor = isDark ? color : hexToRGBA(color, 0.3);
  const textColor = isDark ? `#FFF` : color;

  const IconComponent = icon ? MuiIcons[icon as keyof typeof MuiIcons] : null;

  return (
    <div className='p-3 rounded-2xl' style={{ backgroundColor: bgColor }}>
      {IconComponent && <IconComponent fontSize="large" style={{ color: textColor }} />}
    </div>
  );
} 
