// src/utils/formatPhone.ts

/**
 * Мягкая нормализация телефонного номера.
 * Убирает всё, кроме цифр, пробелов, дефисов, круглых скобок и ведущего "+".
 * Не навязывает страновой формат — подходит для международных номеров.
 */
export function formatPhone(value: string): string {
  if (!value) return '';
  return value.replace(/[^\d\s()+-]/g, '');
}

/**
 * Универсальная валидация номера телефона.
 * Проверяет только, что в номере достаточно цифр (от 8 до 15 — стандарт E.164).
 */
export function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  return digits.length >= 8 && digits.length <= 15;
}