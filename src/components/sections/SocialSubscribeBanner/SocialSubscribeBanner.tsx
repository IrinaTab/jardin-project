// src/components/sections/SocialSubscribeBanner/SocialSubscribeBanner.tsx

import React from 'react';
import './SocialSubscribeBanner.css';
import { useLanguage } from '../../../context/LanguageContext';
import { contactInfo } from '../../../data/contacts';
import { Icon } from '../../ui/Icon';

export interface SocialSubscribeBannerProps {
    className?: string;
}

export const SocialSubscribeBanner: React.FC<SocialSubscribeBannerProps> = ({ className = '' }) => {
    const { t } = useLanguage();

    const socials = [
        { href: contactInfo.instagram, label: 'Instagram', icon: 'instagram' as const },
        { href: contactInfo.telegram, label: 'Telegram', icon: 'telegram' as const },
        { href: contactInfo.tiktok, label: 'TikTok', icon: 'tiktok' as const },
        { href: contactInfo.facebook, label: 'Facebook', icon: 'facebook' as const },
        { href: contactInfo.whatsapp, label: 'WhatsApp', icon: 'whatsapp' as const },
    ];

    return (
        <div className={`social-subscribe-wrap ${className}`.trim()}>
            <div className="social-subscribe">
                <span className="social-subscribe__sparkle social-subscribe__sparkle--1" aria-hidden />
                <span className="social-subscribe__sparkle social-subscribe__sparkle--2" aria-hidden />
                <span className="social-subscribe__sparkle social-subscribe__sparkle--3" aria-hidden />
                <span className="social-subscribe__sparkle social-subscribe__sparkle--4" aria-hidden />

                <div className="social-subscribe__badge">
                    <Icon name="sparkles" size={12} />
                    <span>{t.socialSubscribe.badge}</span>
                </div>

                <h3 className="social-subscribe__title">{t.socialSubscribe.title}</h3>
                <p className="social-subscribe__subtitle">{t.socialSubscribe.subtitle}</p>

                <div className="social-subscribe__list">
                    {socials.map((s) => (
                        <a
                            key={s.label}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-subscribe__btn"
                            aria-label={`${t.socialSubscribe.cta} ${s.label}`}
                        >
                            <Icon name={s.icon} size={16} />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};