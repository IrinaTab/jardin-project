// src/context/ModalContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { GalleryItem, Product, VideoItem } from '../types';

interface ModalContextType {
  activePhoto: GalleryItem | null;
  openPhotoModal: (item: GalleryItem) => void;
  closePhotoModal: () => void;

  activeVideo: VideoItem | null;
  openVideoModal: (item: VideoItem) => void;
  closeVideoModal: () => void;

  isRequestModalOpen: boolean;
  requestModalTitle: string;
  openRequestModal: (title?: string) => void;
  closeRequestModal: () => void;

  isContactChoiceOpen: boolean;
  contactChoiceData: { title?: string; onSelectMethod?: (method: string) => void } | null;
  openContactChoiceModal: (data?: { title?: string; onSelectMethod?: (method: string) => void }) => void;
  closeContactChoiceModal: () => void;

  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestModalTitle, setRequestModalTitle] = useState('');
  const [isContactChoiceOpen, setIsContactChoiceOpen] = useState(false);
  const [contactChoiceData, setContactChoiceData] = useState<{
    title?: string;
    onSelectMethod?: (method: string) => void;
  } | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const openPhotoModal = (item: GalleryItem) => setActivePhoto(item);
  const closePhotoModal = () => setActivePhoto(null);

  const openVideoModal = (item: VideoItem) => setActiveVideo(item);
  const closeVideoModal = () => setActiveVideo(null);

  const openRequestModal = (title?: string) => {
    setRequestModalTitle(title || '');
    setIsRequestModalOpen(true);
  };
  const closeRequestModal = () => {
    setIsRequestModalOpen(false);
    setRequestModalTitle('');
  };

  const openContactChoiceModal = (data?: { title?: string; onSelectMethod?: (method: string) => void }) => {
    setContactChoiceData(data || null);
    setIsContactChoiceOpen(true);
  };
  const closeContactChoiceModal = () => {
    setIsContactChoiceOpen(false);
    setContactChoiceData(null);
  };

  const openQuickView = (product: Product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  return (
    <ModalContext.Provider
      value={{
        activePhoto,
        openPhotoModal,
        closePhotoModal,
        activeVideo,
        openVideoModal,
        closeVideoModal,
        isRequestModalOpen,
        requestModalTitle,
        openRequestModal,
        closeRequestModal,
        isContactChoiceOpen,
        contactChoiceData,
        openContactChoiceModal,
        closeContactChoiceModal,
        quickViewProduct,
        openQuickView,
        closeQuickView,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export function useModal(): ModalContextType {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}