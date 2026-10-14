import React, { useState } from 'react';
import './GalleryItem.css';
import { GalleryItem as GalleryItemType } from '../../../types';
import { useLanguage } from '../../../context/LanguageContext';
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

  return (
    <div
      className={cn('gallery-card', className)}
      onClick={() => onClick(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(item);
        }
      }}
    >
      {!hasError ? (
        <img
          src={item.imageUrl}
          alt={item.title[language]}
          className="gallery-card__img"
          loading="lazy"
          onError={() => setHasError(true)}
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(circle, #222 0%, #0d0d0d 100%)',
            color: 'var(--color-gold)',
          }}
        >
          <Icon name="sparkles" size={36} />
        </div>
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
      </div>
    </div>
  );
};
