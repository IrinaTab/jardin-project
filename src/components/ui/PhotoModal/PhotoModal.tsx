// src/components/ui/PhotoModal/PhotoModal.tsx

import React from 'react';
import './PhotoModal.css';
import { Modal } from '../Modal';
import { useModal } from '../../../context/ModalContext';
import { useLanguage } from '../../../context/LanguageContext';
import { Button } from '../Button';
import { Icon } from '../Icon';

export interface PhotoModalProps {
  onOrderSimilar?: (title: string) => void;
}

export const PhotoModal: React.FC<PhotoModalProps> = ({ onOrderSimilar }) => {
  const { activePhoto, closePhotoModal } = useModal();
  const { language, t } = useLanguage();

  if (!activePhoto) return null;

  const handleOrder = () => {
    const titleText = activePhoto.title[language];
    closePhotoModal();
    if (onOrderSimilar) {
      onOrderSimilar(titleText);
    }
  };

  return (
    <Modal
      isOpen={Boolean(activePhoto)}
      onClose={closePhotoModal}
      size="lg"
      title={activePhoto.title[language]}
    >
      <div className="photo-modal-wrap">
        <div className="photo-modal-preview-box">
          <img
            src={activePhoto.imageUrl}
            alt={activePhoto.title[language]}
            className="photo-modal-img"
          />
        </div>

        <div className="photo-modal-actions">
          <Button
            variant="primary"
            size="md"
            onClick={handleOrder}
            icon={<Icon name="sparkles" size={16} />}
          >
            {t.gallery.requestSimilar}
          </Button>
        </div>
      </div>
    </Modal>
  );
};