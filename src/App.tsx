// src/App.tsx

import React, { useState, useEffect } from 'react';
import { PageType } from './types';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import { ModalProvider } from './context/ModalContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ScrollToTopButton } from './components/layout/ScrollToTop';
import { CartModal } from './components/ui/CartModal';
import { PhotoModal } from './components/ui/PhotoModal';
import { RequestFormModal } from './components/ui/RequestFormModal';
import { ContactChoiceModal } from './components/ui/ContactChoiceModal';
import { VideoModal } from './components/ui/VideoModal';

import { HomePage } from './pages/HomePage';
import { GalleryPage } from './pages/GalleryPage';
import { AboutPage } from './pages/AboutPage';
import { ContactsPage } from './pages/ContactsPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { CalculatorPage } from './pages/CalculatorPage';

const VALID_PAGES: PageType[] = [
  'home',
  'gallery',
  'about',
  'contacts',
  'privacy',
  'calculator',
];

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    return VALID_PAGES.includes(hash as PageType) ? (hash as PageType) : 'home';
  });

  const scrollToTop = () => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (VALID_PAGES.includes(hash as PageType)) {
        setCurrentPage(hash as PageType);
        scrollToTop();
      } else if (!hash) {
        setCurrentPage('home');
        scrollToTop();
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    if (page === currentPage) {
      scrollToTop();
      return;
    }
    window.location.hash = page === 'home' ? '' : page;
    scrollToTop();
  };

  return (
    <div className="app-root">
      <Header activePage={currentPage} onNavigate={handleNavigate} />

      <main className="app-main">
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentPage === 'gallery' && <GalleryPage onNavigate={handleNavigate} />}
        {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} />}
        {currentPage === 'contacts' && <ContactsPage onNavigate={handleNavigate} />}
        {currentPage === 'privacy' && <PrivacyPolicyPage onNavigate={handleNavigate} />}
        {currentPage === 'calculator' && <CalculatorPage onNavigate={handleNavigate} />}
      </main>

      <Footer onNavigate={handleNavigate} />

      <ScrollToTopButton />
      <CartModal
        onNavigateToPrivacy={() => handleNavigate('privacy')}
        onNavigateToCalculator={() => handleNavigate('calculator')}
      />
      <PhotoModal
        onOrderSimilar={() => {
          handleNavigate('calculator');
        }}
      />
      <VideoModal />
      <RequestFormModal onNavigateToPrivacy={() => handleNavigate('privacy')} />
      <ContactChoiceModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <CartProvider>
        <ModalProvider>
          <AppContent />
        </ModalProvider>
      </CartProvider>
    </LanguageProvider>
  );
};

export default App;