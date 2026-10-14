// src/components/ui/Modal/Modal.tsx

import React, { useEffect, useRef } from 'react';
import './Modal.css';
import { Icon } from '../Icon';
import { cn } from '../../../utils/cn';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  size = 'md',
  children,
  className = '',
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <div
      ref={overlayRef}
      className="app-modal-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Modal window'}
    >
      <div
        className={cn(
          'app-modal-container',
          size === 'lg' && 'app-modal-container--lg',
          className
        )}
      >
        {title && (
          <div className="app-modal-header">
            <h3 className="app-modal-title">{title}</h3>
            <button
              type="button"
              className="app-modal-close"
              onClick={onClose}
              aria-label="Закрыть"
            >
              <Icon name="close" size={18} />
            </button>
          </div>
        )}

        {!title && (
          <button
            type="button"
            className="app-modal-close"
            style={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}
            onClick={onClose}
            aria-label="Закрыть"
          >
            <Icon name="close" size={18} />
          </button>
        )}

        <div className="app-modal-content">{children}</div>
      </div>
    </div>
  );
};