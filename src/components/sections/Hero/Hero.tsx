// src/components/sections/Hero/Hero.tsx

import React from 'react';
import './Hero.css';
import { useLanguage } from '../../../context/LanguageContext';
import { Button } from '../../ui/Button';
import { Icon } from '../../ui/Icon';

export interface HeroProps {
  onOrderClick: () => void;
  onShopClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderClick, onShopClick }) => {
  const { t } = useLanguage();

  const stats = [
    { value: t.hero.experienceYears, label: t.hero.statLabel1 },
    { value: t.hero.naturalHair, label: t.hero.statLabel2 },
    { value: t.hero.handCrafted, label: t.hero.statLabel3 },
  ];

  return (
    <section className="hero-section">
      <div className="container">
        {/* Плашка — над сеткой, по центру всей ширины */}
        <div className="hero__badge-wrap">
          <div className="hero__badge">
            <Icon name="crown" size={14} className="hero__badge-icon" />
            <span>{t.hero.badge}</span>
          </div>
        </div>

        {/* Сетка из двух колонок */}
        <div className="hero__layout">
          {/* ЛЕВАЯ КОЛОНКА — заголовок, подзаголовок, кнопки, stats */}
          <div className="hero__content">
            <h1 className="hero__title">
              <span className="hero__title-accent">{t.hero.title}</span>
            </h1>

            <p className="hero__subtitle">{t.hero.subtitle}</p>

            <div className="hero__actions">
              <Button
                variant="primary"
                size="lg"
                onClick={onOrderClick}
                icon={<Icon name="sparkles" size={18} className="btn-sparkle-icon" />}
              >
                {t.hero.ctaCustom}
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={onShopClick}
                icon={<Icon name="arrowRight" size={18} className="btn-arrow-icon" />}
                iconPosition="right"
              >
                {t.hero.ctaShop}
              </Button>
            </div>

            <div className="hero__stats-row">
              {stats.map((stat, i) => (
                <div key={i} className="hero__stat-card">
                  <span className="hero__stat-value">{stat.value}</span>
                  <span className="hero__stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ПРАВАЯ КОЛОНКА — баннер */}
          <div className="hero__banner">
            <div className="hero__banner-glow" aria-hidden />
            <img
              src="/images/hero-banner.webp"
              alt="Jardin Hair System — премиальная упаковка изделий"
              className="hero__banner-img"
              width="800"
              height="1200"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
};