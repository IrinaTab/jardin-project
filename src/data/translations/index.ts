import { ru } from './ru';
import { en } from './en';
import { es } from './es';

export type Language = 'ru' | 'en' | 'es';
export const translations = { ru, en, es };
export type TranslationKey = keyof typeof ru;
export type TranslationsType = typeof ru;
