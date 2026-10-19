// src/context/CartContext.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CustomOrderCartItem } from '../types';

interface CartContextType {
  items: CustomOrderCartItem[];
  addCustomOrderItem: (item: Omit<CustomOrderCartItem, 'id'>) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalCount: number;
  totalPrice: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * Обновлено на v3 — структура позиции расширена:
 * extraWeightGrams, totalWeightGrams, isPremiumHair.
 */
const CART_STORAGE_KEY = 'jardin_custom_order_cart_v3';

/**
 * Валидация позиции корзины, загруженной из localStorage.
 * Защищает приложение от падения, если в хранилище лежат
 * данные старого/повреждённого формата.
 */
function isValidCartItem(item: unknown): item is CustomOrderCartItem {
  if (!item || typeof item !== 'object') return false;
  const it = item as Record<string, unknown>;

  return (
    typeof it.id === 'string' &&
    typeof it.shapeId === 'string' &&
    it.shapeName !== null &&
    typeof it.shapeName === 'object' &&
    typeof (it.shapeName as Record<string, unknown>).ru === 'string' &&
    typeof (it.shapeName as Record<string, unknown>).en === 'string' &&
    typeof (it.shapeName as Record<string, unknown>).es === 'string' &&
    typeof it.lengthCm === 'number' &&
    typeof it.extraWeightGrams === 'number' &&
    typeof it.totalWeightGrams === 'number' &&
    typeof it.isPremiumHair === 'boolean' &&
    typeof it.colorId === 'string' &&
    it.colorName !== null &&
    typeof it.colorName === 'object' &&
    typeof (it.colorName as Record<string, unknown>).ru === 'string' &&
    typeof (it.colorName as Record<string, unknown>).en === 'string' &&
    typeof (it.colorName as Record<string, unknown>).es === 'string' &&
    typeof it.colorHex === 'string' &&
    typeof it.quantity === 'number' &&
    typeof it.unitPrice === 'number'
  );
}

function loadCartFromStorage(): CustomOrderCartItem[] {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return [];

    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(isValidCartItem);
  } catch {
    return [];
  }
}

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CustomOrderCartItem[]>(loadCartFromStorage);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Could not save cart to localStorage', e);
    }
  }, [items]);

  const addCustomOrderItem = (item: Omit<CustomOrderCartItem, 'id'>) => {
    const newItem: CustomOrderCartItem = {
      ...item,
      id: `order-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    };
    setItems((prev) => [...prev, newItem]);
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setItems([]);

  const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider
      value={{
        items,
        addCustomOrderItem,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCount,
        totalPrice,
        isCartOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}