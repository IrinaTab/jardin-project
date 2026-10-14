// src/pages/ContactsPage/ContactsPage.tsx

import React, { useState } from 'react';
import './ContactsPage.css';
import { PageType } from '../../types';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useLanguage } from '../../context/LanguageContext';
import { contactInfo } from '../../data/contacts';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { Button } from '../../components/ui/Button';
import { Icon } from '../../components/ui/Icon';
import { formatPhone, isValidPhone } from '../../utils/formatPhone';
import { sendRequest } from '../../utils/sendRequest';

export interface ContactsPageProps {
  onNavigate: (page: PageType) => void;
}

export const ContactsPage: React.FC<ContactsPageProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();
  useDocumentTitle(t.nav.contacts);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorMsg(t.errors.requiredName);
      return;
    }
    if (!email.trim()) {
      setErrorMsg(t.errors.requiredEmail);
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setErrorMsg(t.errors.invalidEmail);
      return;
    }
    if (!isValidPhone(phone)) {
      setErrorMsg(t.errors.invalidPhone);
      return;
    }
    if (!agreed) {
      setErrorMsg(t.errors.privacyRequired);
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    const res = await sendRequest({
      name,
      phone,
      email,
      message,
      preferredMethod: 'Форма контактов',
    });

    setIsSubmitting(false);
    if (res.success) {
      setIsSuccess(true);
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
      setAgreed(false);
    } else {
      setErrorMsg(t.errors.generalError);
    }
  };

  return (
    <div className="contacts-page fade-in">
      <div className="container">
        <SectionHeader
          badge={t.contacts.badge}
          title={t.contacts.title}
          subtitle={t.contacts.subtitle}
        />

        <div className="contacts-grid">
          {/* LEFT COLUMN — Direct Info */}
          <div className="contacts-info-card">
            <div className="contacts-item">
              <div className="contacts-item__icon">
                <Icon name="mapPin" size={20} />
              </div>
              <div>
                <div className="contacts-item__label">{t.contacts.addressTitle}</div>
                <div className="contacts-item__value">{contactInfo.address[language]}</div>
              </div>
            </div>

            <div className="contacts-item">
              <div className="contacts-item__icon">
                <Icon name="phone" size={20} />
              </div>
              <div>
                <div className="contacts-item__label">{t.contacts.phoneTitle}</div>
                <div className="contacts-item__value">
                  <a href={`tel:${contactInfo.phoneRaw}`} className="contacts-item__link contacts-item__link--gold">
                    {contactInfo.phone}
                  </a>
                </div>
              </div>
            </div>

            <div className="contacts-item">
              <div className="contacts-item__icon">
                <Icon name="email" size={20} />
              </div>
              <div>
                <div className="contacts-item__label">{t.contacts.emailTitle}</div>
                <div className="contacts-item__value">
                  <a href={`mailto:${contactInfo.email}`} className="contacts-item__link">
                    {contactInfo.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="contacts-item">
              <div className="contacts-item__icon">
                <Icon name="clock" size={20} />
              </div>
              <div>
                <div className="contacts-item__label">{t.contacts.hoursTitle}</div>
                <div className="contacts-item__value">{contactInfo.workingHours[language]}</div>
              </div>
            </div>

            {/* Messengers */}
            <div className="contacts-messengers">
              <div className="contacts-item__label contacts-messengers__title">
                {t.contacts.messengersTitle}
              </div>
              <div className="contacts-messengers__row">
                <a
                  href={contactInfo.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contacts-messenger-btn"
                >
                  <Icon name="telegram" size={16} />
                  <span>Telegram</span>
                </a>
                <a
                  href={contactInfo.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contacts-messenger-btn"
                >
                  <Icon name="whatsapp" size={16} />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={contactInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contacts-messenger-btn"
                >
                  <Icon name="instagram" size={16} />
                  <span>Instagram</span>
                </a>
                <a
                  href={contactInfo.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contacts-messenger-btn"
                >
                  <Icon name="tiktok" size={16} />
                  <span>TikTok</span>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Interactive Form */}
          <div className="contacts-form-card">
            {isSuccess ? (
              <div className="contacts-success">
                <Icon
                  name="check"
                  size={54}
                  className="contacts-success__icon"
                />
                <h3 className="contacts-success__title">
                  {t.customOrder.successTitle}
                </h3>
                <p className="contacts-success__text">
                  {t.customOrder.successDesc}
                </p>
                <Button variant="primary" onClick={() => setIsSuccess(false)}>
                  {t.contacts.sendAnother}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contacts-form">
                <div>
                  <h3 className="contacts-form__title">{t.contacts.formTitle}</h3>
                  <p className="contacts-form__subtitle">{t.contacts.formSubtitle}</p>
                </div>

                <div className="contacts-form__group">
                  <label className="contacts-form__label">
                    {t.forms.name} *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.forms.namePlaceholder}
                    className="contacts-form__input"
                  />
                </div>

                <div className="contacts-form__group">
                  <label className="contacts-form__label">
                    {t.forms.phone} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder={t.forms.phonePlaceholder}
                    className="contacts-form__input"
                  />
                </div>

                <div className="contacts-form__group">
                  <label className="contacts-form__label">
                    {t.forms.email} *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.forms.emailPlaceholder}
                    className="contacts-form__input"
                  />
                </div>

                <div className="contacts-form__group">
                  <label className="contacts-form__label">
                    {t.forms.message}
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.forms.messagePlaceholder}
                    className="contacts-form__input contacts-form__textarea"
                  />
                </div>

                <label className="contacts-form__agreement">
                  <input
                    type="checkbox"
                    required
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="contacts-form__checkbox"
                  />
                  <span>
                    {t.customOrder.privacyNotice}{' '}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate('privacy');
                      }}
                      className="contacts-form__privacy-link"
                    >
                      {t.customOrder.privacyLink}
                    </button>
                  </span>
                </label>

                {errorMsg && (
                  <div className="contacts-form__error">{errorMsg}</div>
                )}

                <Button type="submit" variant="primary" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? t.customOrder.sending : t.forms.send}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};