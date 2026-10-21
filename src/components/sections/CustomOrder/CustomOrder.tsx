// src/components/sections/CustomOrder/CustomOrder.tsx

import React, { useState, useMemo } from 'react';
import './CustomOrder.css';
import { productShapes } from '../../../data/services';
import { hairColors } from '../../../data/colors';
import {
  HAIR_CATEGORIES,
  SHAPE_PRICING,
  LENGTH_OPTIONS,
  calculatePrice,
  clampLengthByCategory,
} from '../../../data/pricing';
import { HairCategoryId } from '../../../types';
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

  const [selectedShapeId, setSelectedShapeId] = useState<string>('wig-full');
  const [extraWeight, setExtraWeight] = useState<number>(0);
  const [hairCategoryId, setHairCategoryId] = useState<HairCategoryId>('premium');
  const [selectedLength, setSelectedLength] = useState<number>(50);
  const [selectedColorId, setSelectedColorId] = useState<string>('medium-brown');
  const [quantity, setQuantity] = useState<number>(1);
  const [justAdded, setJustAdded] = useState(false);

  const currentShape = productShapes.find((s) => s.id === selectedShapeId) || productShapes[0];
  const currentColor = hairColors.find((c) => c.id === selectedColorId) || hairColors[0];
  const currentPricing = SHAPE_PRICING[currentShape.id];
  const currentCategory = HAIR_CATEGORIES.find((c) => c.id === hairCategoryId) || HAIR_CATEGORIES[1];

  const availableWeightOptions = currentPricing?.allowedExtraWeights || [0];

  const price = useMemo(
    () =>
      calculatePrice({
        shapeId: currentShape.id,
        extraWeightGrams: extraWeight,
        hairCategoryId,
        lengthCm: selectedLength,
        colorMultiplier: currentColor.priceMultiplier,
      }),
    [currentShape.id, extraWeight, hairCategoryId, selectedLength, currentColor.priceMultiplier]
  );

  const handleShapeChange = (shapeId: string) => {
    setSelectedShapeId(shapeId);
    const newPricing = SHAPE_PRICING[shapeId];
    if (newPricing && !newPricing.allowedExtraWeights.includes(extraWeight)) {
      setExtraWeight(0);
    }
  };

  const handleCategoryChange = (categoryId: HairCategoryId) => {
    setHairCategoryId(categoryId);
    // Ограничиваем длину по категории
    const clamped = clampLengthByCategory(categoryId, selectedLength);
    if (clamped !== selectedLength) {
      setSelectedLength(clamped);
    }
  };

  const handleLengthChange = (length: number) => {
    const clamped = clampLengthByCategory(hairCategoryId, length);
    setSelectedLength(clamped);
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
      hairCategory: hairCategoryId,
      hairCategoryName: currentCategory.name,
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
          <div className="calc-config-col">
            {/* Шаг 1: Тип изделия */}
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

            {/* Шаг 2: Категория волос */}
            <div className="calc-step">
              <h3 className="calc-step__title">
                <Icon name="diamond" size={18} />
                <span>{t.customOrder.stepCategory}</span>
              </h3>

              <label className="calc-select-label" htmlFor="calc-category-select">
                {t.customOrder.categoryLabel}
              </label>

              <select
                id="calc-category-select"
                className="calc-select"
                value={hairCategoryId}
                onChange={(e) => handleCategoryChange(e.target.value as HairCategoryId)}
              >
                {HAIR_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name[language]}
                  </option>
                ))}
              </select>

              <div className="shape-option-card shape-option-card--active shape-option-card--description">
                <div className="shape-option-name">{currentCategory.name[language]}</div>
                <div className="shape-option-sub">{currentCategory.description[language]}</div>
                <div className="shape-option-meta">
                  {t.customOrder.maxLengthLabel}{' '}
                  <strong>{currentCategory.maxLength} {t.shop.cm}</strong>
                </div>
              </div>
            </div>

            {/* Шаг 3: Густота */}
            <div className="calc-step">
              <h3 className="calc-step__title">
                <Icon name="sparkles" size={18} />
                <span>{t.customOrder.stepDensity}</span>
              </h3>

              <div className="length-quick-pills">
                {availableWeightOptions.map((weight) => {
                  const isActive = extraWeight === weight;
                  const label = weight === 0 ? t.customOrder.densityStandard : `+${weight} ${gramUnit}`;
                  return (
                    <button
                      key={weight}
                      type="button"
                      className={cn('length-pill-btn', isActive && 'length-pill-btn--active')}
                      onClick={() => setExtraWeight(weight)}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              <div className="calc-density-info">
                <span>
                  {t.customOrder.densityTotal}: <strong>{price.totalWeightGrams} {gramUnit}</strong>
                </span>
              </div>
            </div>

            {/* Шаг 4: Длина */}
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

                <div className="length-quick-pills">
                  {LENGTH_OPTIONS.map((len) => {
                    const isDisabled = len > currentCategory.maxLength;
                    return (
                      <button
                        key={len}
                        type="button"
                        className={cn(
                          'length-pill-btn',
                          selectedLength === len && 'length-pill-btn--active'
                        )}
                        onClick={() => handleLengthChange(len)}
                        disabled={isDisabled}
                        style={isDisabled ? { opacity: 0.35, cursor: 'not-allowed' } : undefined}
                      >
                        {len} {t.shop.cm}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Шаг 5: Цвет */}
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
          </div>

          {/* Правая колонка — цена */}
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
                  <button type="button" onClick={() => handleQuantityChange(-1)} aria-label="Уменьшить">
                    <Icon name="minus" size={14} />
                  </button>
                  <span>{quantity}</span>
                  <button type="button" onClick={() => handleQuantityChange(1)} aria-label="Увеличить">
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