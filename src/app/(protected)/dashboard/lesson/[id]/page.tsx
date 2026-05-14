'use client'

import { DefaultCard } from '@/app/components/cards';
// src/app/(protected)/dashboard/lesson/[id]/page.tsx
// Lesson Reader Page — matches Figma design
// Shows lesson content with progress bar, prev/next navigation

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

// ── Mock lesson data (replaced by API in Phase 2) ─────────────────────────────
const LESSON = {
    id: '2',
    title: 'Stocks Explained',
    level: 'Beginner',
    lessonNumber: 2,
    totalLessons: 6,
    readTime: '8 min read',
    progress: 25,
    xp: 50,
    content: [
        {
            type: 'heading',
            text: 'A stock represents a share of ownership in a company. When you buy a stock, you become a part-owner ,or shareholder ,of that business.',
        },
        {
            type: 'sub-heading',
            text: 'KEY CONCEPT',
        },
        {
            type: 'paragraph',
            text: 'Stocks are also called equities. Companies issue stocks to raise capital for growth, operations, or paying off debt.',
        },
        {
            type: 'paragraph',
            text: 'When a company performs well, its stock price typically rises, and shareholders benefit. Conversely, poor performance can cause the stock price to fall. As a shareholder, you may also receive dividends — a portion of the company\'s profits paid out regularly.',
        },
        {
            type: 'sub-heading',
            text: 'DID YOU KNOW?',
        },
        {
            type: 'paragraph',
            text: 'The New York Stock Exchange (NYSE) was founded in 1792 under a buttonwood tree on Wall Street. Today it handles trillions of dollars in trades daily.',
        },
        {
            type: 'paragraph',
            text: 'Stocks are traded on exchanges like the NYSE or NASDAQ. Prices fluctuate based on supply and demand, company earnings, economic data and investor sentiment. Understanding these factors is key to making informed investment decisions.',
        },
    ],
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function LessonPage() {
    return (
        <div className="lesson-wrap">

            {/* ── Back link ─────────────────────────────────────────── */}
            <Link href="/dashboard" className="lesson-back">
                <FontAwesomeIcon icon={['fas', 'chevron-left']} style={{ fontSize: '12px' }} />
                Back to Learn
            </Link>

            {/* ── Lesson card ───────────────────────────────────────── */}
            <DefaultCard className="lesson-card p-0">

                <div className='!p-5'>
                    {/* Header */}
                    <div className="lesson-card-header !pb-5">
                        <div>
                            <h1 className="lesson-title">{LESSON.title}</h1>
                            <p className="lesson-meta pt-2">
                                <span>Level: {LESSON.level}</span>
                                <span className="lesson-meta-dot">·</span>
                                <span>Lesson {LESSON.lessonNumber} of {LESSON.totalLessons}</span>
                                <span className="lesson-meta-dot">·</span>
                                <span>{LESSON.readTime}</span>
                            </p>
                        </div>
                    </div>

                    {/* Progress bar row */}
                    <div className="lesson-progress-row">
                        <div className='flex justify-between items-center'>
                            <span className="lesson-progress-label">{LESSON.progress}% complete</span>
                            <span className="lesson-xp">+{LESSON.xp} XP</span>
                        </div>
                        <progress
                            className="lesson-progress-bar"
                            value={LESSON.progress}
                            max={100}
                        />
                    </div>
                </div>

                {/* Divider */}
                <hr className="lesson-divider" />

                {/* Content */}
                <div className="lesson-content !p-5">
                    {LESSON.content.map((block, i) => {
                        if (block.type === 'heading') {
                            return (
                                <h2 key={i} className="lesson-content-heading">
                                    {block.text}
                                </h2>
                            );
                        }else if (block.type === 'sub-heading'){
                            return (
                                <h3 key={i} className="lesson-content-sub-heading">
                                    {block.text}
                                </h3>
                            );
                        }
                        return (
                            <p key={i} className="lesson-content-para">
                                {block.text}
                            </p>
                        );
                    })}
                </div>

                {/* Divider */}
                <hr className="lesson-divider" />

                {/* Navigation buttons */}
                <div className="lesson-nav !p-5">
                    <button className="lesson-nav-btn lesson-nav-btn--prev">
                        Previous Lesson
                    </button>
                    <button className="lesson-nav-btn lesson-nav-btn--next">
                        Next Lesson 
                    </button>
                </div>

            </DefaultCard>

        </div>
    );
}