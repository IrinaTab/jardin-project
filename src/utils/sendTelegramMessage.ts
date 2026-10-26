// src/utils/sendTelegramMessage.ts

/**
 * Экранирует спецсимволы HTML, чтобы пользовательский ввод
 * не ломал разметку при отправке в Telegram (parse_mode: 'HTML').
 */
export function escapeHtml(text: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Отправляет уведомление на наш собственный API (Vercel Serverless),
 * который уже переправляет его в Telegram.
 */
export async function sendTelegramMessage(text: string): Promise<boolean> {
  try {
    if (import.meta.env.DEV) {
      console.info('🔧 [DEV] Simulating Telegram dispatch via API. Message text:');
      console.info(text);
      return true;
    }

    const response = await fetch('/api/send-telegram', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('API error:', errorData);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Failed to send Telegram message via API:', error);
    return false;
  }
}