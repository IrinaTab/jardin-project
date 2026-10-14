// src/components/ui/Logo/Logo.tsx

import React from 'react';
import './Logo.css';
import { cn } from '../../../utils/cn';

export interface LogoProps {
    /** Колбэк при клике. Если не передан — рендерится как img без кнопки */
    onClick?: () => void;
    /** Дополнительные классы */
    className?: string;
    /** Alt-текст */
    alt?: string;
}

export const Logo: React.FC<LogoProps> = ({
    onClick,
    className = '',
    alt = 'Jardin — постижерное ателье',
}) => {
    const img = (
        <img
            src="/images/logo.svg"
            alt={alt}
            className="site-logo__img"
            width="685"
            height="382"
            decoding="async"
            fetchPriority="high"
        />
    );

    if (!onClick) {
        return <span className={cn('site-logo', className)}>{img}</span>;
    }

    return (
        <button
            type="button"
            className={cn('site-logo', className)}
            onClick={onClick}
            aria-label="На главную"
        >
            {img}
        </button>
    );
};