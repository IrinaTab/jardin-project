import React from 'react';
import './ColorPicker.css';
import { HairColor } from '../../../types';
import { hairColors } from '../../../data/colors';
import { useLanguage } from '../../../context/LanguageContext';
import { cn } from '../../../utils/cn';

export interface ColorPickerProps {
  selectedColorId: string;
  onSelectColor: (color: HairColor) => void;
  className?: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColorId,
  onSelectColor,
  className = '',
}) => {
  const { language, t } = useLanguage();

  const activeColor = hairColors.find((c) => c.id === selectedColorId) || hairColors[0];

  return (
    <div className={cn('color-picker-wrap', className)}>
      <div className="color-swatches-grid" role="radiogroup" aria-label="Палитра оттенков">
        {hairColors.map((color) => {
          const isSelected = color.id === selectedColorId;
          const localizedName = color.name[language];

          return (
            <button
              key={color.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={cn('color-swatch-item', isSelected && 'color-swatch-item--active')}
              onClick={() => onSelectColor(color)}
              title={`${localizedName} (${color.priceMultiplier > 1 ? `+${Math.round((color.priceMultiplier - 1) * 100)}%` : 'Стандарт'})`}
            >
              <span
                className="color-dot-indicator"
                style={{ backgroundColor: color.hex }}
              />
              <div className="color-meta-info">
                <span className="color-name-label">{localizedName}</span>
                <span className="color-multiplier-tag">
                  {color.priceMultiplier > 1
                    ? `+${Math.round((color.priceMultiplier - 1) * 100)}% к базе`
                    : 'Базовая цена'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {activeColor && (
        <div className="color-selected-preview">
          <div className="color-preview-left">
            <span
              className="color-preview-circle"
              style={{ backgroundColor: activeColor.hex }}
            />
            <span className="color-preview-text">
              {t.customOrder.colorSelected} <strong>{activeColor.name[language]}</strong>
            </span>
          </div>
          <span className="color-preview-badge">
            Коэф. {activeColor.priceMultiplier.toFixed(2)}x
          </span>
        </div>
      )}
    </div>
  );
};
