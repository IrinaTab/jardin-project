// src/pages/AboutPage/AboutPage.tsx

import React, { useState, useMemo } from 'react';
import './AboutPage.css';
import { PageType, GalleryItem, VideoItem } from '../../types';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useLanguage } from '../../context/LanguageContext';
import { useModal } from '../../context/ModalContext';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { CTABanner } from '../../components/sections/CTA';
import { SocialSubscribeBanner } from '../../components/sections/SocialSubscribeBanner';
import { Icon } from '../../components/ui/Icon';

export interface AboutPageProps {
  onNavigate: (page: PageType) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  // ← ОДИН вызов useModal() со всеми нужными методами
  const { openPhotoModal, openVideoModal, openRequestModal } = useModal();
  useDocumentTitle(t.aboutPage.title);

  const [photoError, setPhotoError] = useState(false);

  /**
   * Фото мастерской — открывается в PhotoModal по клику.
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
      hideOrderButton: true,
    }),
    []
  );

  /**
   * Видео процесса — открывается в VideoModal по клику.
   */
  const processVideo: VideoItem = useMemo(
    () => ({
      id: 'atelier-process-video',
      videoUrl: '/videos/atelier-process.mp4',
      posterUrl: '/videos/atelier-process-poster.webp',
      title: {
        ru: 'Видео процесса',
        en: 'Process Video',
        es: 'Vídeo del Proceso',
      },
      description: {
        ru: 'Как создаётся постижерное изделие: от подбора волос до финальной тамбуровки.',
        en: 'How a postiche piece is made: from hair selection to final hand-ventilation.',
        es: 'Cómo se elabora una pieza posticera: desde la selección del cabello hasta la ventilación final.',
      },
    }),
    []
  );

  /**
   * Фото «Детали работы» — открывается в PhotoModal по клику.
   */
  const detailsPhoto: GalleryItem = useMemo(
    () => ({
      id: 'atelier-details-photo',
      imageUrl: '/images/atelier-details.webp',
      category: 'custom',
      title: {
        ru: 'Детали работы',
        en: 'Work Details',
        es: 'Detalles del Trabajo',
      },
      description: {
        ru: 'Крупный план: ручная тамбуровка, микро-сетка, инструменты мастера. Именно из этих мельчайших деталей складывается качество изделия.',
        en: 'Close-up: hand ventilation, micro-lace, master\'s tools. The smallest details shape the quality of every piece.',
        es: 'Primer plano: ventilación a mano, micro-tul, herramientas de la maestra. Los detalles más pequeños forman la calidad de cada pieza.',
      },
      hideOrderButton: true,
    }),
    []
  );

  const handleOpenAtelierPhoto = () => openPhotoModal(atelierPhoto);
  const handleOpenProcessVideo = () => openVideoModal(processVideo);
  const handleOpenDetailsPhoto = () => openPhotoModal(detailsPhoto);

  return (
    <div className="about-page fade-in">
      {/* ============================================
          HERO + ОСНОВНОЙ КОНТЕНТ
          ============================================ */}
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
            {/* ЛЕВАЯ КОЛОНКА — фото мастера + блок подписки */}
            <div className="about-left-col">
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

              <div className="about-subscribe">
                <SocialSubscribeBanner />
              </div>
            </div>

            {/* ПРАВАЯ КОЛОНКА — заголовок, стандарты, текст */}
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

      {/* ============================================
          ЦЕННОСТИ
          ============================================ */}
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

      {/* ============================================
          МАСТЕРСКАЯ — фото мастерской, видео, детали
          ============================================ */}
      <section className="section about-showcase-section">
        <div className="container">
          <SectionHeader
            badge={t.aboutPage.showcaseBadge}
            title={t.aboutPage.showcaseTitle}
            subtitle={t.aboutPage.showcaseSubtitle}
          />

          <div className="about-showcase__grid">
            {/* 1. Фото мастерской */}
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

            {/* 2. Видео процесса */}
            <div
              className="about-showcase__photo"
              onClick={handleOpenProcessVideo}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpenProcessVideo();
                }
              }}
              aria-label={t.aboutPage.showcase2}
            >
              <div className="about-showcase__photo-glow" aria-hidden />
              <video
                className="about-showcase__photo-img"
                src="/videos/atelier-process.mp4"
                poster="/videos/atelier-process-poster.webp"
                muted
                playsInline
                preload="metadata"
                aria-hidden
              />
              <div className="about-showcase__play-btn" aria-hidden>
                <Icon name="play" size={28} />
              </div>
              <div className="about-showcase__photo-caption">
                {t.aboutPage.showcase2}
              </div>
            </div>

            {/* 3. Фото деталей работы */}
            <div
              className="about-showcase__photo"
              onClick={handleOpenDetailsPhoto}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpenDetailsPhoto();
                }
              }}
              aria-label={t.gallery.zoomPhoto}
            >
              <div className="about-showcase__photo-glow" aria-hidden />
              <img
                src="/images/atelier-details.webp"
                alt={t.aboutPage.showcase3}
                className="about-showcase__photo-img"
                loading="lazy"
                decoding="async"
              />
              <button
                type="button"
                className="about-showcase__zoom-btn"
                aria-label={t.gallery.zoomPhoto}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenDetailsPhoto();
                }}
              >
                <Icon name="zoom" size={16} />
              </button>
              <div className="about-showcase__photo-caption">
                {t.aboutPage.showcase3}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        onOrderClick={() => onNavigate('calculator')}
        onContactClick={() => openRequestModal(t.contacts.formTitle, 'question')}
      />
    </div>
  );
};