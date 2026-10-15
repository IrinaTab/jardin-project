// src/components/ui/GalleryItem/GalleryItem.tsx

import React, { useState } from 'react';
import './GalleryItem.css';
import { GalleryItem as GalleryItemType } from '../../../types';
import { useLanguage } from '../../../context/LanguageContext';
import { useLazyVisible } from '../../../hooks/useLazyVisible';
import { Icon } from '../Icon';
import { cn } from '../../../utils/cn';

export interface GalleryItemProps {
  item: GalleryItemType;
  onClick: (item: GalleryItemType) => void;
  className?: string;
}

export const GalleryItem: React.FC<GalleryItemProps> = ({
  item,
  onClick,
  className = '',
}) => {
  const { language } = useLanguage();
  const [hasError, setHasError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Картинка грузится только когда карточка попадает в viewport
  const [ref, isVisible] = useLazyVisible<HTMLDivElement>(0.1, true);

  // Клик по самой карточке (не на кнопках) — открывает модалку
  const handleCardClick = () => {
    onClick(item);
  };

  // Клик по кнопке «раскрыть» — не открывает модалку, а разворачивает текст
  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded((v) => !v);
  };

  return (
    <div
      ref={ref}
      className={cn(
        'gallery-card',
        isExpanded && 'gallery-card--expanded',
        className
      )}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleCardClick();
        }
      }}
    >
      {isVisible && !hasError ? (
        <img
          src={item.imageUrl}
          alt={item.title[language]}
          className="gallery-card__img"
          loading="lazy"
          decoding="async"
          onError={() => setHasError(true)}
        />
      ) : hasError ? (
        <div className="gallery-card__fallback">
          <Icon name="sparkles" size={36} />
        </div>
      ) : (
        <div className="gallery-card__skeleton" aria-hidden />
      )}

      <button
        type="button"
        className="gallery-card__zoom-btn"
        aria-label="Увеличить фото"
        onClick={(e) => {
          e.stopPropagation();
          onClick(item);
        }}
      >
        <Icon name="zoom" size={16} />
      </button>

      <div className="gallery-card__overlay">
        <h4 className="gallery-card__title">{item.title[language]}</h4>
        <p className="gallery-card__desc">{item.description[language]}</p>

        <button
          type="button"
          className="gallery-card__expand-btn"
          onClick={handleToggleExpand}
          aria-label={isExpanded ? 'Свернуть описание' : 'Раскрыть описание'}
          aria-expanded={isExpanded}
        >
          <Icon name="chevronDown" size={18} />
        </button>
      </div>
    </div>
  );
};