// src/pages/AboutPage/AboutPage.tsx

import React, { useState } from 'react';
import './AboutPage.css';
import { PageType } from '../../types';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useLanguage } from '../../context/LanguageContext';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { CTABanner } from '../../components/sections/CTA';

export interface AboutPageProps {
  onNavigate: (page: PageType) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  useDocumentTitle(t.aboutPage.title);

  const [photoError, setPhotoError] = useState(false);

  return (
    <div className="about-page fade-in">
      <section className="section about-main-section">
        <div className="container">
          {/* HERO — заголовок страницы */}
          <div className="about-hero">
            <SectionHeader
              badge={t.aboutPage.badge}
              title={t.aboutPage.title}
              subtitle={t.aboutPage.subtitle}
            />
          </div>

          {/* MAIN GRID — фото слева (туманный бордер), контент справа */}
          <div className="about-main-grid">
            {/* ЛЕВАЯ КОЛОНКА — фото мастера с туманным бордером */}
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

            {/* ПРАВАЯ КОЛОНКА — заголовок, стандарты, текст */}
            <div className="about-content">
              <h3 className="about-content__heading">
                {t.aboutPage.heading}
              </h3>

              {/* Карточка стандартов */}
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

              {/* Текстовые абзацы */}
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

      {/* ПЛЕЙСХОЛДЕР — мастерская */}
      <section className="section about-showcase-section">
        <div className="container">
          <SectionHeader
            badge={t.aboutPage.showcaseBadge}
            title={t.aboutPage.showcaseTitle}
            subtitle={t.aboutPage.showcaseSubtitle}
          />

          <div className="about-showcase__grid">
            <div className="about-showcase__placeholder">
              <span>{t.aboutPage.showcase1}</span>
            </div>
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