// src/components/sections/Advantages/AdvantagesSection.tsx

import React from 'react';
import './Advantages.css';
import { advantages } from '../../../data/advantages';
import { useLanguage } from '../../../context/LanguageContext';
import { SectionHeader } from '../../ui/SectionHeader';
import { AdvantageCard } from './AdvantageCard';

export const AdvantagesSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="section advantages-section" id="advantages">
      <div className="container">
        <SectionHeader
          badge={t.advantages.badge}
          title={t.advantages.title}
          subtitle={t.advantages.subtitle}
          variant="dark"
        />

        <div className="advantages-grid">
          {advantages.map((item) => (
            <AdvantageCard key={item.id} advantage={item} />
          ))}
        </div>
      </div>
    </section>
  );
};