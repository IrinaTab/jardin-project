// src/components/layout/Header/Header.tsx

import React, { useState, useEffect } from 'react';
import './Header.css';
import { PageType, Language } from '../../../types';
import { useLanguage } from '../../../context/LanguageContext';
import { useCart } from '../../../context/CartContext';
import { Icon } from '../../ui/Icon';
import { Logo } from '../../ui/Logo';
import { cn } from '../../../utils/cn';

export interface HeaderProps {
  activePage: PageType;
  onNavigate: (page: PageType) => void;
}

export const Header: React.FC<HeaderProps> = ({ activePage, onNavigate }) => {
  const { language, setLanguage, t } = useLanguage();
  const { totalCount, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: PageType) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const navItems: { page: PageType; label: string }[] = [
    { page: 'home', label: t.nav.home },
    { page: 'about', label: t.nav.about },
    { page: 'gallery', label: t.nav.gallery },
    { page: 'course', label: t.nav.course },
    { page: 'contacts', label: t.nav.contacts },
    { page: 'calculator', label: t.nav.calculator },
  ];

  return (
    <header className={cn('site-header', isScrolled && 'site-header--scrolled')}>
      <div className="container site-header__container">
        <Logo onClick={() => handleNavClick('home')} />

        <nav className="header__nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <button
              key={item.page}
              type="button"
              className={cn(
                'header__nav-link',
                activePage === item.page && 'header__nav-link--active'
              )}
              onClick={() => handleNavClick(item.page)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="header__actions">
          <div className="header__lang-switcher" role="group" aria-label="Language selection">
            {(['ru', 'en', 'es'] as Language[]).map((lang) => (
              <button
                key={lang}
                type="button"
                className={cn(
                  'header__lang-btn',
                  language === lang && 'header__lang-btn--active'
                )}
                onClick={() => setLanguage(lang)}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="header__cart-btn"
            onClick={openCart}
            aria-label={`${t.nav.cart} (${totalCount})`}
          >
            <Icon name="cart" size={20} />
            {totalCount > 0 && <span className="header__cart-badge">{totalCount}</span>}
          </button>

          <button
            type="button"
            className="header__mobile-toggle"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? t.nav.close : t.nav.menu}
          >
            <Icon name={mobileMenuOpen ? 'close' : 'menu'} size={24} />
          </button>
        </div>
      </div>

      <div
        className={cn(
          'header__mobile-drawer',
          mobileMenuOpen && 'header__mobile-drawer--open'
        )}
      >
        {navItems.map((item) => (
          <button
            key={item.page}
            type="button"
            className={cn(
              'header__mobile-link',
              activePage === item.page && 'header__mobile-link--active'
            )}
            onClick={() => handleNavClick(item.page)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};