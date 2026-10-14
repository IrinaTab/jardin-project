import React, { useState, useEffect } from 'react';
import './ScrollToTopButton.css';
import { Icon } from '../../ui/Icon';
import { cn } from '../../../utils/cn';

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 350);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      className={cn('scroll-to-top-btn', isVisible && 'scroll-to-top-btn--visible')}
      onClick={scrollToTop}
      aria-label="Наверх"
    >
      <Icon name="arrowUp" size={20} />
    </button>
  );
};
