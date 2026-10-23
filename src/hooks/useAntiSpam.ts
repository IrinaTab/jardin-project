// src/hooks/useAntiSpam.ts

import { useState, useRef, useEffect } from 'react';
import { isSpamBot } from '../utils/antiSpam';

export function useAntiSpam(isFormActive: boolean = true) {
    const [honeypot, setHoneypot] = useState('');
    const formStartTime = useRef<number>(Date.now());

    // Сбрасываем таймер при каждом открытии формы
    useEffect(() => {
        if (isFormActive) {
            formStartTime.current = Date.now();
        }
    }, [isFormActive]);

    /**
     * Проверяет, является ли отправитель ботом.
     * Если да — возвращает true и очищает honeypot.
     */
    const checkBot = (): boolean => {
        const isBot = isSpamBot(honeypot, formStartTime.current);
        if (isBot) {
            setHoneypot(''); // Очищаем на всякий случай
        }
        return isBot;
    };

    /**
     * Сбрасывает таймер вручную (например, после отправки формы).
     */
    const resetTimer = () => {
        formStartTime.current = Date.now();
    };

    return {
        honeypot,
        setHoneypot,
        checkBot,
        resetTimer,
    };
}