// src/pages/CoursePage/CoursePage.tsx

import React from 'react';
import './CoursePage.css';
import { PageType } from '../../types';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useLanguage } from '../../context/LanguageContext';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { Icon } from '../../components/ui/Icon';

export interface CoursePageProps {
    onNavigate: (page: PageType) => void;
}

export const CoursePage: React.FC<CoursePageProps> = ({ onNavigate: _onNavigate }) => {
    const { t } = useLanguage();
    useDocumentTitle(t.coursePage.title, t.coursePage.subtitle);

    const learnItems = [
        t.coursePage.learnItem1,
        t.coursePage.learnItem2,
        t.coursePage.learnItem3,
        t.coursePage.learnItem4,
        t.coursePage.learnItem5,
        t.coursePage.learnItem6,
    ];

    const formatItems = [
        t.coursePage.formatItem1,
        t.coursePage.formatItem2,
        t.coursePage.formatItem3,
        t.coursePage.formatItem4,
    ];

    return (
        <div className="course-page fade-in">
            {/* HERO */}
            <section className="section course-hero-section">
                <div className="container">
                    <SectionHeader
                        as="h1"
                        badge={t.coursePage.badge}
                        title={t.coursePage.title}
                        subtitle={t.coursePage.subtitle}
                    />
                </div>
            </section>

            {/* ВИДЕО + ОПИСАНИЕ */}
            <section className="section course-main-section">
                <div className="container">
                    <div className="course-main-grid">

                        {/* Обертка сохранена для визуала */}
                        <div className="course-video" style={{ cursor: 'default' }}>
                            <div className="course-video__glow" aria-hidden />

                            {/* Постер (картинка) вместо видео */}
                            <img
                                src="/videos/course-intro-poster.webp"
                                alt="Видео-обзор на курс скоро появится"
                                className="course-video__img"
                            />

                            {/* Затемнение и текст по центру */}
                            <div className="course-video__placeholder">
                                <p className="course-video__placeholder-text">
                                    {t.coursePage.videoComingSoon}
                                </p>
                            </div>

                            {/* Подпись внизу закомментирована, как вы просили */}
                            {/* 
                            <div className="course-video__caption">
                                {t.coursePage.heroVideoTitle}
                            </div> 
                            */}
                        </div>

                        {/* Описание курса */}
                        <div className="course-content">
                            <h3 className="course-content__heading">{t.coursePage.aboutCourseTitle}</h3>
                            <p>{t.coursePage.aboutCourseText1}</p>
                            <p>{t.coursePage.aboutCourseText2}</p>
                            <p>{t.coursePage.aboutCourseText3}</p>

                            {/* Кнопка временно скрыта */}
                            {/* 
                            <div className="course-content__cta">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={handleEnroll}
                                    icon={<Icon name="sparkles" size={18} className="btn-sparkle-icon" />}
                                >
                                    {t.coursePage.heroCta}
                                </Button>
                            </div> 
                            */}
                        </div>
                    </div>
                </div>
            </section>

            {/* ЧЕМУ НАУЧИТЕСЬ */}
            <section className="section course-learn-section">
                <div className="container">
                    <SectionHeader
                        badge={t.coursePage.programBadge}
                        title={t.coursePage.whatYouLearnTitle}
                    />
                    <div className="course-learn-card">
                        <ul className="course-learn-list">
                            {learnItems.map((item, idx) => (
                                <li key={idx} className="course-learn-item">
                                    <span className="course-learn-item__check">
                                        <Icon name="check" size={18} />
                                    </span>
                                    <span className="course-learn-item__text">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* КАК ПРОХОДИТ ОБУЧЕНИЕ */}
            <section className="section course-format-section">
                <div className="container">
                    <SectionHeader
                        badge={t.coursePage.formatBadge}
                        title={t.coursePage.formatTitle}
                    />
                    <div className="course-format-grid">
                        {formatItems.map((item, idx) => (
                            <div key={idx} className="course-format-item">
                                <span className="course-format-item__num">{idx + 1}</span>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ФИНАЛЬНЫЙ CTA (Готовы начать?) — Закомментирован */}
            {/* 
            <section className="section course-final-section">
                <div className="container">
                    <div className="course-final-card">
                        <h2 className="course-final-title">{t.coursePage.finalCta}</h2>
                        <p className="course-final-text">{t.coursePage.finalCtaText}</p>
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={handleEnroll}
                            icon={<Icon name="sparkles" size={18} className="btn-sparkle-icon" />}
                        >
                            {t.coursePage.heroCta}
                        </Button>
                    </div>
                </div>
            </section> 
            */}
        </div>
    );
};