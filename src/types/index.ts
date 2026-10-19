// src/types/index.ts

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

export interface ProductShape {
  id: 'wig' | 'topper' | 'bangs' | 'strands' | 'wefts';
  name: LocalizedText;
  priceMultiplier: number;
  basePrice: number;
  description: LocalizedText;
}

export interface LengthOption {
  lengthCm: number;
  priceMultiplier: number;
}

/**
 * Позиция индивидуального заказа в корзине.
 * Каждая позиция — уникальная конфигурация (форма + длина + цвет + количество).
 */
export interface CustomOrderCartItem {
  id: string;
  shapeId: 'wig' | 'topper' | 'bangs' | 'strands' | 'wefts';
  shapeName: LocalizedText;
  lengthCm: number;
  colorId: string;
  colorName: LocalizedText;
  colorHex: string;
  quantity: number;
  unitPrice: number;
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

export interface GalleryItem {
  id: string;
  imageUrl: string;
  title: LocalizedText;
  category: string;
  description: LocalizedText;
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
  hideOrderButton?: boolean;
}
export interface VideoItem {
  id: string;
  videoUrl: string;
  posterUrl?: string;
  title: LocalizedText;
  description?: LocalizedText;
}

export type PageType = 'home' | 'gallery' | 'about' | 'contacts' | 'privacy' | 'calculator';