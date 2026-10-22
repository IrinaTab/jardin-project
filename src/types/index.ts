// src/types/index.ts

/**
 * Единственный источник истины для типа языка.
 * Все остальные модули импортируют Language отсюда.
 */
export type Language = 'ru' | 'en' | 'es';

export interface LocalizedText {
  ru: string;
  en: string;
  es: string;
}

export type ProductCategory = 'wigs' | 'toppers' | 'wefts' | 'bangs' | 'strands';

export interface Product {
  id: string;
  name: LocalizedText;
  category: ProductCategory;
  description: LocalizedText;
  price: number;
  image: string;
  hairType: LocalizedText;
  lengthCm: number;
  density?: string;
  isPopular?: boolean;
  inStock: boolean;
}

export interface HairColor {
  id: string;
  name: LocalizedText;
  hex: string;
  priceMultiplier: number;
  toneCategory: 'blonde' | 'brown' | 'dark' | 'copper' | 'grey';
}

export type ProductShapeId =
  | 'wig-full'
  | 'wig-bangs-no-imit'
  | 'wig-bangs-silk'
  | 'wig-topper-small'
  | 'wig-topper-medium'
  | 'wig-topper-deep'
  | 'wig-bun';

export interface ProductShape {
  id: ProductShapeId;
  name: LocalizedText;
  description: LocalizedText;
  icon?: string;
}

export interface LengthOption {
  lengthCm: number;
  priceMultiplier: number;
}

/**
 * Категория волос (качество).
 */
export type HairCategoryId = 'luxe' | 'premium' | 'slavic-gold' | 'exclusive';

/**
 * Позиция индивидуального заказа в корзине.
 */
export interface CustomOrderCartItem {
  id: string;
  shapeId: ProductShapeId;
  shapeName: LocalizedText;
  lengthCm: number;
  extraWeightGrams: number;
  totalWeightGrams: number;
  hairCategory: HairCategoryId;
  hairCategoryName: LocalizedText;
  colorId: string;
  colorName: LocalizedText;
  colorHex: string;
  quantity: number;
  unitPrice: number;
}

/**
 * Конфиг категории волос.
 */
export interface HairCategoryConfig {
  id: HairCategoryId;
  name: LocalizedText;
  description: LocalizedText;
  /** Максимально доступная длина (см) */
  maxLength: number;
  /** Цена за 100 г по порогам длины */
  pricePer100g: {
    upTo50: number;
    from50To60: number;
    from60To70?: number;
  };
}

export interface CustomOrderRequest {
  name: string;
  phone: string;
  email: string;
  shape: string;
  lengthCm: number;
  colorId: string;
  colorName: string;
  calculatedPrice: number;
  comment?: string;
  contactMethod?: 'telegram' | 'whatsapp' | 'phone' | 'email';
  agreedToPrivacy: boolean;
}

export interface Advantage {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  icon: string;
}

export interface ContactInfo {
  phone: string;
  phoneRaw: string;
  email: string;
  address: LocalizedText;
  workingHours: LocalizedText;
  telegram: string;
  whatsapp: string;
  instagram: string;
  tiktok: string;
  facebook: string;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  title: LocalizedText;
  category: string;
  description: LocalizedText;
  /** Скрыть кнопку «Заказать похожее» в PhotoModal (для служебных фото) */
  hideOrderButton?: boolean;
}

export interface VideoItem {
  id: string;
  videoUrl: string;
  posterUrl?: string;
  title: LocalizedText;
  description?: LocalizedText;
}

export type PageType =
  | 'home'
  | 'gallery'
  | 'about'
  | 'contacts'
  | 'privacy'
  | 'calculator'
  | 'course';

/**
 * Контекст, с которым открыта модалка формы запроса.
 * Влияет на текст окна успеха.
 */
export type RequestModalMode = 'question' | 'course' | 'custom';