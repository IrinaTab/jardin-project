// src/components/ui/SectionHeader/SectionHeader.tsx

import React from 'react';
import './SectionHeader.css';
import { cn } from '../../../utils/cn';

export interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  /** 'light' — светлая 3D-капсула, 'dark' — тёмная 3D-капсула */
  variant?: 'light' | 'dark';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  subtitle,
  align = 'center',
  variant = 'light',
  className = '',
}) => {
  const isDark = variant === 'dark';

  return (
    <div
      className={cn(
        'section-header-wrap',
        align === 'left' && 'section-header-wrap--left',
        isDark && 'section-header-wrap--dark',
        className
      )}
    >
      {badge && (
        <div className={cn('section-header-tag', isDark && 'section-header-tag--dark')}>
          <span className="section-header-tag__text">{badge}</span>
        </div>
      )}

      <h2 className="section-header-title">
        <span className="gold-accent">{title}</span>
      </h2>

      {subtitle && <p className="section-header-desc">{subtitle}</p>}

      <div className="section-header-line" />
    </div>
  );
};