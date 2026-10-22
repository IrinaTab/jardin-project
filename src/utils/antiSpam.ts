// src/utils/antiSpam.ts

/**
 * Проверка на бота: honeypot + время заполнения.
 *
 * @param honeypotValue — значение скрытого поля (должно быть пустым)
 * @param startTime — timestamp начала заполнения формы (Date.now())
 * @returns true, если запрос от бота (нужно заблокировать)
 */
export function isSpamBot(honeypotValue: string, startTime: number): boolean {
    // 1. Honeypot: если поле заполнено — это бот
    if (honeypotValue.trim() !== '') {
        return true;
    }

    // 2. Время заполнения: меньше 3 секунд — почти наверняка бот
    const elapsedMs = Date.now() - startTime;
    const MIN_FILL_TIME_MS = 3000;

    if (elapsedMs < MIN_FILL_TIME_MS) {
        return true;
    }

    return false;
}