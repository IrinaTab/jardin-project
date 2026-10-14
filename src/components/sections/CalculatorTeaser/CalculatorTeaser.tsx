// src/components/sections/CalculatorTeaser/CalculatorTeaser.tsx

import React from 'react';
import './CalculatorTeaser.css';
import { useLanguage } from '../../../context/LanguageContext';
import { SectionHeader } from '../../ui/SectionHeader';
import { Button } from '../../ui/Button';
import { Icon } from '../../ui/Icon';

export interface CalculatorTeaserProps {
    onOpenCalculator: () => void;
    className?: string;
}

export const CalculatorTeaser: React.FC<CalculatorTeaserProps> = ({
    onOpenCalculator,
    className = '',
}) => {
    const { t } = useLanguage();

    const tips = [
        {
            id: 'shape',
            icon: 'crown' as const,
            title: t.calculatorTips.shapeTitle,
            text: t.calculatorTips.shapeText,
        },
        {
            id: 'length',
            icon: 'feather' as const,
            title: t.calculatorTips.lengthTitle,
            text: t.calculatorTips.lengthText,
        },
        {
            id: 'color',
            icon: 'sparkles' as const,
            title: t.calculatorTips.colorTitle,
            text: t.calculatorTips.colorText,
        },
        {
            id: 'care',
            icon: 'shield' as const,
            title: t.calculatorTips.careTitle,
            text: t.calculatorTips.careText,
        },
    ];

    return (
        <section
            className={`section calculator-teaser-section ${className}`}
            id="calculator-teaser"
        >
            <div className="container">
                <SectionHeader
                    badge={t.calculatorTips.badge}
                    title={t.calculatorTips.title}
                    subtitle={t.calculatorTips.subtitle}
                />

                <div className="calculator-teaser__grid">
                    {tips.map((tip) => (
                        <div key={tip.id} className="calculator-teaser__card">
                            <div className="calculator-teaser__icon-box">
                                <Icon name={tip.icon} size={26} />
                            </div>
                            <h3 className="calculator-teaser__card-title">{tip.title}</h3>
                            <p className="calculator-teaser__card-text">{tip.text}</p>
                        </div>
                    ))}
                </div>

                <div className="calculator-teaser__actions">
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={onOpenCalculator}
                        icon={<Icon name="sparkles" size={18} className="btn-sparkle-icon" />}
                    >
                        {t.calculatorTips.openButton}
                    </Button>
                    <p className="calculator-teaser__note">{t.calculatorTips.note}</p>
                </div>
            </div>
        </section>
    );
};