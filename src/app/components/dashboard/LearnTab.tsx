'use client'

// src/app/components/dashboard/LearnTab.tsx
// Learn Tab — matches Figma design pixel-perfect
// Sections: Header, Path to Mastery stepper, Level sections

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DefaultCard } from '../cards';
import { ClockIcon, LearnIcon, LockIcon, TestIcon, XPIcon } from '../icons';

// ── Types ──────────────────────────────────────────────────────────────────────

type LessonStatus = 'completed' | 'in-progress' | 'locked';
type LevelStatus = 'unlocked' | 'locked';

interface Lesson {
    id: string;
    title: string;
    subtitle?: string;
    status: LessonStatus;
    progress?: number;
    xp: number;
    readTime: string;
}

interface Level {
    id: string;
    number: number;
    title: string;
    status: LevelStatus;
    totalLessons: number;
    completedLessons: number;
    progress: number;
    lessons?: Lesson[];
    previewTopics?: string[];
    unlockRequirement?: string;
}

interface PathStep {
    id: string;
    label: string;
    active: boolean;
    progress?: string;
}

// ── Static mock data ───────────────────────────────────────────────────────────

const PATH_STEPS: PathStep[] = [
    { id: '1', label: 'Begining', active: true, progress: 'Lesson 2 of 6' },
    { id: '2', label: 'Begining', active: false },
    { id: '3', label: 'Advanced', active: false },
    { id: '4', label: 'Expert', active: false },
    { id: '5', label: 'Master', active: false },
];

const PREVIEW_TOPICS = [
    'Market Analysis Fundamentals',
    'Dividend Investing',
    'Options Basics',
    'Technical vs Fundamental Analysis',
    'Rebalancing Portfolios',
    'Sector Investing',
];

// ── Level 1 ───────────────────────────────────────────────────
const LEVEL_1: Level = {
    id: '1', number: 1, title: 'Beginner', status: 'unlocked',
    totalLessons: 6, completedLessons: 1, progress: 20,
    lessons: [
        { id: '1', title: 'What is Investing?', status: 'completed', xp: 150, readTime: '5 min read' },
        { id: '2', title: 'Stocks Explained', status: 'in-progress', xp: 150, readTime: '5 min read', progress: 40 },
        { id: '3', title: 'Bonds & Fixed Income', status: 'locked', xp: 150, readTime: '5 min read', subtitle: 'Complete previous lesson first' },
        { id: '4', title: 'Mutual Funds & ETFs', status: 'locked', xp: 150, readTime: '5 min read', subtitle: 'Complete previous lesson first' },
        { id: '5', title: 'Risk & Return', status: 'locked', xp: 150, readTime: '5 min read', subtitle: 'Complete previous lesson first' },
        { id: '6', title: 'Building Your First Portfolio', status: 'locked', xp: 150, readTime: '5 min read', subtitle: 'Complete previous lesson first' },
    ],
};

// ── Level 2 ───────────────────────────────────────────────────
const LEVEL_2: Level = {
    id: '2', number: 2, title: 'Intermediate', status: 'locked',
    totalLessons: 6, completedLessons: 0, progress: 0,
    unlockRequirement: 'Pass Beginner Quiz (score 80% or higher)',
    previewTopics: PREVIEW_TOPICS,
};

// ── Level 3 ───────────────────────────────────────────────────
const LEVEL_3: Level = {
    id: '3', number: 3, title: 'Advanced', status: 'locked',
    totalLessons: 6, completedLessons: 0, progress: 0,
    unlockRequirement: 'Pass Beginner Quiz (score 80% or higher)',
    previewTopics: PREVIEW_TOPICS,
};

// ── Level 4 ───────────────────────────────────────────────────
const LEVEL_4: Level = {
    id: '4', number: 4, title: 'Expert', status: 'locked',
    totalLessons: 6, completedLessons: 0, progress: 0,
    unlockRequirement: 'Pass Beginner Quiz (score 80% or higher)',
    previewTopics: PREVIEW_TOPICS,
};

// ── Level 5 ───────────────────────────────────────────────────
const LEVEL_5: Level = {
    id: '5', number: 5, title: 'Master', status: 'locked',
    totalLessons: 6, completedLessons: 0, progress: 0,
    unlockRequirement: 'Pass Beginner Quiz (score 80% or higher)',
    previewTopics: PREVIEW_TOPICS,
};

// ── All levels combined ───────────────────────────────────────
const LEVELS: Level[] = [LEVEL_1, LEVEL_2, LEVEL_3, LEVEL_4, LEVEL_5];

// ── Lesson status icon ─────────────────────────────────────────────────────────
function LessonIcon({ status }: { status: LessonStatus }) {
    if (status === 'completed') {
        return (
            <div className="learn-lesson-icon learn-lesson-icon--completed">
                <FontAwesomeIcon icon={['fas', 'check']} size='1x' />
            </div>
        );
    }
    if (status === 'in-progress') {
        return (
            <div className="learn-lesson-icon learn-lesson-icon--progress">
                {/* <div className="learn-lesson-icon-inner" /> */}
            </div>
        );
    }
    return (
        <div className="learn-lesson-icon learn-lesson-icon--locked">
            <LockIcon size={16} />
        </div>
    );
}

// ── Component ──────────────────────────────────────────────────────────────────
export const LearnTab = () => {
    return (
        <div className="learn-wrap">

            {/* ── Page Header ───────────────────────────────────────── */}
            <div className="learn-header">
                <h1 className="learn-title">Learn — Your Path to Mastery</h1>
                <p className="learn-subtitle">Complete lessons, pass quizzes, and unlock the next level.</p>
            </div>

            {/* ── Path to Mastery Stepper ───────────────────────────── */}
            <DefaultCard className='rounded-2xl'>
                <div className="learn-path-header pb-6">
                    <span className="learn-path-label">Your Path to Mastery</span>
                    <span className="learn-path-progress-text">Level 1 of 5 in progress</span>
                </div>
                <div className="learn-path-steps">
                    {PATH_STEPS.map((step, index) => (
                        <div
                            key={step.id}
                            className={`learn-path-step ${step.active ? 'learn-path-step--active' : 'learn-path-step--locked'}`}
                        >
                            <div className="learn-path-step-top pb-3">
                                <div className="learn-path-step-num">
                                    {step.active
                                        ? <span>{index + 1}</span>
                                        : <LockIcon size={16} />
                                    }
                                </div>
                                <span className="learn-path-step-label">{step.label}</span>
                            </div>
                            {step.active && step.progress && (
                                <>
                                    <div className="learn-path-step-bar">
                                        <div className="learn-path-step-bar-fill" style={{ width: '33%' }} />
                                    </div>
                                    <span className="learn-path-step-sub">{step.progress}</span>
                                </>
                            )}
                            {!step.active && (
                                <span className="learn-path-step-sub">locked</span>
                            )}
                        </div>
                    ))}
                </div>
            </DefaultCard>

            {/* ── Level Sections ────────────────────────────────────── */}
            {LEVELS.map((level) => (
                <DefaultCard key={level.id} className='p-0'>
                    <div className={`learn-level ${level.status === 'locked' ? 'learn-level--locked' : ''}`}>
                        {/* Level header row */}
                        <div className="learn-level-header">
                            <div className="learn-level-header-left">
                                <div className={`learn-level-avatar ${level.status === 'unlocked' ? 'learn-level-avatar--unlocked' : 'learn-level-avatar--locked'}`}>
                                    {level.status === 'unlocked'
                                        ? <LearnIcon size={18} />
                                        : <LockIcon size={16} />
                                    }
                                </div>
                                <div className="learn-level-info">
                                    <div className="learn-level-title-row">
                                        <h3 className="learn-level-title">
                                            Level {level.number}: {level.title}
                                        </h3>
                                        <span className={`learn-level-badge ${level.status === 'unlocked' ? 'learn-level-badge--unlocked' : 'learn-level-badge--locked'}`}>
                                            {level.status === 'unlocked' ? 'Unlocked' : 'Locked'}
                                        </span>
                                    </div>
                                    <p className="learn-level-sub">
                                        {level.status === 'unlocked'
                                            ? `${level.completedLessons}/${level.totalLessons} lessons completed`
                                            : level.unlockRequirement
                                        }
                                    </p>
                                </div>
                            </div>
                            {level.status === 'unlocked' && (
                                <div className="learn-level-progress-wrap">
                                    <progress
                                        className="learn-level-progress"
                                        value={level.progress}
                                        max={100}
                                    />
                                    <span className="learn-level-pct">{level.progress}%</span>
                                </div>
                            )}
                        </div>

                        {/* Unlocked — lesson list */}
                        {level.status === 'unlocked' && level.lessons && (
                            <div className="learn-lessons p-6">
                                {level.lessons.map((lesson) => (
                                    <DefaultCard key={lesson.id} className='p-0 mb-3 rounded-lg'>
                                        <div
                                            className={`learn-lesson ${lesson.status === 'locked' ? 'learn-lesson--locked' : ''}`}
                                        >
                                            <div className="learn-lesson-left">
                                                <LessonIcon status={lesson.status} />
                                                <div className="learn-lesson-info">
                                                    <p className="learn-lesson-title">{lesson.title}</p>
                                                    {lesson.subtitle && (
                                                        <p className="learn-lesson-sub">{lesson.subtitle}</p>
                                                    )}
                                                    {lesson.status === 'in-progress' && lesson.progress !== undefined && (
                                                        <div className="learn-lesson-bar-wrap">
                                                            <progress
                                                                className="learn-lesson-bar"
                                                                value={lesson.progress}
                                                                max={100}
                                                            />
                                                            <span className="learn-lesson-bar-pct">{lesson.progress}%</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="learn-lesson-right">
                                                <span className="learn-lesson-xp">
                                                    <XPIcon size={20} />
                                                    +{lesson.xp} XP
                                                </span>
                                                <span className="learn-lesson-time">
                                                    <ClockIcon size={12} />
                                                    {lesson.readTime}
                                                </span>
                                                {lesson.status === 'completed' && <button className="learn-lesson-btn learn-lesson-btn--review">Review</button>}
                                                {lesson.status === 'in-progress' && <button className="learn-lesson-btn learn-lesson-btn--continue">Continue</button>}
                                                {lesson.status === 'locked' && <span className="learn-lesson-dash" />}
                                            </div>
                                        </div>
                                    </DefaultCard>
                                ))}

                                {/* Test Out Banner */}
                                <div className="learn-testout rounded-lg">
                                    <div className="learn-testout-left">
                                        <div className="learn-testout-icon">
                                            <TestIcon size={16} />
                                        </div>
                                        <div>
                                            <p className="learn-testout-title">Test Out of Beginner Level</p>
                                            <p className="learn-testout-sub">Already know this material? Take the test and skip to Intermediate. You won't earn XP from lessons.</p>
                                        </div>
                                    </div>
                                    <button className="learn-testout-btn">Take Quiz</button>
                                </div>
                            </div>
                        )}

                        {/* Locked — preview topics */}
                        {level.status === 'locked' && level.previewTopics && (
                            <div className="learn-preview">
                                <p className="learn-preview-label">Preview Topics</p>
                                <div className="learn-preview-grid">
                                    {level.previewTopics.map((topic, i) => (
                                        <div key={i} className="learn-preview-topic">
                                            <LockIcon size={16} />
                                            <span>{topic}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </DefaultCard>
            ))}

        </div>
    );
};