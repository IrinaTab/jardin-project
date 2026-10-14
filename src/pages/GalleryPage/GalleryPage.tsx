// src/pages/GalleryPage/GalleryPage.tsx

import React from 'react';
import './GalleryPage.css';
import { PageType } from '../../types';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useLanguage } from '../../context/LanguageContext';
import { GallerySection } from '../../components/sections/Gallery';
import { CTABanner } from '../../components/sections/CTA';

export interface GalleryPageProps {
  onNavigate: (page: PageType) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  useDocumentTitle(t.nav.gallery);

  return (
    <div className="gallery-page fade-in">
      <div className="gallery-page__intro">
        <div className="container">
          <p className="gallery-page__label">
            Эксклюзивные авторские работы
          </p>
        </div>
      </div>

      <GallerySection isPreview={false} />

      <CTABanner
        onOrderClick={() => onNavigate('calculator')}
        onContactClick={() => onNavigate('contacts')}
      />
    </div>
  );
};