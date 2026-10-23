// src/pages/GalleryPage/GalleryPage.tsx

import React from 'react';
import './GalleryPage.css';
import { PageType } from '../../types';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useLanguage } from '../../context/LanguageContext';
import { useModal } from '../../context/ModalContext';   // ← добавлен импорт
import { GallerySection } from '../../components/sections/Gallery';
import { SocialSubscribeBanner } from '../../components/sections/SocialSubscribeBanner';
import { CTABanner } from '../../components/sections/CTA';

export interface GalleryPageProps {
  onNavigate: (page: PageType) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const { openRequestModal } = useModal();
  useDocumentTitle(t.nav.gallery);

  return (
    <div className="gallery-page fade-in">
      <div className="gallery-page__intro">
        <div className="container">
          <p className="gallery-page__label">
            {t.galleryPage.label}
          </p>
        </div>
      </div>

      <GallerySection isPreview={false} />

      <div className="section">
        <SocialSubscribeBanner />
      </div>

      <CTABanner
        onOrderClick={() => onNavigate('calculator')}
        onContactClick={() => openRequestModal(t.contacts.formTitle, 'question')}
      />
    </div>
  );
};