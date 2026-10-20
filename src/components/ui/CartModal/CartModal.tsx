// src/components/ui/CartModal/CartModal.tsx

import React, { useState } from 'react';
import './CartModal.css';
import { Modal } from '../Modal';
import { useCart } from '../../../context/CartContext';
import { useLanguage } from '../../../context/LanguageContext';
import { formatPrice } from '../../../utils/formatPrice';
import { formatPhone, isValidPhone } from '../../../utils/formatPhone';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { sendRequest } from '../../../utils/sendRequest';

export interface CartModalProps {
  onNavigateToPrivacy?: () => void;
  onNavigateToCalculator?: () => void;
}

type CartView = 'cart' | 'form' | 'success';

export const CartModal: React.FC<CartModalProps> = ({
  onNavigateToPrivacy,
  onNavigateToCalculator,
}) => {
  const {
    items,
    totalCount,
    totalPrice,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
  const { language, t } = useLanguage();

  const [view, setView] = useState<CartView>('cart');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [contactMethod, setContactMethod] = useState<'telegram' | 'whatsapp' | 'phone' | 'email'>('telegram');
  const [comment, setComment] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientPhone(formatPhone(e.target.value));
  };

  const handleGoToForm = () => {
    setError('');
    setView('form');
  };

  const handleBackToCart = () => {
    setError('');
    setView('cart');
  };

  const handleGoToCalculator = () => {
    closeCart();
    if (onNavigateToCalculator) {
      onNavigateToCalculator();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientName.trim()) {
      setError(t.errors.requiredName);
      return;
    }
    if (!clientEmail.trim()) {
      setError(t.errors.requiredEmail);
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(clientEmail.trim())) {
      setError(t.errors.invalidEmail);
      return;
    }
    if (!isValidPhone(clientPhone)) {
      setError(t.errors.invalidPhone);
      return;
    }
    if (!agreed) {
      setError(t.errors.privacyRequired);
      return;
    }

    setError('');
    setIsSubmitting(true);

    const itemsSummary = items
      .map((item, idx) => {
        const subtotal = item.unitPrice * item.quantity;
        return `${idx + 1}. ${item.shapeName[language]} — ${item.lengthCm} см — ${item.colorName[language]}\n   ${item.quantity} × ${formatPrice(item.unitPrice, '€', language)} = ${formatPrice(subtotal, '€', language)}`;
      })
      .join('\n\n');

    const message = `Состав заявки (${items.length} поз., итого ${formatPrice(totalPrice, '€', language)}):\n\n${itemsSummary}`;

    const result = await sendRequest({
      name: clientName,
      phone: clientPhone,
      email: clientEmail,
      message,
      preferredMethod: contactMethod,
    });

    setIsSubmitting(false);

    if (result.success) {
      setView('success');
    } else {
      setError(result.message || t.errors.generalError);
    }
  };

  const handleClose = () => {
    if (view === 'success') {
      clearCart();
      setClientName('');
      setClientPhone('');
      setClientEmail('');
      setComment('');
      setAgreed(false);
      setView('cart');
    }
    setError('');
    closeCart();
  };

  const getModalTitle = (): string | undefined => {
    if (view === 'success') return undefined;
    if (view === 'form') return t.cart.submitRequest;
    return `${t.cart.title} (${totalCount})`;
  };

  return (
    <Modal isOpen={isCartOpen} onClose={handleClose} title={getModalTitle()} size="md">
      <div className="cart-modal-body">
        {/* SUCCESS VIEW */}
        {view === 'success' && (
          <div className="cart-order-success">
            <Icon name="check" size={56} className="cart-order-success__icon" />
            <h4 className="cart-order-success__title">
              {t.customOrder.successTitle}
            </h4>
            <p className="cart-order-success__text">
              {t.customOrder.successDesc}
            </p>

            <div className="cart-order-success__disclaimer">
              <Icon name="shield" size={14} />
              <span>{t.customOrder.successDisclaimer}</span>
            </div>

            <Button
              variant="primary"
              onClick={handleClose}
              className="cart-order-success__btn"
            >
              {t.cart.closeButton}
            </Button>
          </div>
        )}

        {/* EMPTY CART */}
        {view === 'cart' && items.length === 0 && (
          <div className="cart-empty-state">
            <Icon name="cart" size={56} />
            <h4 className="cart-empty-title">{t.cart.emptyTitle}</h4>
            <p className="cart-empty-text">{t.cart.emptySubtitle}</p>
            <Button
              variant="primary"
              onClick={handleGoToCalculator}
            >
              {t.cart.goToCalculator}
            </Button>
          </div>
        )}

        {/* CART LIST VIEW */}
        {view === 'cart' && items.length > 0 && (
          <>
            <div className="cart-items-list">
              {items.map((item) => (
                <div key={item.id} className="cart-item-row">
                  <div
                    className="cart-item-color-thumb"
                    style={{ backgroundColor: item.colorHex }}
                    aria-hidden
                  />

                  <div className="cart-item-info">
                    <h5 className="cart-item-name">{item.shapeName[language]}</h5>
                    <div className="cart-item-meta">
                      <span>{t.shop.length}: {item.lengthCm} {t.shop.cm}</span>
                      <span className="cart-item-color-meta">
                        <span className="cart-color-dot" style={{ backgroundColor: item.colorHex }} />
                        {item.colorName[language]}
                      </span>
                      {item.totalWeightGrams > 0 && (
                        <span>
                          {t.customOrder.densityTotal}: {item.totalWeightGrams} {language === 'ru' ? 'г' : 'g'}
                        </span>
                      )}
                      {item.isPremiumHair && (
                        <span className="cart-item-premium">
                          ⭐ {language === 'ru' ? 'Премиум' : language === 'es' ? 'Premium' : 'Premium'}
                        </span>
                      )}
                    </div>
                    <div className="cart-item-price">
                      {formatPrice(item.unitPrice * item.quantity, '€', language)}
                      <span className="cart-item-unit-price">
                        {' '}({item.quantity} × {formatPrice(item.unitPrice, '€', language)})
                      </span>
                    </div>
                  </div>

                  <div className="cart-item-controls">
                    <button
                      type="button"
                      className="cart-qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label="Уменьшить количество"
                    >
                      <Icon name="minus" size={14} />
                    </button>
                    <span className="cart-qty-val">{item.quantity}</span>
                    <button
                      type="button"
                      className="cart-qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Увеличить количество"
                    >
                      <Icon name="plus" size={14} />
                    </button>
                    <button
                      type="button"
                      className="cart-item-remove"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Удалить позицию"
                      title={t.cart.removeItem}
                    >
                      <Icon name="trash" size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="cart-summary-row">
                <span className="cart-summary-total-label">{t.cart.totalAmount}</span>
                <span className="cart-summary-total-value">
                  {formatPrice(totalPrice, '€', language)}
                </span>
              </div>

              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleGoToForm}
                icon={<Icon name="arrowRight" size={18} />}
              >
                {t.cart.submitRequest}
              </Button>

              <Button
                variant="ghost"
                size="md"
                fullWidth
                onClick={handleGoToCalculator}
              >
                {t.cart.continueSelecting}
              </Button>
            </div>
          </>
        )}

        {/* FORM VIEW */}
        {view === 'form' && (
          <form onSubmit={handleSubmit} className="cart-form">
            <div className="cart-form-summary">
              <span className="cart-form-summary-label">{t.cart.orderSummary}</span>
              <span className="cart-form-summary-value">
                {items.length} поз. · {formatPrice(totalPrice, '€', language)}
              </span>
            </div>

            <div className="cart-form-group">
              <label className="cart-form-label">{t.forms.name} *</label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder={t.forms.namePlaceholder}
                className="cart-form-input"
              />
            </div>

            <div className="cart-form-group">
              <label className="cart-form-label">{t.forms.phone} *</label>
              <input
                type="tel"
                required
                value={clientPhone}
                onChange={handlePhoneChange}
                placeholder={t.forms.phonePlaceholder}
                className="cart-form-input"
              />
            </div>

            <div className="cart-form-group">
              <label className="cart-form-label">{t.forms.email} *</label>
              <input
                type="email"
                required
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder={t.forms.emailPlaceholder}
                className="cart-form-input"
              />
            </div>

            <div className="cart-form-group">
              <label className="cart-form-label">{t.customOrder.contactMethod}</label>
              <div className="cart-method-grid">
                {(['telegram', 'whatsapp', 'phone', 'email'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    className={`cart-method-btn ${contactMethod === m ? 'cart-method-btn--active' : ''}`}
                    onClick={() => setContactMethod(m)}
                  >
                    {t.customOrder.methods[m]}
                  </button>
                ))}
              </div>
            </div>

            <div className="cart-form-group">
              <label className="cart-form-label">{t.cart.commentLabel}</label>
              <textarea
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={t.cart.commentPlaceholder}
                className="cart-form-input cart-form-textarea"
              />
            </div>

            <label className="cart-agreement">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <span>
                {t.customOrder.privacyNotice}{' '}
                {onNavigateToPrivacy && (
                  <button
                    type="button"
                    className="cart-privacy-link"
                    onClick={(e) => {
                      e.preventDefault();
                      closeCart();
                      onNavigateToPrivacy();
                    }}
                  >
                    {t.customOrder.privacyLink}
                  </button>
                )}
              </span>
            </label>

            {error && <div className="cart-error-msg">{error}</div>}

            <div className="cart-form-actions">
              <Button
                type="button"
                variant="ghost"
                onClick={handleBackToCart}
                disabled={isSubmitting}
              >
                {t.cart.backToCart}
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                icon={<Icon name="check" size={18} />}
              >
                {isSubmitting ? t.customOrder.sending : t.cart.submitRequest}
              </Button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};