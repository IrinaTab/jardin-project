// src/components/sections/Gallery/GallerySection.tsx

import React from 'react';
import './GallerySection.css';
import { galleryItems } from '../../../data/gallery';
import { useLanguage } from '../../../context/LanguageContext';
import { useModal } from '../../../context/ModalContext';
import { SectionHeader } from '../../ui/SectionHeader';
import { GalleryItem } from '../../ui/GalleryItem';
import { Button } from '../../ui/Button';
import { Icon } from '../../ui/Icon';
import { cn } from '../../../utils/cn';

export interface GallerySectionProps {
  isPreview?: boolean;
  onViewAllClick?: () => void;
  className?: string;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  isPreview = false,
  onViewAllClick,
  className = '',
}) => {
  const { t } = useLanguage();
  const { openPhotoModal } = useModal();

  const displayedItems = isPreview ? galleryItems.slice(0, 3) : galleryItems;

  return (
    <section className={cn('section', className)} id="gallery">
      <div className="container">
        <SectionHeader
          badge={t.gallery.badge}
          title={t.gallery.title}
          subtitle={t.gallery.subtitle}
        />

        <div className="gallery-grid">
          {displayedItems.map((item) => (
            <GalleryItem
              key={item.id}
              item={item}
              onClick={(clicked) => openPhotoModal(clicked)}
            />
          ))}
        </div>

        {isPreview && onViewAllClick && (
          <div className="gallery-preview-footer">
            <Button
              variant="outline"
              size="lg"
              onClick={onViewAllClick}
              icon={<Icon name="arrowRight" size={18} />}
              iconPosition="right"
            >
              {t.gallery.viewMore}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};