// src/pages/CalculatorPage/CalculatorPage.tsx

import React from 'react';
import './CalculatorPage.css';
import { PageType } from '../../types';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useLanguage } from '../../context/LanguageContext';
import { CustomOrder } from '../../components/sections/CustomOrder';

export interface CalculatorPageProps {
    onNavigate: (page: PageType) => void;
}

export const CalculatorPage: React.FC<CalculatorPageProps> = ({ onNavigate: _onNavigate }) => {
    const { t } = useLanguage();
    useDocumentTitle(t.nav.calculator, t.customOrder.subtitle);

    return (
        <div className="calculator-page fade-in">
            <CustomOrder />
        </div>
    );
};