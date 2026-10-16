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
import { VideoModal } from './components/ui/VideoModal';
import { RequestFormModal } from './components/ui/RequestFormModal';
import { ContactChoiceModal } from './components/ui/ContactChoiceModal';

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

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (VALID_PAGES.includes(hash as PageType)) {
        setCurrentPage(hash as PageType);
      } else if (!hash) {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
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