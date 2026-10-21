// src/data/pricing.ts

import { HairCategoryConfig, HairCategoryId } from '../types';

/**
 * ЕДИНЫЙ КОНФИГ ЦЕН И КОЭФФИЦИЕНТОВ КАЛЬКУЛЯТОРА
 * ────────────────────────────────────────────────
 * Все цены в EUR (€).
 */

// ============================================
// КАТЕГОРИИ ВОЛОС (пороговая цена по длине)
// ============================================

export const HAIR_CATEGORIES: HairCategoryConfig[] = [
    {
        id: 'luxe',
        name: {
            ru: 'Luxe',
            en: 'Luxe',
            es: 'Luxe',
        },
        description: {
            ru: 'Светлые славянские волосы. До 60 см.',
            en: 'Light Slavic hair. Up to 60 cm.',
            es: 'Cabello eslavo claro. Hasta 60 cm.',
        },
        maxLength: 60,
        pricePer100g: {
            upTo50: 230,
            from50To60: 230,
        },
    },
    {
        id: 'premium',
        name: {
            ru: 'Premium',
            en: 'Premium',
            es: 'Premium',
        },
        description: {
            ru: 'Премиальные славянские волосы. До 60 см.',
            en: 'Premium Slavic hair. Up to 60 cm.',
            es: 'Cabello eslavo premium. Hasta 60 cm.',
        },
        maxLength: 60,
        pricePer100g: {
            upTo50: 330,
            from50To60: 350,
        },
    },
    {
        id: 'slavic-gold',
        name: {
            ru: 'Slavic Gold',
            en: 'Slavic Gold',
            es: 'Slavic Gold',
        },
        description: {
            ru: 'Золотой стандарт славянских волос. До 70 см.',
            en: 'Golden standard of Slavic hair. Up to 70 cm.',
            es: 'Estándar de oro del cabello eslavo. Hasta 70 cm.',
        },
        maxLength: 70,
        pricePer100g: {
            upTo50: 390,
            from50To60: 420,
            from60To70: 450,
        },
    },
    {
        id: 'exclusive',
        name: {
            ru: 'Exclusive',
            en: 'Exclusive',
            es: 'Exclusive',
        },
        description: {
            ru: 'Эксклюзивные волосы. До 70 см.',
            en: 'Exclusive hair. Up to 70 cm.',
            es: 'Cabello exclusivo. Hasta 70 cm.',
        },
        maxLength: 70,
        pricePer100g: {
            upTo50: 430,
            from50To60: 430,
            from60To70: 450,
        },
    },
];

/**
 * Получить цену за 100 г по категории и длине.
 * Возвращает цену за 1 г для расчёта.
 */
export function getHairPricePerGram(categoryId: HairCategoryId, lengthCm: number): number {
    const category = HAIR_CATEGORIES.find((c) => c.id === categoryId);
    if (!category) return 0;

    let pricePer100g = 0;
    if (lengthCm <= 50) {
        pricePer100g = category.pricePer100g.upTo50;
    } else if (lengthCm <= 60) {
        pricePer100g = category.pricePer100g.from50To60;
    } else if (lengthCm <= 70 && category.pricePer100g.from60To70) {
        pricePer100g = category.pricePer100g.from60To70;
    } else {
        // fallback — максимальная цена
        pricePer100g =
            category.pricePer100g.from60To70 ??
            category.pricePer100g.from50To60;
    }

    return pricePer100g / 100;
}

/**
 * Ограничить длину по категории (для UI-контроля).
 */
export function clampLengthByCategory(categoryId: HairCategoryId, lengthCm: number): number {
    const category = HAIR_CATEGORIES.find((c) => c.id === categoryId);
    if (!category) return lengthCm;
    return Math.min(lengthCm, category.maxLength);
}

// ============================================
// СТОИМОСТЬ РАБОТЫ (без волос)
// ============================================

export interface ShapePricing {
    /** Стоимость работы мастера (€) — без волос */
    workPrice: number;
    /** Стандартный вес волос (г) */
    standardWeight: number;
    /** Максимально доступная добавка густоты (г) */
    maxExtraWeight: number;
    /** Доступные опции густоты: 0, 50, 100, 200 */
    allowedExtraWeights: number[];
}

export const SHAPE_PRICING: Record<string, ShapePricing> = {
    'wig-full': {
        workPrice: 1840,
        standardWeight: 200,
        maxExtraWeight: 200,
        allowedExtraWeights: [0, 50, 100, 200],
    },
    'wig-bangs-no-imit': {
        workPrice: 201,
        standardWeight: 30,
        maxExtraWeight: 50,
        allowedExtraWeights: [0, 50],
    },
    'wig-bangs-silk': {
        workPrice: 401,
        standardWeight: 30,
        maxExtraWeight: 50,
        allowedExtraWeights: [0, 50],
    },
    'wig-topper-small': {
        workPrice: 536,
        standardWeight: 80,
        maxExtraWeight: 100,
        allowedExtraWeights: [0, 50, 100],
    },
    'wig-topper-medium': {
        workPrice: 804,
        standardWeight: 120,
        maxExtraWeight: 100,
        allowedExtraWeights: [0, 50, 100],
    },
    'wig-topper-deep': {
        workPrice: 1055,
        standardWeight: 150,
        maxExtraWeight: 100,
        allowedExtraWeights: [0, 50, 100],
    },
    'wig-bun': {
        workPrice: 300,
        standardWeight: 0,
        maxExtraWeight: 200,
        allowedExtraWeights: [0, 50, 100, 200],
    },
};

// ============================================
// ДЛИНА
// ============================================

export const LENGTH_OPTIONS = [30, 40, 50, 60, 70];

// ============================================
// ФОРМУЛА РАСЧЁТА
// ============================================

export interface PriceCalculationInput {
    shapeId: string;
    extraWeightGrams: number;
    hairCategoryId: HairCategoryId;
    lengthCm: number;
    colorMultiplier: number;
}

export interface PriceCalculationResult {
    workPrice: number;
    totalWeightGrams: number;
    hairPrice: number;
    finalPrice: number;
}

export function calculatePrice(input: PriceCalculationInput): PriceCalculationResult {
    const pricing = SHAPE_PRICING[input.shapeId];

    if (!pricing) {
        return {
            workPrice: 0,
            totalWeightGrams: 0,
            hairPrice: 0,
            finalPrice: 0,
        };
    }

    const workPrice = pricing.workPrice;
    const totalWeightGrams = pricing.standardWeight + input.extraWeightGrams;

    const pricePerGram = getHairPricePerGram(input.hairCategoryId, input.lengthCm);
    const hairPrice = totalWeightGrams * pricePerGram * input.colorMultiplier;

    const finalPrice = Math.round(workPrice + hairPrice);

    return {
        workPrice,
        totalWeightGrams,
        hairPrice: Math.round(hairPrice),
        finalPrice,
    };
}