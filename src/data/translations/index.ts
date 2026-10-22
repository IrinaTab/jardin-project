// src/data/translations/index.ts

import { ru } from './ru';
import { en } from './en';
import { es } from './es';

/**
 * Единый источник истины для типа языка — src/types/index.ts.
 * Реэкспортируем, чтобы существующие импорты
 *   import { Language } from '../data/translations'
 * продолжали работать без изменений.
 */
export type { Language } from '../../types';

export const translations = { ru, en, es };

/**
 * Тип всех доступных переводов (структура ru-объекта).
 * Полезен для типизации функций, принимающих словарь.
 */
export type TranslationsType = typeof ru;