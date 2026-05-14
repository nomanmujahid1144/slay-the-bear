'use client'

// src/app/components/dashboard/DashboardTab.tsx
// Dashboard Tab — matches Figma design pixel-perfect
// Sections: XP Bar, Stats, Daily Challenge, Recent Activity, Core Lessons

import { useState } from 'react';
import { ArrowRightUpIcon, BrozeCrownIcon, CardMaskLinesIcon, CircleTickIcon, ClockIcon, DailyChallangeIcon, GlobalRankIcon, GoldCrownIcon, GoldMedalIcon, LockIcon, MrFinleyIcon, SilverCrownIcon, StreakIcon, TotalXPIcon, XPIcon } from '../icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image, { StaticImageData } from 'next/image';
import { DefaultCard } from '../cards';

// ICONS
import MoneyBarIcon from '../../../../public/assets/img/dashboard/money-bag.png';
import FireIcon from '../../../../public/assets/img/dashboard/fire.png';
import DirectHitIcon from '../../../../public/assets/img/dashboard/direct-hit.png';
import LockedIcon from '../../../../public/assets/img/dashboard/locked.png';

// ── Types ──────────────────────────────────────────────────────────────────────

type LessonFilter = 'all' | 'beginner' | 'intermediate' | 'advanced' | 'master';

interface Badge {
    id: string;
    label: string;
    date: string;
    earned: boolean;
    icon: StaticImageData;
}

interface LeaderboardEntry {
    rank: number;
    name: string;
    xp: number;
    isYou?: boolean;
}

interface Lesson {
    id: string;
    title: string;
    description: string;
    level: Exclude<LessonFilter, 'all'>;
    progress: number;
    xp: number;
    locked: boolean;
}

// States
const STATS = [
    {
        id: '1',
        icon: <StreakIcon size={24} />,
        bgClass: 'bg-streak',
        label: 'Streak',
        value: '12',
        sub: 'Day streak',
    },
    {
        id: '2',
        icon: <TotalXPIcon size={24} />,
        bgClass: 'bg-xp',
        label: 'Total XP',
        value: '3,420',
        sub: 'Experience points',
    },
    {
        id: '3',
        icon: <GlobalRankIcon size={24} />,
        bgClass: 'bg-rank',
        label: 'Global Rank',
        value: '#4',
        sub: 'Leaderboard',
    },
];

// ── Static mock data (replaced by API in Phase 2) ─────────────────────────────

const BADGES: Badge[] = [
    { id: '1', label: 'First Trade', date: 'Earned Mar 12', earned: true, icon: MoneyBarIcon },
    { id: '2', label: '7-Day Streak', date: 'Earned Mar 20', earned: true, icon: FireIcon },
    { id: '3', label: 'Quiz Master', date: 'Earned Apr 1', earned: true, icon: DirectHitIcon },
    { id: '4', label: 'Bond Expert', date: 'Locked', earned: false, icon: LockedIcon },
];

const LEADERBOARD: LeaderboardEntry[] = [
    { rank: 1, name: 'Jordan K.', xp: 8200 },
    { rank: 2, name: 'Jordan K.', xp: 8200 },
    { rank: 3, name: 'Jordan K.', xp: 8200 },
    { rank: 4, name: 'Jordan K.', xp: 8200, isYou: true },
    { rank: 5, name: 'Jordan K.', xp: 8200 },
];

const LESSONS: Lesson[] = [
    { id: '1', title: 'Portfolio Diversification', description: 'Asset allocation strategies.', level: 'beginner', progress: 25, xp: 500, locked: false },
    { id: '2', title: 'Behavioral Finance', description: 'Learn how to spread risk and build a balanced portfolio.', level: 'beginner', progress: 100, xp: 500, locked: false },
    { id: '3', title: 'Stock Market Basics', description: 'Understand the stock market and how to read charts.', level: 'intermediate', progress: 0, xp: 500, locked: true },
    { id: '4', title: 'Options & Derivatives', description: 'Understand the stock market and how to read charts.', level: 'advanced', progress: 0, xp: 500, locked: true },
    { id: '5', title: 'Macroeconomics & Markets', description: 'Understand the stock market and how to read charts.', level: 'advanced', progress: 0, xp: 500, locked: true },
    { id: '6', title: 'Stock Hedge Fund Strategies', description: 'Understand the stock market and how to read charts.', level: 'master', progress: 0, xp: 500, locked: true },
];

const FILTER_TABS: { id: LessonFilter; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'beginner', label: 'Beginner' },
    { id: 'intermediate', label: 'Intermediate' },
    { id: 'advanced', label: 'Advanced' },
    { id: 'master', label: 'Master' },
];

// ── Rank medal helper ─────────────────────────────────────────────────────────
function RankMedal({ rank }: { rank: number }) {
    if (rank === 1) return <GoldCrownIcon size={28} />;
    if (rank === 2) return <SilverCrownIcon size={28} />;
    if (rank === 3) return <BrozeCrownIcon size={28} />;
    return <span className="db-lb-rank-num">{rank}</span>;
}

// ── Level badge helper ────────────────────────────────────────────────────────
function LevelBadge({ level }: { level: Exclude<LessonFilter, 'all'> }) {
    return (
        <span className={`db-act-lesson-badge db-act-lesson-badge--${level}`}>
            {level.toUpperCase()}
        </span>
    );
}

// ── Component ─────────────────────────────────────────────────────────────────
export const DashboardTab = () => {
    const [activeFilter, setActiveFilter] = useState<LessonFilter>('all');

    const filteredLessons = activeFilter === 'all'
        ? LESSONS
        : LESSONS.filter((l) => l.level === activeFilter);

    return (
        <div className="db-tab-content">

            {/* ── XP Progress Bar ─────────────────────────────────────────── */}
            <div className="db-xp-bar-wrap">
                <div className="db-xp-bar-header">
                    <span className="db-xp-bar-level text-md font-medium flex justify-center items-center gap-2">
                        <GoldMedalIcon size={14} />
                        Level 7 <FontAwesomeIcon icon={['fas', 'arrow-right']} size='xs' /> Level 8
                    </span>
                    <div className="db-xp-bar-count text-sm">
                        <span className='db-xp-bar-count-gold'>
                            3,420 {" "}
                        </span>
                        / 4,000 XP
                    </div>
                </div>
                <progress className="db-xp-bar bg-white h-3" value={85} max={100} />
                <p className="db-xp-bar-sub text-sm font-normal">580 XP needed to unlock Level 8</p>
            </div>

            {/* ── Stat Cards Row ───────────────────────────────────────────── */}
            <div className="db-stats-row">
                <div className="db-top-grid">
                    <div className="db-top-left">
                        <div className="db-stats-left">
                            {STATS.map((stat) => (
                                <div key={stat.id} className="db-stat-card p-4 rounded-2xl relative overflow-hidden">
                                    <div className='flex flex-col gap-16'>
                                        <div className='flex justify-start items-center gap-2'>
                                            <div className={`${stat.bgClass} rounded-lg`}>
                                                {stat.icon}
                                            </div>
                                            <span className="db-stat-label text-base font-semibold text-black">
                                                {stat.label}
                                            </span>
                                        </div>
                                        <div className="db-stat-info">
                                            <span className="db-stat-value">{stat.value}</span>
                                            <span className="db-stat-sub">{stat.sub}</span>
                                        </div>
                                    </div>
                                    <div className='absolute -top-1 right-0 object-cover'>
                                        <CardMaskLinesIcon size={200} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* ── Daily Challenge ──────────────────────────────────────────── */}
                        <div className="db-challenge">
                            <div className="db-challenge-left">
                                <span className="db-challenge-icon">
                                    <DailyChallangeIcon size={20} />
                                </span>
                                <div className='flex flex-col gap-1'>
                                    <p className="db-challenge-title text-xl font-semibold">Daily Challenge</p>
                                    <p className="db-challenge-name text-sm font-semibold">The Bear Market Survival Quiz</p>
                                    <p className="db-challenge-hint text-sm ">3 questions, beat the clock</p>
                                </div>
                            </div>
                            <div className="db-challenge-mid">
                                <div className='flex flex-col justify-center items-center gap-1'>
                                    <p className="db-challenge-meta-label text-sm flex justify-center items-center gap-1">
                                        <ClockIcon size={12} className='bg-primary' />
                                        Resets in
                                    </p>
                                    <p className="db-challenge-timer text-xs font-medium">08:39:35</p>
                                </div>
                                <div className=' flex flex-col justify-center items-center gap-1'>
                                    <p className="db-challenge-meta-label text-sm">Reward</p>
                                    <p className="db-challenge-reward text-xs font-medium flex justify-center items-center gap-1">
                                        <XPIcon size={17} />
                                        +150 XP
                                    </p>
                                </div>
                            </div>
                            <button className="db-challenge-btn rounded-lg text-sm font-medium">Start Challenge</button>
                        </div>
                    </div>
                    <div className="db-stat-card--finley rounded-2xl p-2">
                        <div className="db-finley-top">
                            <div className="db-finley-avatar-wrap">
                                <Image
                                    src="/assets/img/profile_online.png"
                                    alt="Mr. Finley"
                                    className="db-finley-avatar"
                                    width={40}
                                    height={40}
                                />
                                <span className="db-finley-dot" />
                            </div>
                            <div className="db-finley-meta">
                                <span className="db-finley-name text-sm font-semibold">Mr. Finley</span>
                                <span className="db-finley-status">Online</span>
                            </div>
                            <span className="db-finley-arrow rounded-full h-10 w-10 flex justify-center items-center">
                                <ArrowRightUpIcon size={10} />
                            </span>
                        </div>
                        {/* <div className="db-finley-body">
                            <p className="db-finley-quote">
                                S&P 500 averages 10% yearly; consistency wins.
                            </p>
                            <button className="db-finley-btn">💬 Ask Mr. Finley</button>
                        </div> */}
                        {/* Mr. Finley — 3 layer card */}
                        <div className="db-finley-wrap">
                            <div className="db-finley-layer db-finley-layer--3" />
                            <div className="db-finley-layer db-finley-layer--2" />
                            <div className="db-finley-layer db-finley-layer--1">
                                <h3 className="db-finley-chat-title w-10/12">Chat with Mr. Finley</h3>
                                <p className="db-finley-chat-desc">S&P 500 averages 10% yearly; consistency wins.</p>
                                <button className="db-finley-chat-btn">
                                    <MrFinleyIcon size={18} />
                                    Ask Mr. Finley
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Recent Activity ──────────────────────────────────────────── */}
            <div className='db-activity-section'>
                <h2 className="db-section-title py-3">Your Recent Activity</h2>

                <div className="db-activity-grid">

                    {/* Lesson in progress */}
                    <DefaultCard className='drop-shadow-sm p-0'>
                        <div className="db-act-lesson-thumb">
                            {/* <div className="db-act-lesson-img" /> */}
                            <div className='relative w-full h-full'>
                                <Image
                                    src={'/assets/img/dashboard/recent-activity.png'}
                                    alt='no recent photo'
                                    fill
                                    className='object-cover'
                                />
                            </div>
                        </div>
                        <div className="db-act-lesson-body">
                            <span className="db-act-lesson-tag">BEGINNER</span>
                            <h3 className="db-act-lesson-title">Investing Fundamentals</h3>
                            <p className="db-act-lesson-desc">
                                Basics of investing: understanding key principles to grow your wealth wisely and securely.
                            </p>
                            <div className="db-act-lesson-meta">
                                <span className="db-act-lesson-continue">Continue Learning</span>
                                <span className="db-act-lesson-num">Lesson 4 of 12</span>
                            </div>
                            <div className="db-act-lesson-bar">
                                <div className="db-act-lesson-bar-fill" style={{ width: '25%' }} />
                            </div>
                            <div className="db-act-lesson-footer">
                                <span className="db-act-lesson-pct">25% complete</span>
                                <span className="db-act-lesson-xp">+500 XP</span>
                            </div>
                            <button className="db-act-lesson-btn flex justify-center items-center gap-2">
                                Resume Lesson
                                <FontAwesomeIcon icon={['fas', 'arrow-right']} size='xs' />
                            </button>
                        </div>
                    </DefaultCard>

                    {/* Earned Badges */}
                    <DefaultCard>
                        <div className="db-card-header">
                            <h3 className="db-card-title">Earned Badges</h3>
                            <span className="db-card-subtitle">3/4 earned</span>
                        </div>
                        <ul className="db-badges-list">
                            {BADGES.map((badge) => (
                                <li key={badge.id} className={`db-badge-item ${!badge.earned ? 'db-badge-item--locked' : ''}`}>
                                    <span className="db-badge-icon">
                                        <Image
                                            src={badge.icon}
                                            width={20}
                                            height={20}
                                            alt='no icon'
                                        />
                                    </span>
                                    <div className="db-badge-info">
                                        <span className="db-badge-label">{badge.label}</span>
                                        <span className="db-badge-date">{badge.date}</span>
                                    </div>
                                    <span >
                                        {badge.earned ? <CircleTickIcon size={20} /> : <LockIcon size={16} />}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </DefaultCard>

                    {/* Leaderboard */}
                    <DefaultCard>
                        <div className="db-card-header">
                            <h3 className="db-card-title">Leaderboard</h3>
                            <span className="db-card-subtitle">🏆 Top 5</span>
                        </div>
                        <ul className="db-lb-list">
                            {LEADERBOARD.map((entry) => (
                                <li key={entry.rank} className={`db-lb-item ${entry.isYou ? 'db-lb-item--you' : ''}`}>
                                    <RankMedal rank={entry.rank} />
                                    <Image
                                        src="/assets/img/profile_online.png"
                                        alt="Mr. Finley"
                                        className="db-lb-avatar"
                                        width={40}
                                        height={40}
                                    />
                                    <div className="db-lb-info">
                                        <span className="db-lb-name">{entry.name}</span>
                                        <span className="db-lb-xp">{entry.xp.toLocaleString()} XP</span>
                                    </div>
                                    {entry.isYou && <span className="db-lb-you">YOU</span>}
                                </li>
                            ))}
                        </ul>
                    </DefaultCard>
                </div>
            </div>

            <div className='db-activity-section'>
                {/* ── Core Lessons ─────────────────────────────────────────────── */}
                <h2 className="db-section-title py-3">Core lessons</h2>

                {/* Filter tabs */}
                <div className="db-filters">
                    {FILTER_TABS.map((f) => (
                        <button
                            key={f.id}
                            type="button"
                            onClick={() => setActiveFilter(f.id)}
                            className={`db-filter-btn ${activeFilter === f.id ? 'db-filter-btn--active' : ''}`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </div>
            {/* Lessons grid */}
            <div className="db-act-lessons-grid">
                {filteredLessons.map((lesson) => (
                    <DefaultCard key={lesson.id} className={`drop-shadow-sm p-0`}>
                        <div className="db-act-lesson-thumb">
                            {/* <div className="db-act-lesson-img" /> */}
                            <div className='relative w-full h-full'>
                                <Image
                                    src={'/assets/img/dashboard/recent-activity.png'}
                                    alt='no recent photo'
                                    fill
                                    className='object-cover'
                                />
                            </div>
                        </div>
                        <div className="db-act-lesson-body">
                            {lesson.locked && <div className="db-act-lesson-card-lock">
                                <LockIcon size={20} className='text-black' />
                            </div>}
                            {/* db-act-lesson-badge--${lesson.level} */}
                            <span className={`db-act-lesson-tag`}>{lesson.level.toUpperCase()}</span>
                            <h3 className="db-act-lesson-title">{lesson.title}</h3>
                            <p className="db-act-lesson-desc">{lesson.description}</p>
                            <div className='pt-6'>
                                {lesson.progress > 0 && (
                                    <div className="db-act-lesson-bar">
                                        <div className="db-act-lesson-bar-fill" style={{ width: `${lesson.progress}%` }} />
                                    </div>
                                )}
                                <div className="db-act-lesson-footer pt-2">
                                    <span className="db-act-lesson-pct">{lesson.progress > 0 ? `${lesson.progress}% complete` : '10/10 lessons'}</span>
                                    <span className="db-act-lesson-xp">+{lesson.xp} XP</span>
                                </div>
                            </div>
                        </div>
                    </DefaultCard>
                ))}
            </div>

        </div>
    );
};