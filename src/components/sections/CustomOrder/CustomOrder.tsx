// src/components/sections/CustomOrder/CustomOrder.tsx

import React, { useState, useMemo } from 'react';
import './CustomOrder.css';
import { productShapes } from '../../../data/services';
import { hairColors } from '../../../data/colors';
import {
  SHAPE_PRICING,
  LENGTH_COEFFICIENTS,
  calculatePrice,
} from '../../../data/pricing';
import { useLanguage } from '../../../context/LanguageContext';
import { useCart } from '../../../context/CartContext';
import { SectionHeader } from '../../ui/SectionHeader';
import { ColorPicker } from '../../ui/ColorPicker';
import { Button } from '../../ui/Button';
import { Icon } from '../../ui/Icon';
import { formatPrice } from '../../../utils/formatPrice';
import { cn } from '../../../utils/cn';

export interface CustomOrderProps {
  className?: string;
}

export const CustomOrder: React.FC<CustomOrderProps> = ({ className = '' }) => {
  const { language, t } = useLanguage();
  const { addCustomOrderItem } = useCart();

  // Состояние калькулятора
  const [selectedShapeId, setSelectedShapeId] = useState<string>('wig-full');
  const [extraWeight, setExtraWeight] = useState<number>(0);
  const [isPremiumHair, setIsPremiumHair] = useState<boolean>(false);
  const [selectedLength, setSelectedLength] = useState<number>(50);
  const [selectedColorId, setSelectedColorId] = useState<string>('medium-brown');
  const [quantity, setQuantity] = useState<number>(1);
  const [justAdded, setJustAdded] = useState(false);

  const currentShape = productShapes.find((s) => s.id === selectedShapeId) || productShapes[0];
  const currentColor = hairColors.find((c) => c.id === selectedColorId) || hairColors[0];
  const currentPricing = SHAPE_PRICING[currentShape.id];

  // Доступные опции густоты для текущего типа
  const availableWeightOptions = currentPricing?.allowedExtraWeights || [0];

  // Расчёт цены
  const price = useMemo(
    () =>
      calculatePrice({
        shapeId: currentShape.id,
        extraWeightGrams: extraWeight,
        isPremiumHair,
        lengthCm: selectedLength,
        colorMultiplier: currentColor.priceMultiplier,
      }),
    [currentShape.id, extraWeight, isPremiumHair, selectedLength, currentColor.priceMultiplier]
  );

  const handleShapeChange = (shapeId: string) => {
    setSelectedShapeId(shapeId);
    // Сбрасываем вес, если текущий выбор не поддерживается новым типом
    const newPricing = SHAPE_PRICING[shapeId];
    if (newPricing && !newPricing.allowedExtraWeights.includes(extraWeight)) {
      setExtraWeight(0);
    }
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((q) => Math.max(1, Math.min(99, q + delta)));
  };

  const handleAddToCart = () => {
    addCustomOrderItem({
      shapeId: currentShape.id as any,
      shapeName: currentShape.name,
      lengthCm: selectedLength,
      extraWeightGrams: extraWeight,
      totalWeightGrams: price.totalWeightGrams,
      isPremiumHair,
      colorId: currentColor.id,
      colorName: currentColor.name,
      colorHex: currentColor.hex,
      quantity,
      unitPrice: price.finalPrice,
    });
    setJustAdded(true);
    setQuantity(1);
    setTimeout(() => setJustAdded(false), 2000);
  };

  // Граммы — для локализации
  const gramUnit = language === 'ru' ? 'г' : 'g';

  return (
    <section className={cn('section custom-order-section', className)} id="custom-order">
      <div className="container">
        <SectionHeader
          badge={t.customOrder.badge}
          title={t.customOrder.title}
          subtitle={t.customOrder.subtitle}
        />

        <div className="custom-order-calculator">
          {/* ЛЕВАЯ КОЛОНКА — конфигурация */}
          <div className="calc-config-col">
            {/* Шаг 1: Тип изделия — SELECT + описание */}
            <div className="calc-step">
              <h3 className="calc-step__title">
                <Icon name="crown" size={18} />
                <span>{t.customOrder.step1}</span>
              </h3>

              <label className="calc-select-label" htmlFor="calc-shape-select">
                {t.customOrder.shapeLabel}
              </label>

              <select
                id="calc-shape-select"
                className="calc-select"
                value={selectedShapeId}
                onChange={(e) => handleShapeChange(e.target.value)}
              >
                {productShapes.map((shape) => (
                  <option key={shape.id} value={shape.id}>
                    {shape.name[language]}
                  </option>
                ))}
              </select>

              {/* Карточка с описанием выбранного типа — как shape-option-card */}
              {currentShape && (
                <div className="shape-option-card shape-option-card--active shape-option-card--description">
                  <div className="shape-option-name">{currentShape.name[language]}</div>
                  <div className="shape-option-sub">{currentShape.description[language]}</div>
                  <div className="shape-option-meta">
                    {t.customOrder.baseWeightLabel}{' '}
                    <strong>{currentPricing?.standardWeight || 0} {gramUnit}</strong>
                  </div>
                </div>
              )}
            </div>

            {/* Шаг 2: Густота */}
            <div className="calc-step">
              <h3 className="calc-step__title">
                <Icon name="sparkles" size={18} />
                <span>{t.customOrder.stepDensity}</span>
              </h3>

              <div className="length-quick-pills">
                {availableWeightOptions.map((weight) => {
                  const isActive = extraWeight === weight;
                  const label =
                    weight === 0
                      ? t.customOrder.densityStandard
                      : `+${weight} ${gramUnit}`;
                  return (
                    <button
                      key={weight}
                      type="button"
                      className={cn(
                        'length-pill-btn',
                        isActive && 'length-pill-btn--active'
                      )}
                      onClick={() => setExtraWeight(weight)}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              <div className="calc-density-info">
                <span>
                  {t.customOrder.densityTotal}:{' '}
                  <strong>{price.totalWeightGrams} {gramUnit}</strong>
                </span>
              </div>
            </div>

            {/* Шаг 3: Длина */}
            <div className="calc-step">
              <h3 className="calc-step__title">
                <Icon name="feather" size={18} />
                <span>{t.customOrder.step2}</span>
              </h3>

              <div className="length-slider-container">
                <div className="length-slider-header">
                  <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                    {t.customOrder.lengthLabel}
                  </span>
                  <span className="length-slider-value">
                    {selectedLength} {t.shop.cm}
                  </span>
                </div>

                <input
                  type="range"
                  min={30}
                  max={70}
                  step={10}
                  value={selectedLength}
                  onChange={(e) => setSelectedLength(Number(e.target.value))}
                  className="length-slider-range"
                  aria-label="Выбор длины волос в сантиметрах"
                />

                <div className="length-quick-pills">
                  {LENGTH_COEFFICIENTS.map((opt) => (
                    <button
                      key={opt.lengthCm}
                      type="button"
                      className={cn(
                        'length-pill-btn',
                        selectedLength === opt.lengthCm && 'length-pill-btn--active'
                      )}
                      onClick={() => setSelectedLength(opt.lengthCm)}
                    >
                      {opt.lengthCm} {t.shop.cm}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Шаг 4: Цвет */}
            <div className="calc-step">
              <h3 className="calc-step__title">
                <Icon name="sparkles" size={18} />
                <span>{t.customOrder.step3}</span>
              </h3>

              <ColorPicker
                selectedColorId={selectedColorId}
                onSelectColor={(color) => setSelectedColorId(color.id)}
              />
            </div>

            {/* Шаг 5: Премиум-волосы */}
            <div className="calc-step">
              <label className="calc-premium-toggle">
                <input
                  type="checkbox"
                  checked={isPremiumHair}
                  onChange={(e) => setIsPremiumHair(e.target.checked)}
                />
                <div className="calc-premium-toggle__content">
                  <span className="calc-premium-toggle__title">
                    {t.customOrder.premiumTitle}
                  </span>
                  <span className="calc-premium-toggle__desc">
                    {t.customOrder.premiumDesc}
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* ПРАВАЯ КОЛОНКА — цена + кнопка */}
          <div className="calc-summary-col">
            <div className="calc-price-display-box">
              <div className="calc-price-label">{t.customOrder.totalPrice}</div>
              <div className="calc-price-total">
                {formatPrice(price.finalPrice, '€', language)}
              </div>
              <div className="calc-formula-note">{t.customOrder.formulaNote}</div>

              <div className="calc-price-disclaimer">
                <Icon name="shield" size={12} />
                <span>{t.customOrder.disclaimerShort}</span>
              </div>
            </div>

            <div className="calc-add-to-cart">
              <div className="calc-quantity-row">
                <span>{t.customOrder.quantityLabel}</span>
                <div className="calc-qty-control">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(-1)}
                    aria-label="Уменьшить количество"
                  >
                    <Icon name="minus" size={14} />
                  </button>
                  <span>{quantity}</span>
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(1)}
                    aria-label="Увеличить количество"
                  >
                    <Icon name="plus" size={14} />
                  </button>
                </div>
              </div>

              <Button
                variant={justAdded ? 'outline' : 'primary'}
                size="lg"
                fullWidth
                onClick={handleAddToCart}
                icon={<Icon name={justAdded ? 'check' : 'cart'} size={18} />}
              >
                {justAdded ? t.customOrder.addedToCart : t.customOrder.addToCart}
              </Button>

              <div className="calc-disclaimer-box">
                <Icon name="shield" size={14} />
                <div>
                  <strong>{t.customOrder.disclaimerTitle}</strong>
                  <p>{t.customOrder.disclaimerText}</p>
                </div>
              </div>

              <p className="calc-add-note">{t.customOrder.addToCartNote}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};