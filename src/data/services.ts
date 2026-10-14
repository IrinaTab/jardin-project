import { ProductShape, LengthOption } from '../types';

export const productShapes: ProductShape[] = [
  {
    id: 'wig',
    name: { ru: 'Полный парик на шелковой основе', en: 'Full Lace & Silk Base Wig', es: 'Peluca completa con base de seda' },
    basePrice: 1200,
    priceMultiplier: 1.0,
    description: {
      ru: 'Индивидуальная шапочка по меркам вашей головы с шелковой вставкой 10×10 см для безупречного пробора.',
      en: 'Custom cap crafted to your head measurements with a 10×10cm silk insert for realistic parting.',
      es: 'Gorro personalizado a sus medidas con inserto de seda de 10×10 cm para una raya impecable.',
    },
  },
  {
    id: 'topper',
    name: { ru: 'Накладка / Топпер на макушку', en: 'Crown Volume Topper', es: 'Prótesis capilar / Topper coronilla' },
    basePrice: 650,
    priceMultiplier: 1.0,
    description: {
      ru: 'Легкая маскировочная основа с тамбуровкой для придания прикорневого объема и перекрытия пробора.',
      en: 'Featherlight piece designed to blend with your bio-hair and add volume at the crown.',
      es: 'Pieza ultraligera diseñada para fundirse con su cabello y aportar volumen en la coronilla.',
    },
  },
  {
    id: 'bangs',
    name: { ru: 'Челка на микроклипсах', en: 'Clip-In Front Bangs', es: 'Flequillo con micro-clips' },
    basePrice: 250,
    priceMultiplier: 1.0,
    description: {
      ru: 'Градуированная или прямая челка с удлиненными боковыми прядями без необходимости стричь свои волосы.',
      en: 'Graduated or straight bangs with elongated face-framing strands without cutting bio-hair.',
      es: 'Flequillo desfilado o recto con mechones laterales sin necesidad de cortar el propio cabello.',
    },
  },
  {
    id: 'strands',
    name: { ru: 'Пряди / Трессы на заколках', en: 'Clip-in & Hand-Tied Strands', es: 'Mechas y tiras de quita y pon' },
    basePrice: 300,
    priceMultiplier: 1.0,
    description: {
      ru: 'Комплект акцентных прядей для загущения висков или создания ярких цветовых акцентов.',
      en: 'Set of custom density strands to accentuate temples or create chemical-free highlights.',
      es: 'Juego de mechas para aportar densidad en sienes o crear reflejos sin químicos.',
    },
  },
  {
    id: 'wefts',
    name: { ru: 'Голливудские трессы ручной работы', en: 'Hand-Crafted Hollywood Wefts', es: 'Cortinas tejidas a mano Hollywood' },
    basePrice: 500,
    priceMultiplier: 1.0,
    description: {
      ru: 'Ручное плетение тресса с минимальной толщиной шва для наращивания на микрокосичку.',
      en: 'Finely knotted micro-seam wefts for the gentle braid attachment method.',
      es: 'Costura milimétrica tejida a mano para el método de extensión sobre microtrenza.',
    },
  },
];

export const lengthOptions: LengthOption[] = [
  { lengthCm: 30, priceMultiplier: 0.7 },
  { lengthCm: 40, priceMultiplier: 0.85 },
  { lengthCm: 50, priceMultiplier: 1.0 },
  { lengthCm: 60, priceMultiplier: 1.25 },
  { lengthCm: 70, priceMultiplier: 1.6 },
];