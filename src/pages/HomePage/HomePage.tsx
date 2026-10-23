// src/pages/HomePage/HomePage.tsx

import React from 'react';
import { PageType } from '../../types';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useLanguage } from '../../context/LanguageContext';
import { useModal } from '../../context/ModalContext';
import { Hero } from '../../components/sections/Hero';
import { AdvantagesSection } from '../../components/sections/Advantages';
import { CalculatorTeaser } from '../../components/sections/CalculatorTeaser';
import { GallerySection } from '../../components/sections/Gallery';
import { CTABanner } from '../../components/sections/CTA';

export interface HomePageProps {
  onNavigate: (page: PageType) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  useDocumentTitle(t.nav.home, t.hero.subtitle);
  const { openRequestModal } = useModal();

  return (
    <div className="home-page fade-in">
      <Hero
        onOrderClick={() => onNavigate('calculator')}
        onShopClick={() => onNavigate('gallery')}
      />

      <AdvantagesSection />

      <CalculatorTeaser onOpenCalculator={() => onNavigate('calculator')} />

      <GallerySection isPreview onViewAllClick={() => onNavigate('gallery')} />

      <CTABanner
        onOrderClick={() => onNavigate('calculator')}
        onContactClick={() => openRequestModal(t.contacts.formTitle, 'question')}
      />
    </div>
  );
};