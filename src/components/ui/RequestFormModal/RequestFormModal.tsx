// src/components/ui/RequestFormModal/RequestFormModal.tsx

import React, { useState, useRef } from 'react';
import './RequestFormModal.css';
import { Modal } from '../Modal';
import { useModal } from '../../../context/ModalContext';
import { useLanguage } from '../../../context/LanguageContext';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { formatPhone } from '../../../utils/formatPhone';
import { sendRequest } from '../../../utils/sendRequest';
import { isSpamBot } from '../../../utils/antiSpam';

export interface RequestFormModalProps {
  onNavigateToPrivacy?: () => void;
}

export const RequestFormModal: React.FC<RequestFormModalProps> = ({ onNavigateToPrivacy }) => {
  const {
    isRequestModalOpen,
    requestModalTitle,
    requestModalMode,
    closeRequestModal,
  } = useModal();
  const { language, t } = useLanguage();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [method, setMethod] = useState<'telegram' | 'whatsapp' | 'phone'>('telegram');
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Honeypot + время открытия формы
  const [honeypot, setHoneypot] = useState('');
  const formStartTime = useRef<number>(Date.now());

  // Сбрасываем таймер при каждом открытии модалки
  React.useEffect(() => {
    if (isRequestModalOpen) {
      formStartTime.current = Date.now();
    }
  }, [isRequestModalOpen]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Валидация
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
    if (!agreed) {
      setErrorMsg(t.errors.privacyRequired);
      return;
    }

    // Антиспам: honeypot + время заполнения
    if (isSpamBot(honeypot, formStartTime.current)) {
      // Не отправляем, но показываем «успех» — бот не поймёт, что пойман
      console.info('[anti-spam] Заблокирована заявка от бота');
      setIsSuccess(true);
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
      setAgreed(false);
      setHoneypot('');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    const formType =
      requestModalMode === 'course'
        ? 'course'
        : requestModalMode === 'custom'
          ? 'custom'
          : 'question';

    const res = await sendRequest({
      name,
      phone,
      email,
      message,
      preferredMethod: method,
      formType,
      language,
    });

    setIsSubmitting(false);
    if (res.success) {
      setIsSuccess(true);
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
      setAgreed(false);
      setHoneypot('');
    } else {
      setErrorMsg(t.errors.generalError);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setErrorMsg('');
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
    setAgreed(false);
    setHoneypot('');
    setMethod('telegram');
    closeRequestModal();
  };

  const submitLabel =
    requestModalMode === 'course'
      ? t.coursePage.heroCta
      : requestModalMode === 'custom'
        ? t.forms.sendRequest
        : t.forms.send;

  const successTitle =
    requestModalMode === 'course'
      ? t.forms.successCourseTitle
      : requestModalMode === 'custom'
        ? t.forms.successCustomTitle
        : t.forms.successQuestionTitle;

  const successDesc =
    requestModalMode === 'course'
      ? t.forms.successCourseDesc
      : requestModalMode === 'custom'
        ? t.forms.successCustomDesc
        : t.forms.successQuestionDesc;

  return (
    <Modal
      isOpen={isRequestModalOpen}
      onClose={handleClose}
      title={requestModalTitle || t.contacts.formTitle}
      size="md"
    >
      {isSuccess ? (
        <div className="request-success">
          <Icon name="check" size={56} className="request-success__icon" />
          <h4 className="request-success__title">{successTitle}</h4>
          <p className="request-success__text">{successDesc}</p>
          <Button
            variant="primary"
            onClick={handleClose}
            className="request-success__btn"
          >
            {t.cart.closeButton}
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="request-form">
          {/* Honeypot — скрытое поле от ботов */}
          <div className="honeypot-field" aria-hidden="true">
            <label htmlFor="website-url">Website</label>
            <input
              type="text"
              id="website-url"
              name="website_url"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          <div className="request-form__group">
            <label className="request-form__label">
              {t.forms.name} *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.forms.namePlaceholder}
              className="request-form__input"
            />
          </div>

          <div className="request-form__group">
            <label className="request-form__label">
              {t.forms.phone} *
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={handlePhoneChange}
              placeholder={t.forms.phonePlaceholder}
              className="request-form__input"
            />
          </div>

          <div className="request-form__group">
            <label className="request-form__label">
              {t.forms.email} *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.forms.emailPlaceholder}
              className="request-form__input"
            />
          </div>

          <div className="request-form__group">
            <label className="request-form__label">
              {t.customOrder.contactMethod}
            </label>
            <div className="request-form__method-grid">
              {(['telegram', 'whatsapp', 'phone'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  className={`request-form__method-btn ${method === m ? 'request-form__method-btn--active' : ''}`}
                  onClick={() => setMethod(m)}
                >
                  {t.customOrder.methods[m]}
                </button>
              ))}
            </div>
          </div>

          <div className="request-form__group">
            <label className="request-form__label">
              {t.forms.message}
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t.forms.messagePlaceholder}
              className="request-form__input request-form__textarea"
            />
          </div>

          <label className="request-form__agreement">
            <input
              type="checkbox"
              required
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="request-form__checkbox"
            />
            <span>
              {t.customOrder.privacyNotice}{' '}
              {onNavigateToPrivacy ? (
                <button
                  type="button"
                  className="request-form__privacy-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClose();
                    onNavigateToPrivacy();
                  }}
                >
                  {t.customOrder.privacyLink}
                </button>
              ) : (
                <span className="request-form__privacy-link">
                  {t.customOrder.privacyLink}
                </span>
              )}
            </span>
          </label>

          {errorMsg && (
            <div className="request-form__error">{errorMsg}</div>
          )}

          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={isSubmitting}
            icon={<Icon name="sparkles" size={18} className="btn-sparkle-icon" />}
          >
            {isSubmitting ? t.customOrder.sending : submitLabel}
          </Button>
        </form>
      )}
    </Modal>
  );
};