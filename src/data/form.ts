// src/data/form.ts

export const initialCustomOrderForm = {
  name: '',
  phone: '',
  email: '',
  shape: 'wig',
  lengthCm: 50,
  colorId: 'medium-brown',
  comment: '',
  contactMethod: 'telegram' as const,
  agreedToPrivacy: false,
};