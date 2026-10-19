// src/data/services.ts

import { ProductShape } from '../types';

/**
 * Типы изделий в калькуляторе.
 * Цены и веса — в src/data/pricing.ts (единый конфиг).
 */
export const productShapes: ProductShape[] = [
  {
    id: 'wig-bangs-no-imit',
    name: {
      ru: 'Чёлка без имитации кожи головы',
      en: 'Bangs without Scalp Imitation',
      es: 'Flequillo sin Imitación de Cuero Cabelludo',
    },
    description: {
      ru: 'Лёгкая чёлка на клипсах без имитации пробора. Простая посадка, естественная густота.',
      en: 'Light clip-in bangs without parting imitation. Simple fit, natural density.',
      es: 'Flequillo ligero con clips sin imitación de raya. Ajuste simple, densidad natural.',
    },
    icon: 'feather',
  },
  {
    id: 'wig-bangs-silk',
    name: {
      ru: 'Чёлка с имитацией (Silk Top)',
      en: 'Bangs with Silk Top Imitation',
      es: 'Flequillo con Imitación Silk Top',
    },
    description: {
      ru: 'Чёлка с имитацией кожи головы — невидимый пробор и максимальная естественность.',
      en: 'Bangs with scalp imitation — invisible parting and maximum naturalness.',
      es: 'Flequillo con imitación de cuero cabelludo — raya invisible y máxima naturalidad.',
    },
    icon: 'sparkles',
  },
  {
    id: 'wig-topper-small',
    name: {
      ru: 'Накладка маленькая',
      en: 'Small Hair Topper',
      es: 'Topper Pequeño',
    },
    description: {
      ru: 'Минимальная зона покрытия — для небольших залысин и редких участков.',
      en: 'Minimal coverage area — for small thinning spots.',
      es: 'Área de cobertura mínima — para pequeñas zonas ralas.',
    },
    icon: 'crown',
  },
  {
    id: 'wig-topper-medium',
    name: {
      ru: 'Накладка среднего размера',
      en: 'Medium Hair Topper',
      es: 'Topper Mediano',
    },
    description: {
      ru: 'Средняя зона покрытия — пробор и макушка. Оптимальный баланс площади и комфорта.',
      en: 'Medium coverage area — parting and crown. Optimal balance of coverage and comfort.',
      es: 'Área de cobertura media — raya y coronilla. Equilibrio óptimo entre cobertura y confort.',
    },
    icon: 'crown',
  },
  {
    id: 'wig-topper-deep',
    name: {
      ru: 'Накладка глубокая',
      en: 'Deep Hair Topper',
      es: 'Topper Profundo',
    },
    description: {
      ru: 'Расширенная зона покрытия — от пробора до затылка. Для существенных зон поредения.',
      en: 'Extended coverage area — from parting to crown back. For significant thinning zones.',
      es: 'Área de cobertura ampliada — desde la raya hasta la coronilla trasera.',
    },
    icon: 'crown',
  },
  {
    id: 'wig-full',
    name: {
      ru: 'Полная система замещения волос',
      en: 'Full Hair Replacement System',
      es: 'Sistema Completo de Sustitución',
    },
    description: {
      ru: 'Полный парик или система на швейцарской сетке. Максимальная тамбуровка, Silk Top, анатомическая посадка.',
      en: 'Full wig or Swiss lace system. Maximum hand-ventilation, Silk Top, anatomical fit.',
      es: 'Peluca completa o sistema en encaje suizo. Ventilación máxima, Silk Top, ajuste anatómico.',
    },
    icon: 'diamond',
  },
  {
    id: 'wig-bun',
    name: {
      ru: 'Шиньон',
      en: 'Hair Bun / Chignon',
      es: 'Moño / Chignon',
    },
    description: {
      ru: 'Шиньон на трессах. Волосы подбираются по запросу: вес, длина, оттенок.',
      en: 'Hair bun on wefts. Hair is customized: weight, length, shade.',
      es: 'Moño sobre cortinas. Cabello personalizado: peso, longitud, tono.',
    },
    icon: 'crown',
  },
];