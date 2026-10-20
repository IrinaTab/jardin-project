// src/components/layout/Footer/Footer.tsx

import React from 'react';
import './Footer.css';
import { PageType } from '../../../types';
import { useLanguage } from '../../../context/LanguageContext';
import { contactInfo } from '../../../data/contacts';
import { Icon } from '../../ui/Icon';
import { Logo } from '../../ui/Logo';

export interface FooterProps {
  onNavigate: (page: PageType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();

  const socials = [
    { href: contactInfo.telegram, label: 'Telegram', icon: 'telegram' as const },
    { href: contactInfo.whatsapp, label: 'WhatsApp', icon: 'whatsapp' as const },
    { href: contactInfo.instagram, label: 'Instagram', icon: 'instagram' as const },
    { href: contactInfo.tiktok, label: 'TikTok', icon: 'tiktok' as const },
    { href: contactInfo.facebook, label: 'Facebook', icon: 'facebook' as const },
  ];

  const navLinks: { page: PageType; label: string }[] = [
    { page: 'home', label: t.nav.home },
    { page: 'about', label: t.nav.about },
    { page: 'gallery', label: t.nav.gallery },
    { page: 'course', label: t.nav.course },
    { page: 'contacts', label: t.nav.contacts },
    { page: 'calculator', label: t.nav.calculator },
  ];

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__col-brand">
            <Logo onClick={() => onNavigate('home')} />

            <p className="footer__desc">{t.footer.brandDesc}</p>

            <div className="footer__socials-row">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-btn"
                  aria-label={s.label}
                >
                  <Icon name={s.icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="footer__col-title">{t.footer.navTitle}</h4>
            <ul className="footer__links-list">
              {navLinks.map((item) => (
                <li key={item.page} className="footer__link-item">
                  <button type="button" onClick={() => onNavigate(item.page)}>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="footer__col-title">{t.footer.contactsTitle}</h4>
            <div className="footer__contacts-list">
              <div className="footer__contact-row">
                <span className="footer__contact-icon"><Icon name="phone" size={16} /></span>
                <a href={`tel:${contactInfo.phoneRaw}`}>{contactInfo.phone}</a>
              </div>
              <div className="footer__contact-row">
                <span className="footer__contact-icon"><Icon name="email" size={16} /></span>
                <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
              </div>
              <div className="footer__contact-row">
                <span className="footer__contact-icon"><Icon name="mapPin" size={16} /></span>
                <span>{contactInfo.address[language]}</span>
              </div>
              <div className="footer__contact-row">
                <span className="footer__contact-icon"><Icon name="clock" size={16} /></span>
                <span>{contactInfo.workingHours[language]}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__copyright">{t.footer.copyright}</div>
          <div className="footer__legal-links">
            <button type="button" onClick={() => onNavigate('privacy')}>
              {t.footer.privacyPolicy}
            </button>
            <span>{t.footer.madeWithLove}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};