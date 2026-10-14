// src/utils/formatPrice.ts

/**
 * Форматирует число в читаемую цену с валютой.
 * Пример: 185000 -> "185 000 €"
 *
 * @param price — число
 * @param currency — символ валюты, по умолчанию евро
 * @param locale — 'ru' | 'en' | 'es' — влияет на формат разделителей
 */
export function formatPrice(
  price: number,
  currency: string = '€',
  locale: string = 'ru-RU'
): string {
  const intlLocale =
    locale === 'ru' ? 'ru-RU' :
      locale === 'es' ? 'es-ES' :
        locale === 'en' ? 'en-GB' :   // для евро лучше en-GB (европейский формат), чем en-US
          'ru-RU';

  const formatted = new Intl.NumberFormat(intlLocale, {
    maximumFractionDigits: 0,
  }).format(price);

  return `${formatted} ${currency}`;
}