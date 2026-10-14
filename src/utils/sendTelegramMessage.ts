/**
 * Sends a notification message to a Telegram chat using Telegram Bot API
 */
export async function sendTelegramMessage(text: string): Promise<boolean> {
  const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.info('Telegram credentials not configured in env (VITE_TELEGRAM_BOT_TOKEN / VITE_TELEGRAM_CHAT_ID). Simulating dispatch:');
    console.info(text);
    return true;
  }

  try {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Failed to send Telegram message:', error);
    return false;
  }
}
