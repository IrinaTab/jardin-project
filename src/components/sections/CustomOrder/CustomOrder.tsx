// src/components/sections/CustomOrder/CustomOrder.tsx

import React, { useState, useId } from 'react';
import './CustomOrder.css';
import { productShapes } from '../../../data/services';
import { hairColors } from '../../../data/colors';
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
  const shapeSelectId = useId();

  // Calculator State
  const [selectedShapeId, setSelectedShapeId] = useState<string>('wig');
  const [selectedLength, setSelectedLength] = useState<number>(50);
  const [selectedColorId, setSelectedColorId] = useState<string>('medium-brown');
  const [quantity, setQuantity] = useState<number>(1);
  const [justAdded, setJustAdded] = useState(false);

  const currentShape = productShapes.find((s) => s.id === selectedShapeId) || productShapes[0];
  const currentColor = hairColors.find((c) => c.id === selectedColorId) || hairColors[0];

  // 30cm -> 0.85, 50cm -> 1.05, 70cm -> 1.40
  const lengthMultiplier = 0.85 + ((selectedLength - 30) / 40) * 0.55;

  const calculatedPrice = Math.round(
    currentShape.basePrice * lengthMultiplier * currentColor.priceMultiplier
  );

  const handleQuantityChange = (delta: number) => {
    setQuantity((q) => Math.max(1, Math.min(99, q + delta)));
  };

  const handleAddToCart = () => {
    addCustomOrderItem({
      shapeId: currentShape.id,
      shapeName: currentShape.name,
      lengthCm: selectedLength,
      colorId: currentColor.id,
      colorName: currentColor.name,
      colorHex: currentColor.hex,
      quantity,
      unitPrice: calculatedPrice,
    });
    setJustAdded(true);
    setQuantity(1);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <section className={cn('section custom-order-section', className)} id="custom-order">
      <div className="container">
        <SectionHeader
          badge={t.customOrder.badge}
          title={t.customOrder.title}
          subtitle={t.customOrder.subtitle}
        />

        <div className="custom-order-calculator">
          {/* Left Column: Configuration */}
          <div className="calc-config-col">
            {/* Step 1: Shape */}
            <div className="calc-step">
              <label htmlFor={shapeSelectId} className="calc-step__title">
                <Icon name="crown" size={18} />
                <span>{t.customOrder.step1}</span>
              </label>

              <div className="shape-select-grid">
                {productShapes.map((shape) => {
                  const isActive = shape.id === selectedShapeId;
                  return (
                    <div
                      key={shape.id}
                      className={cn('shape-option-card', isActive && 'shape-option-card--active')}
                      onClick={() => setSelectedShapeId(shape.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') setSelectedShapeId(shape.id);
                      }}
                    >
                      <div className="shape-option-name">{shape.name[language]}</div>
                      <div className="shape-option-sub">{shape.description[language]}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Length */}
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
                  step={5}
                  value={selectedLength}
                  onChange={(e) => setSelectedLength(Number(e.target.value))}
                  className="length-slider-range"
                  aria-label="Выбор длины волос в сантиметрах"
                />

                <div className="length-quick-pills">
                  {[30, 40, 50, 60, 70].map((len) => (
                    <button
                      key={len}
                      type="button"
                      className={cn(
                        'length-pill-btn',
                        selectedLength === len && 'length-pill-btn--active'
                      )}
                      onClick={() => setSelectedLength(len)}
                    >
                      {len} {t.shop.cm}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 3: Color */}
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

          {/* Right Column: Price + Add to Cart */}
          <div className="calc-summary-col">
            <div className="calc-price-display-box">
              <div className="calc-price-label">{t.customOrder.totalPrice}</div>
              <div className="calc-price-total">
                {formatPrice(calculatedPrice, '€', language)}
              </div>
              <div className="calc-formula-note">{t.customOrder.formulaNote}</div>

              {/* Уточнение: ориентировочная стоимость */}
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
              {/* Плашка-предупреждение под кнопкой */}
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