// src/components/ui/RequestFormModal/RequestFormModal.tsx

import React, { useState } from 'react';
import './RequestFormModal.css';
import { Modal } from '../Modal';
import { useModal } from '../../../context/ModalContext';
import { useLanguage } from '../../../context/LanguageContext';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { formatPhone, isValidPhone } from '../../../utils/formatPhone';
import { sendRequest } from '../../../utils/sendRequest';
import { useAntiSpam } from '../../../hooks/useAntiSpam';
import { HoneypotField } from '../HoneypotField';

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

  // Хук антиспама (сбрасывает таймер при открытии)
  const { honeypot, setHoneypot, checkBot } = useAntiSpam(isRequestModalOpen);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) { setErrorMsg(t.errors.requiredName); return; }
    if (!email.trim()) { setErrorMsg(t.errors.requiredEmail); return; }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) { setErrorMsg(t.errors.invalidEmail); return; }
    if (!isValidPhone(phone)) { setErrorMsg(t.errors.invalidPhone); return; }
    if (!agreed) { setErrorMsg(t.errors.privacyRequired); return; }

    if (checkBot()) {
      console.info('[anti-spam] Заблокирована заявка от бота');
      setIsSuccess(true);
      setName(''); setPhone(''); setEmail(''); setMessage(''); setAgreed(false);
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    const formType = requestModalMode === 'course' ? 'course' : requestModalMode === 'custom' ? 'custom' : 'question';

    const res = await sendRequest({
      name, phone, email, message,
      preferredMethod: method,
      formType,
      language,
    });

    setIsSubmitting(false);
    if (res.success) {
      setIsSuccess(true);
      setName(''); setPhone(''); setEmail(''); setMessage(''); setAgreed(false); setHoneypot('');
    } else {
      setErrorMsg(t.errors.generalError);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setErrorMsg('');
    setName(''); setPhone(''); setEmail(''); setMessage(''); setAgreed(false); setHoneypot('');
    setMethod('telegram');
    closeRequestModal();
  };

  const submitLabel = requestModalMode === 'course' ? t.coursePage.heroCta : requestModalMode === 'custom' ? t.forms.sendRequest : t.forms.send;
  const successTitle = requestModalMode === 'course' ? t.forms.successCourseTitle : requestModalMode === 'custom' ? t.forms.successCustomTitle : t.forms.successQuestionTitle;
  const successDesc = requestModalMode === 'course' ? t.forms.successCourseDesc : requestModalMode === 'custom' ? t.forms.successCustomDesc : t.forms.successQuestionDesc;

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
          <Button variant="primary" onClick={handleClose} className="request-success__btn">
            {t.cart.closeButton}
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="form">
          <HoneypotField
            id="website-url"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />

          <div className="form-group">
            <label className="form-label">{t.forms.name} *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.forms.namePlaceholder}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">{t.forms.phone} *</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={handlePhoneChange}
              placeholder={t.forms.phonePlaceholder}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">{t.forms.email} *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.forms.emailPlaceholder}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">{t.customOrder.contactMethod}</label>
            <div className="form-method-grid form-method-grid--cols-3">
              {(['telegram', 'whatsapp', 'phone'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  className={`form-method-btn ${method === m ? 'form-method-btn--active' : ''}`}
                  onClick={() => setMethod(m)}
                >
                  {t.customOrder.methods[m]}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">{t.forms.message}</label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t.forms.messagePlaceholder}
              className="form-input form-input--textarea"
            />
          </div>

          <label className="form-agreement">
            <input
              type="checkbox"
              required
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="form-checkbox"
            />
            <span>
              {t.customOrder.privacyNotice}{' '}
              {onNavigateToPrivacy ? (
                <button
                  type="button"
                  className="form-privacy-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClose();
                    onNavigateToPrivacy();
                  }}
                >
                  {t.customOrder.privacyLink}
                </button>
              ) : (
                <span className="form-privacy-link">
                  {t.customOrder.privacyLink}
                </span>
              )}
            </span>
          </label>

          {errorMsg && <div className="form-error">{errorMsg}</div>}

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