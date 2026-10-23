// src/utils/sendRequest.ts

import { CustomOrderRequest } from '../types';
import { sendTelegramMessage, escapeHtml } from './sendTelegramMessage';

export interface FeedbackRequestData {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  preferredMethod?: string;
  /** Контекст формы: 'contact' | 'question' | 'course' | 'custom' */
  formType?: 'contact' | 'question' | 'course' | 'custom';
  /** Язык, на котором заполнена форма */
  language?: 'ru' | 'en' | 'es';
}

// ============================================
// Константы форматирования
// ============================================

const FORM_HEADERS: Record<string, string> = {
  contact: '📩 <b>НОВОЕ ОБРАЩЕНИЕ С ФОРМЫ КОНТАКТОВ</b>',
  question: '❓ <b>ВОПРОС МАСТЕРУ С САЙТА</b>',
  course: '🎓 <b>ЗАЯВКА НА КУРС</b>',
  custom: '🛒 <b>НОВАЯ ЗАЯВКА НА ПОШИВ</b>',
};

const LANG_LABELS: Record<string, string> = {
  ru: '🇷🇺 Русский',
  en: '🇬🇧 English',
  es: '🇪🇸 Español',
};

const METHOD_LABELS: Record<string, string> = {
  telegram: 'Telegram',
  whatsapp: 'WhatsApp',
  phone: '📞 Звонок',
  email: '✉️ Email',
};

function formatDateTime(): string {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, '0');
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const yyyy = now.getFullYear();
  const hh = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');
  return `${dd}.${mm}.${yyyy}, ${hh}:${min}`;
}

// ============================================
// Обычное обращение (контакты / вопрос / курс)
// ============================================

function formatFeedbackMessage(data: FeedbackRequestData): string {
  const lines: string[] = [];

  // Заголовок
  lines.push(FORM_HEADERS[data.formType || 'contact']);
  lines.push('━━━━━━━━━━━━━━━━━━━━');
  lines.push('');

  // Контактные данные (экранируем пользовательский ввод!)
  lines.push(`👤 <b>Имя:</b> ${escapeHtml(data.name)}`);
  lines.push(`📞 <b>Телефон:</b> ${escapeHtml(data.phone)}`);
  if (data.email) {
    lines.push(`✉️ <b>Email:</b> ${escapeHtml(data.email)}`);
  }

  // Способ связи
  if (data.preferredMethod) {
    const methodKey = data.preferredMethod.toLowerCase();
    const methodLabel = METHOD_LABELS[methodKey] || escapeHtml(data.preferredMethod);
    lines.push(`💬 <b>Способ связи:</b> ${methodLabel}`);
  }

  lines.push('');

  // Сообщение (экранируем!)
  if (data.message) {
    const msg = data.message.length > 3000
      ? data.message.slice(0, 3000) + '...'
      : data.message;
    lines.push('📝 <b>Сообщение:</b>');
    lines.push(escapeHtml(msg));
    lines.push('');
  }

  // Футер
  lines.push('━━━━━━━━━━━━━━━━━━━━');
  if (data.language) {
    lines.push(`🌐 ${LANG_LABELS[data.language] || data.language}`);
  }
  lines.push(`🕐 ${formatDateTime()}`);

  return lines.join('\n');
}

// ============================================
// Заявка на пошив (состав корзины)
// ============================================

function formatCustomOrderMessage(data: CustomOrderRequest): string {
  const lines: string[] = [];

  lines.push(FORM_HEADERS.custom);
  lines.push('━━━━━━━━━━━━━━━━━━━━');
  lines.push('');

  // Клиент (экранируем!)
  lines.push(`👤 <b>Имя:</b> ${escapeHtml(data.name)}`);
  lines.push(`📞 <b>Телефон:</b> ${escapeHtml(data.phone)}`);
  if (data.email) {
    lines.push(`✉️ <b>Email:</b> ${escapeHtml(data.email)}`);
  }
  if (data.contactMethod) {
    const methodLabel = METHOD_LABELS[data.contactMethod] || escapeHtml(data.contactMethod);
    lines.push(`💬 <b>Способ связи:</b> ${methodLabel}`);
  }

  lines.push('');

  // Состав заявки (из comment) — это HTML, который мы сами сгенерировали
  // в CartModal, поэтому экранировать его НЕ нужно!
  if (data.comment) {
    lines.push('📦 <b>Состав заявки:</b>');
    lines.push('');
    lines.push(data.comment);
    lines.push('');
  }

  // Итоговая сумма
  lines.push('━━━━━━━━━━━━━━━━━━━━');
  lines.push(
    `💰 <b>Итого: ${data.calculatedPrice.toLocaleString('ru-RU')} €</b>`
  );
  lines.push('');

  // Футер
  lines.push(`🕐 ${formatDateTime()}`);

  return lines.join('\n');
}

// ============================================
// Главная функция
// ============================================

export async function sendRequest(
  data: CustomOrderRequest | FeedbackRequestData
): Promise<{ success: boolean; message?: string }> {
  try {
    let messageText = '';

    if ('shape' in data) {
      // Корзина — расширенный формат
      messageText = formatCustomOrderMessage(data);
    } else {
      // Обычная форма
      messageText = formatFeedbackMessage(data);
    }

    // Сохраняем локально (для резервной копии)
    try {
      const existingInquiries = JSON.parse(
        localStorage.getItem('jardin_inquiries') || '[]'
      );
      existingInquiries.push({
        ...data,
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem(
        'jardin_inquiries',
        JSON.stringify(existingInquiries)
      );
    } catch {
      // ignore
    }

    // Отправка в Telegram
    const isSent = await sendTelegramMessage(messageText);

    if (!isSent) {
      throw new Error('Не удалось отправить сообщение в Telegram');
    }

    // Небольшая задержка для реализма
    await new Promise((resolve) => setTimeout(resolve, 400));

    return { success: true };
  } catch (err) {
    console.error('sendRequest error:', err);
    return {
      success: false,
      message: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}