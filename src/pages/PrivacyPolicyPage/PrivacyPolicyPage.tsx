// src/pages/PrivacyPolicyPage/PrivacyPolicyPage.tsx

import React from 'react';
import './PrivacyPolicyPage.css';
import { PageType } from '../../types';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../../components/ui/Button';

export interface PrivacyPolicyPageProps {
  onNavigate: (page: PageType) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  useDocumentTitle(t.privacy.title, t.privacy.intro);

  return (
    <div className="privacy-page fade-in">
      <div className="container privacy-container">
        <article className="privacy-parchment">
          {/* Декоративные уголки — «бумажный холст» */}
          <span className="privacy-parchment__corner privacy-parchment__corner--tl" aria-hidden />
          <span className="privacy-parchment__corner privacy-parchment__corner--tr" aria-hidden />
          <span className="privacy-parchment__corner privacy-parchment__corner--bl" aria-hidden />
          <span className="privacy-parchment__corner privacy-parchment__corner--br" aria-hidden />

          {/* Заголовок — рукописный */}
          <header className="privacy-parchment__header">
            <h1 className="privacy-parchment__title">{t.privacy.title}</h1>
            <span className="privacy-parchment__date">{t.privacy.lastUpdated}</span>
            <div className="privacy-parchment__divider" aria-hidden>
              <span className="privacy-parchment__divider-dot" />
              <span className="privacy-parchment__divider-line" />
              <span className="privacy-parchment__divider-dot" />
            </div>
          </header>

          {/* Вступление */}
          <p className="privacy-parchment__intro">{t.privacy.intro}</p>

          {/* Разделы */}
          <section className="privacy-parchment__block">
            <h2 className="privacy-parchment__section-title">{t.privacy.section1Title}</h2>
            <p>{t.privacy.section1Text}</p>
          </section>

          <section className="privacy-parchment__block">
            <h2 className="privacy-parchment__section-title">{t.privacy.section2Title}</h2>
            <p>{t.privacy.section2Text}</p>
          </section>

          <section className="privacy-parchment__block">
            <h2 className="privacy-parchment__section-title">{t.privacy.section3Title}</h2>
            <p>{t.privacy.section3Text}</p>
          </section>

          <section className="privacy-parchment__block">
            <h2 className="privacy-parchment__section-title">{t.privacy.section4Title}</h2>
            <p>{t.privacy.section4Text}</p>
          </section>

          {/* Подпись + кнопка */}
          <footer className="privacy-parchment__footer">
            <div className="privacy-parchment__signature" aria-hidden>
              <span className="privacy-parchment__signature-flourish">~ Jardin Atelier ~</span>
            </div>

            <div className="privacy-parchment__back-btn">
              <Button
                variant="outline"
                onClick={() => onNavigate('home')}
              >
                {t.privacy.backHome}
              </Button>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
};