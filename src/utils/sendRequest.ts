// src/utils/sendRequest.ts

import { CustomOrderRequest } from '../types';
import { sendTelegramMessage } from './sendTelegramMessage';

export interface FeedbackRequestData {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  preferredMethod?: string;
}

export async function sendRequest(
  data: CustomOrderRequest | FeedbackRequestData
): Promise<{ success: boolean; message?: string }> {
  try {
    let messageText = '';

    if ('shape' in data) {
      // Custom Order Request
      messageText =
        `✨ <b>НОВАЯ ЗАЯВКА НА ПОШИВ (Jardin Atelier)</b>\n\n` +
        `👤 <b>Клиент:</b> ${data.name}\n` +
        `📞 <b>Телефон:</b> ${data.phone}\n` +
        `✉️ <b>Email:</b> ${data.email || 'Не указан'}\n` +
        `💇‍♀️ <b>Форма:</b> ${data.shape}\n` +
        `📏 <b>Длина:</b> ${data.lengthCm} см\n` +
        `🎨 <b>Оттенок:</b> ${data.colorName} (${data.colorId})\n` +
        `💰 <b>Расчетная сумма:</b> ${data.calculatedPrice.toLocaleString('ru-RU')} €\n` +
        `💬 <b>Способ связи:</b> ${data.contactMethod || 'Любой'}\n` +
        (data.comment ? `📝 <b>Комментарий:</b> ${data.comment}\n` : '');
    } else {
      // General feedback inquiry
      messageText =
        `📩 <b>НОВОЕ ОБРАЩЕНИЕ С САЙТА (Jardin)</b>\n\n` +
        `👤 <b>Имя:</b> ${data.name}\n` +
        `📞 <b>Телефон:</b> ${data.phone}\n` +
        `✉️ <b>Email:</b> ${data.email || 'Не указан'}\n` +
        (data.preferredMethod ? `💬 <b>Способ связи:</b> ${data.preferredMethod}\n` : '') +
        (data.message ? `📝 <b>Сообщение:</b> ${data.message}\n` : '');
    }

    // Save locally for persistence / demonstration
    try {
      const existingInquiries = JSON.parse(localStorage.getItem('jardin_inquiries') || '[]');
      existingInquiries.push({ ...data, createdAt: new Date().toISOString() });
      localStorage.setItem('jardin_inquiries', JSON.stringify(existingInquiries));
    } catch {
      // ignore localStorage errors
    }

    // Send Telegram Notification
    await sendTelegramMessage(messageText);

    // Simulate short network latency for realism
    await new Promise((resolve) => setTimeout(resolve, 600));

    return { success: true };
  } catch (err) {
    console.error('sendRequest error:', err);
    return {
      success: false,
      message: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}