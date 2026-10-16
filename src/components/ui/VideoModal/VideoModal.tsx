// src/components/ui/VideoModal/VideoModal.tsx

import React from 'react';
import './VideoModal.css';
import { Modal } from '../Modal';
import { useModal } from '../../../context/ModalContext';
import { useLanguage } from '../../../context/LanguageContext';

export const VideoModal: React.FC = () => {
    const { activeVideo, closeVideoModal } = useModal();
    const { language } = useLanguage();

    if (!activeVideo) return null;

    return (
        <Modal
            isOpen={Boolean(activeVideo)}
            onClose={closeVideoModal}
            size="lg"
            title={activeVideo.title[language]}
        >
            <div className="video-modal-wrap">
                <div className="video-modal-preview-box">
                    <video
                        src={activeVideo.videoUrl}
                        poster={activeVideo.posterUrl}
                        className="video-modal-video"
                        controls
                        autoPlay
                        playsInline
                        preload="metadata"
                    >
                        Ваш браузер не поддерживает воспроизведение видео.
                    </video>
                </div>
            </div>
        </Modal>
    );
};