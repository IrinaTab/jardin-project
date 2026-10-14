import { HairColor } from '../types';

export const hairColors: HairColor[] = [
  {
    id: 'nordic-blonde',
    name: {
      ru: 'Нордический блонд (№10.0)',
      en: 'Nordic Light Blonde (#10.0)',
      es: 'Rubio Nórdico Claro (#10.0)',
    },
    hex: '#F4E7BE',
    priceMultiplier: 1.25,
    toneCategory: 'blonde',
  },
  {
    id: 'ash-blonde',
    name: {
      ru: 'Пепельный блонд (№9.1)',
      en: 'Ash Blonde (#9.1)',
      es: 'Rubio Ceniza (#9.1)',
    },
    hex: '#D9C8A9',
    priceMultiplier: 1.2,
    toneCategory: 'blonde',
  },
  {
    id: 'wheat-blonde',
    name: {
      ru: 'Пшеничный блонд (№8.3)',
      en: 'Wheat Honey Blonde (#8.3)',
      es: 'Rubio Miel Trigo (#8.3)',
    },
    hex: '#CDB17F',
    priceMultiplier: 1.15,
    toneCategory: 'blonde',
  },
  {
    id: 'light-chestnut',
    name: {
      ru: 'Светло-русый / Ореховый (№7.0)',
      en: 'Light Chestnut / Hazel (#7.0)',
      es: 'Castaño Claro Avellana (#7.0)',
    },
    hex: '#9E7850',
    priceMultiplier: 1.08,
    toneCategory: 'brown',
  },
  {
    id: 'medium-brown',
    name: {
      ru: 'Классический русый (№6.0)',
      en: 'Classic Medium Brown (#6.0)',
      es: 'Castaño Medio Clásico (#6.0)',
    },
    hex: '#7A5230',
    priceMultiplier: 1.0,
    toneCategory: 'brown',
  },
  {
    id: 'rich-chocolate',
    name: {
      ru: 'Горький шоколад (№4.0)',
      en: 'Dark Rich Chocolate (#4.0)',
      es: 'Chocolate Oscuro (#4.0)',
    },
    hex: '#4A2E1B',
    priceMultiplier: 1.0,
    toneCategory: 'dark',
  },
  {
    id: 'espresso-black',
    name: {
      ru: 'Глубокий брюнет / Эспрессо (№2.0)',
      en: 'Deep Brunette / Espresso (#2.0)',
      es: 'Moreno Café Espresso (#2.0)',
    },
    hex: '#2B1C13',
    priceMultiplier: 1.0,
    toneCategory: 'dark',
  },
  {
    id: 'raven-black',
    name: {
      ru: 'Черный бархат (№1.0)',
      en: 'Velvet Raven Black (#1.0)',
      es: 'Negro Azabache Terciopelo (#1.0)',
    },
    hex: '#141416',
    priceMultiplier: 1.0,
    toneCategory: 'dark',
  },
  {
    id: 'venetian-copper',
    name: {
      ru: 'Венецианский медный (№7.4)',
      en: 'Venetian Warm Copper (#7.4)',
      es: 'Cobre Cálido Veneciano (#7.4)',
    },
    hex: '#A44E28',
    priceMultiplier: 1.12,
    toneCategory: 'copper',
  },
  {
    id: 'silver-pearl',
    name: {
      ru: 'Жемчужно-серебристый (№Silver)',
      en: 'Silver Pearl Grey (#Silver)',
      es: 'Gris Perla Plateado (#Silver)',
    },
    hex: '#C5C7CC',
    priceMultiplier: 1.22,
    toneCategory: 'grey',
  },
];
