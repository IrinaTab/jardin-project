// src/pages/AboutPage/AboutPage.tsx

import React, { useState, useMemo } from 'react';
import './AboutPage.css';
import { PageType, GalleryItem } from '../../types';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useLanguage } from '../../context/LanguageContext';
import { useModal } from '../../context/ModalContext';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { CTABanner } from '../../components/sections/CTA';
import { Icon } from '../../components/ui/Icon';

export interface AboutPageProps {
  onNavigate: (page: PageType) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const { openPhotoModal } = useModal();
  useDocumentTitle(t.aboutPage.title);

  const [photoError, setPhotoError] = useState(false);

  /**
   * Объект, совместимый с `GalleryItem` — передаётся в `PhotoModal`
   * при клике на фото мастерской.
   */
  const atelierPhoto: GalleryItem = useMemo(
    () => ({
      id: 'atelier-photo',
      imageUrl: '/images/atelier.webp',
      category: 'custom',
      title: {
        ru: 'Мастерская Jardin',
        en: 'Jardin Workshop',
        es: 'Taller Jardin',
      },
      description: {
        ru: 'Рабочее пространство ателье: инструменты, палитры, эскизы и готовые изделия. Здесь рождается каждая работа.',
        en: 'The atelier workspace: tools, palettes, sketches and finished pieces. Every creation is born here.',
        es: 'El espacio de trabajo del atelier: herramientas, paletas, bocetos y piezas terminadas. Cada obra nace aquí.',
      },
      hideOrderButton: true
    }),

    []
  );

  const handleOpenAtelierPhoto = () => {
    openPhotoModal(atelierPhoto);
  };

  return (
    <div className="about-page fade-in">
      <section className="section about-main-section">
        <div className="container">
          <div className="about-hero">
            <SectionHeader
              badge={t.aboutPage.badge}
              title={t.aboutPage.title}
              subtitle={t.aboutPage.subtitle}
            />
          </div>

          <div className="about-main-grid">
            <div className="about-photo">
              <div className="about-photo__glow" aria-hidden />
              {!photoError ? (
                <img
                  src="/images/master.webp"
                  alt="Мастер ателье Jardin"
                  className="about-photo__img"
                  loading="lazy"
                  decoding="async"
                  onError={() => setPhotoError(true)}
                />
              ) : (
                <div className="about-photo__placeholder">
                  <span>Фото мастера</span>
                  <span className="about-photo__placeholder-hint">
                    /images/master.webp
                  </span>
                </div>
              )}
            </div>

            <div className="about-content">
              <h3 className="about-content__heading">
                {t.aboutPage.heading}
              </h3>

              <div className="about-standards-card">
                <h4 className="about-standards-card__title">
                  {t.aboutPage.standardsTitle}
                </h4>
                <div className="about-standards-card__list">
                  <div className="about-standards-card__item">
                    <strong>{t.aboutPage.standard1Label}</strong>
                    <span>{t.aboutPage.standard1}</span>
                  </div>
                  <div className="about-standards-card__item">
                    <strong>{t.aboutPage.standard2Label}</strong>
                    <span>{t.aboutPage.standard2}</span>
                  </div>
                  <div className="about-standards-card__item">
                    <strong>{t.aboutPage.standard3Label}</strong>
                    <span>{t.aboutPage.standard3}</span>
                  </div>
                </div>
              </div>

              <div className="about-content__text">
                <p>{t.aboutPage.p1}</p>
                <p>{t.aboutPage.p2}</p>
                <p>{t.aboutPage.p3}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ЦЕННОСТИ */}
      <section className="section about-values-section">
        <div className="container">
          <div className="about-values-list">
            <div className="about-value-item">
              <h4>{t.aboutPage.value1Title}</h4>
              <p>{t.aboutPage.value1Text}</p>
            </div>
            <div className="about-value-item">
              <h4>{t.aboutPage.value2Title}</h4>
              <p>{t.aboutPage.value2Text}</p>
            </div>
            <div className="about-value-item">
              <h4>{t.aboutPage.value3Title}</h4>
              <p>{t.aboutPage.value3Text}</p>
            </div>
          </div>
        </div>
      </section>

      {/* МАСТЕРСКАЯ — фото с zoom + плейсхолдеры */}
      <section className="section about-showcase-section">
        <div className="container">
          <SectionHeader
            badge={t.aboutPage.showcaseBadge}
            title={t.aboutPage.showcaseTitle}
            subtitle={t.aboutPage.showcaseSubtitle}
          />

          <div className="about-showcase__grid">
            {/* Фото мастерской — кликабельно, открывается в PhotoModal */}
            <div
              className="about-showcase__photo"
              onClick={handleOpenAtelierPhoto}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpenAtelierPhoto();
                }
              }}
              aria-label={t.gallery.zoomPhoto}
            >
              <div className="about-showcase__photo-glow" aria-hidden />
              <img
                src="/images/atelier.webp"
                alt={t.aboutPage.showcase1}
                className="about-showcase__photo-img"
                loading="lazy"
                decoding="async"
              />

              {/* Кнопка-лупа — как в галерее */}
              <button
                type="button"
                className="about-showcase__zoom-btn"
                aria-label={t.gallery.zoomPhoto}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenAtelierPhoto();
                }}
              >
                <Icon name="zoom" size={16} />
              </button>

              <div className="about-showcase__photo-caption">
                {t.aboutPage.showcase1}
              </div>
            </div>

            {/* Плейсхолдеры для будущих фото и видео */}
            <div className="about-showcase__placeholder">
              <span>{t.aboutPage.showcase2}</span>
            </div>
            <div className="about-showcase__placeholder">
              <span>{t.aboutPage.showcase3}</span>
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        onOrderClick={() => onNavigate('calculator')}
        onContactClick={() => onNavigate('contacts')}
      />
    </div>
  );
};