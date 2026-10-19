/**
 * ЕДИНЫЙ КОНФИГ ЦЕН И КОЭФФИЦИЕНТОВ КАЛЬКУЛЯТОРА
 * ────────────────────────────────────────────────
 * Меняй значения здесь — калькулятор, корзина и все расчёты
 * обновятся автоматически. Больше нигде цены не дублируются.
 *
 * Все цены в EUR (€).
 */

// ============================================
// ЦЕНА ЗА ВОЛОСЫ (по весу)
// ============================================

/** Цена за 1 грамм стандартных волос (€) */
export const HAIR_PRICE_PER_GRAM_STANDARD = 2.50;

/** Цена за 1 грамм премиум-волос (некрашеные детские) (€) */
export const HAIR_PRICE_PER_GRAM_PREMIUM = 8.00;

/** Множитель для премиум-волос (8.00 / 2.50 = 3.2) */
export const PREMIUM_MULTIPLIER =
    HAIR_PRICE_PER_GRAM_PREMIUM / HAIR_PRICE_PER_GRAM_STANDARD;

// ============================================
// СТОИМОСТЬ РАБОТЫ ПО ТИПАМ ИЗДЕЛИЙ
// ============================================

export interface ShapePricing {
    /** Стоимость работы мастера (€) — без учёта волос */
    workPrice: number;
    /** Стандартный вес волос (г) — входит в базовую цену */
    standardWeight: number;
    /** Максимально доступная добавка густоты (г) */
    maxExtraWeight: number;
    /** Какие опции густоты доступны: 0, 50, 100, 200 */
    allowedExtraWeights: number[];
}

export const SHAPE_PRICING: Record<string, ShapePricing> = {
    'wig-full': {
        workPrice: 2000,
        standardWeight: 200,
        maxExtraWeight: 200,
        allowedExtraWeights: [0, 50, 100, 200],
    },
    'wig-bangs-no-imit': {
        workPrice: 225,
        standardWeight: 30,
        maxExtraWeight: 50,
        allowedExtraWeights: [0, 50],
    },
    'wig-bangs-silk': {
        workPrice: 425,
        standardWeight: 30,
        maxExtraWeight: 50,
        allowedExtraWeights: [0, 50],
    },
    'wig-topper-small': {
        workPrice: 600,
        standardWeight: 80,
        maxExtraWeight: 100,
        allowedExtraWeights: [0, 50, 100],
    },
    'wig-topper-medium': {
        workPrice: 900,
        standardWeight: 120,
        maxExtraWeight: 100,
        allowedExtraWeights: [0, 50, 100],
    },
    'wig-topper-deep': {
        workPrice: 1175,
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
// КОЭФФИЦИЕНТЫ ДЛИНЫ
// ============================================

export interface LengthCoefficient {
    lengthCm: number;
    multiplier: number;
}

export const LENGTH_COEFFICIENTS: LengthCoefficient[] = [
    { lengthCm: 30, multiplier: 0.85 },
    { lengthCm: 40, multiplier: 0.95 },
    { lengthCm: 50, multiplier: 1.00 },
    { lengthCm: 60, multiplier: 1.15 },
    { lengthCm: 70, multiplier: 1.30 },
];

/** Найти коэффициент по длине */
export function getLengthMultiplier(lengthCm: number): number {
    const found = LENGTH_COEFFICIENTS.find((l) => l.lengthCm === lengthCm);
    return found ? found.multiplier : 1.0;
}

// ============================================
// КОЭФФИЦИЕНТЫ ЦВЕТА — берутся из данных цвета
// (см. src/data/colors.ts — поле priceMultiplier)
// ============================================

// ============================================
// ФОРМУЛА РАСЧЁТА
// ============================================

export interface PriceCalculationInput {
    shapeId: string;
    extraWeightGrams: number;      // добавка к стандартному весу
    isPremiumHair: boolean;         // премиум-волосы (некрашеные детские)
    lengthCm: number;               // длина в см
    colorMultiplier: number;        // коэффициент цвета (из выбранного оттенка)
}

export interface PriceCalculationResult {
    workPrice: number;              // цена работы
    totalWeightGrams: number;       // общий вес (стандарт + добавка)
    hairPrice: number;              // цена волос (с учётом премиума)
    subtotal: number;               // работа + волосы (без коэффициентов)
    lengthMultiplier: number;       // коэффициент длины
    colorMultiplier: number;        // коэффициент цвета
    finalPrice: number;             // итог (округлён)
}

/**
 * Универсальная формула расчёта цены.
 *
 * Итог = (Работа + Вес_общий × Цена_за_грамм × Премиум) × Длина × Цвет
 */
export function calculatePrice(input: PriceCalculationInput): PriceCalculationResult {
    const pricing = SHAPE_PRICING[input.shapeId];

    if (!pricing) {
        return {
            workPrice: 0,
            totalWeightGrams: 0,
            hairPrice: 0,
            subtotal: 0,
            lengthMultiplier: 1,
            colorMultiplier: 1,
            finalPrice: 0,
        };
    }

    const workPrice = pricing.workPrice;
    const totalWeightGrams = pricing.standardWeight + input.extraWeightGrams;

    const pricePerGram = input.isPremiumHair
        ? HAIR_PRICE_PER_GRAM_PREMIUM
        : HAIR_PRICE_PER_GRAM_STANDARD;

    const hairPrice = totalWeightGrams * pricePerGram;
    const subtotal = workPrice + hairPrice;

    const lengthMultiplier = getLengthMultiplier(input.lengthCm);
    const colorMultiplier = input.colorMultiplier;

    const finalPrice = Math.round(subtotal * lengthMultiplier * colorMultiplier);

    return {
        workPrice,
        totalWeightGrams,
        hairPrice,
        subtotal,
        lengthMultiplier,
        colorMultiplier,
        finalPrice,
    };
}