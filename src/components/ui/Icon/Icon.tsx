import React from 'react';
import { IconName, iconPaths } from './icons';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number | string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, size = 20, className = '', ...props }) => {
  const IconComponent = iconPaths[name];

  if (!IconComponent) {
    return null;
  }

  return (
    <span
      className={`icon-wrapper ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        flexShrink: 0,
      }}
    >
      <IconComponent width={size} height={size} {...props} />
    </span>
  );
};
