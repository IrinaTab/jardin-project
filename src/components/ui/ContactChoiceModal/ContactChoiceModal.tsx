import React from 'react';
import './ContactChoiceModal.css';
import { Modal } from '../Modal';
import { useModal } from '../../../context/ModalContext';
import { useLanguage } from '../../../context/LanguageContext';
import { contactInfo } from '../../../data/contacts';
import { Icon } from '../Icon';

export const ContactChoiceModal: React.FC = () => {
  const { isContactChoiceOpen, closeContactChoiceModal, contactChoiceData } = useModal();
  const { t } = useLanguage();

  return (
    <Modal
      isOpen={isContactChoiceOpen}
      onClose={closeContactChoiceModal}
      title={contactChoiceData?.title || t.contacts.messengersTitle}
      size="md"
    >
      <div className="contact-choice-list">
        <a
          href={contactInfo.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-choice-item"
          onClick={() => {
            contactChoiceData?.onSelectMethod?.('telegram');
            closeContactChoiceModal();
          }}
        >
          <div className="contact-choice-info">
            <span className="contact-choice-icon">
              <Icon name="telegram" size={24} />
            </span>
            <div>
              <span className="contact-choice-title">Telegram</span>
              <span className="contact-choice-sub">Быстрый ответ мастера</span>
            </div>
          </div>
          <Icon name="arrowRight" size={18} />
        </a>

        <a
          href={contactInfo.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-choice-item"
          onClick={() => {
            contactChoiceData?.onSelectMethod?.('whatsapp');
            closeContactChoiceModal();
          }}
        >
          <div className="contact-choice-info">
            <span className="contact-choice-icon">
              <Icon name="whatsapp" size={24} />
            </span>
            <div>
              <span className="contact-choice-title">WhatsApp</span>
              <span className="contact-choice-sub">Консультация и отправка фото</span>
            </div>
          </div>
          <Icon name="arrowRight" size={18} />
        </a>

        <a
          href={`tel:${contactInfo.phoneRaw}`}
          className="contact-choice-item"
          onClick={() => {
            contactChoiceData?.onSelectMethod?.('phone');
            closeContactChoiceModal();
          }}
        >
          <div className="contact-choice-info">
            <span className="contact-choice-icon">
              <Icon name="phone" size={24} />
            </span>
            <div>
              <span className="contact-choice-title">{contactInfo.phone}</span>
              <span className="contact-choice-sub">Прямой звонок в ателье</span>
            </div>
          </div>
          <Icon name="arrowRight" size={18} />
        </a>
      </div>
    </Modal>
  );
};
