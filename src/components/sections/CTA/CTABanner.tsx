// src/components/sections/CTA/CTABanner.tsx

import React from 'react';
import './CTABanner.css';
import { useLanguage } from '../../../context/LanguageContext';
import { Button } from '../../ui/Button';
import { Icon } from '../../ui/Icon';

export interface CTABannerProps {
  onOrderClick: () => void;
  onContactClick: () => void;
}

export const CTABanner: React.FC<CTABannerProps> = ({
  onOrderClick,
  onContactClick,
}) => {
  const { t } = useLanguage();

  return (
    <section className="section cta-section">
      <div className="container">
        <div className="cta-banner-card">
          <h2 className="cta-banner__title">
            <span className="cta-banner__title-gold">{t.cta.title}</span>
          </h2>
          <p className="cta-banner__subtitle">{t.cta.subtitle}</p>

          <div className="cta-banner__actions">
            <Button
              variant="primary"
              size="lg"
              onClick={onOrderClick}
              icon={<Icon name="sparkles" size={18} />}
            >
              {t.cta.buttonOrder}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={onContactClick}
            >
              {t.cta.buttonContact}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};