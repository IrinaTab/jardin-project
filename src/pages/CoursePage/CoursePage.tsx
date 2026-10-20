import React, { useMemo } from 'react';
import './CoursePage.css';
import { PageType, VideoItem } from '../../types';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useLanguage } from '../../context/LanguageContext';
import { useModal } from '../../context/ModalContext';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { Button } from '../../components/ui/Button';
import { Icon } from '../../components/ui/Icon';

export interface CoursePageProps {
    onNavigate: (page: PageType) => void;
}

export const CoursePage: React.FC<CoursePageProps> = ({ onNavigate: _onNavigate }) => {
    const { t } = useLanguage();
    const { openRequestModal, openVideoModal } = useModal();
    useDocumentTitle(t.coursePage.title);

    /**
     * Видео от мастера — открывается в модалке по клику.
     */
    const courseVideo: VideoItem = useMemo(
        () => ({
            id: 'course-intro-video',
            videoUrl: '/videos/course-intro.mp4',
            posterUrl: '/videos/course-intro-poster.webp',
            title: {
                ru: 'Видео от мастера',
                en: 'Message from the Master',
                es: 'Mensaje de la Maestra',
            },
            description: {
                ru: 'Короткое видео о курсе, профессии и подходе к обучению.',
                en: 'Short video about the course, the profession and the approach to teaching.',
                es: 'Breve vídeo sobre el curso, la profesión y el enfoque de la enseñanza.',
            },
        }),
        []
    );

    const handleOpenVideo = () => openVideoModal(courseVideo);
    const handleEnroll = () => openRequestModal(t.coursePage.formTitle);

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
                        {/* Видео */}
                        <div
                            className="course-video"
                            onClick={handleOpenVideo}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleOpenVideo();
                                }
                            }}
                            aria-label={t.coursePage.heroVideoTitle}
                        >
                            <div className="course-video__glow" aria-hidden />
                            <video
                                className="course-video__img"
                                src="/videos/course-intro.mp4"
                                poster="/videos/course-intro-poster.webp"
                                muted
                                playsInline
                                preload="metadata"
                                aria-hidden
                            />
                            <div className="course-video__play-btn" aria-hidden>
                                <Icon name="play" size={32} />
                            </div>
                            <div className="course-video__caption">
                                {t.coursePage.heroVideoTitle}
                            </div>
                        </div>

                        {/* Описание курса */}
                        <div className="course-content">
                            <h3 className="course-content__heading">{t.coursePage.aboutCourseTitle}</h3>
                            <p>{t.coursePage.aboutCourseText1}</p>
                            <p>{t.coursePage.aboutCourseText2}</p>
                            <p>{t.coursePage.aboutCourseText3}</p>

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
                        </div>
                    </div>
                </div>
            </section>

            {/* ЧЕМУ НАУЧИТЕСЬ */}
            <section className="section course-learn-section">
                <div className="container">
                    <SectionHeader
                        badge="Программа"
                        title={t.coursePage.whatYouLearnTitle}
                    />
                    <div className="course-learn-grid">
                        {learnItems.map((item, idx) => (
                            <div key={idx} className="course-learn-item">
                                <span className="course-learn-item__check">
                                    <Icon name="check" size={16} />
                                </span>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* КАК ПРОХОДИТ ОБУЧЕНИЕ */}
            <section className="section course-format-section">
                <div className="container">
                    <SectionHeader
                        badge="Формат"
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

            {/* ФИНАЛЬНЫЙ CTA */}
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
        </div>
    );
};