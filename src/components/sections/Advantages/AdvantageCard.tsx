import React from 'react';
import { Advantage } from '../../../types';
import { useLanguage } from '../../../context/LanguageContext';
import { Icon, IconName } from '../../ui/Icon';

export interface AdvantageCardProps {
  advantage: Advantage;
}

export const AdvantageCard: React.FC<AdvantageCardProps> = ({ advantage }) => {
  const { language } = useLanguage();

  return (
    <div className="advantage-card">
      <div className="advantage-card__icon-box">
        <Icon name={(advantage.icon as IconName) || 'sparkles'} size={26} />
      </div>
      <h3 className="advantage-card__title">{advantage.title[language]}</h3>
      <p className="advantage-card__desc">{advantage.description[language]}</p>
    </div>
  );
};
