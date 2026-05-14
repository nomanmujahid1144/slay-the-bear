'use client'

import { DefaultCard } from '@/app/components/cards';
import { TestIcon } from '@/app/components/icons';
// src/app/(protected)/dashboard/quiz/[id]/page.tsx
// Start Quiz Page — matches Figma design
// Shows quiz info card with questions, pass %, attempts + Start button

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

// ── Mock quiz data (replaced by API in Phase 2) ───────────────────────────────
const QUIZ = {
    id: '1',
    title: 'Beginner Quiz',
    questions: 10,
    toPass: '80%',
    attempts: '∞',
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function StartQuizPage() {
    return (
        <div className="quiz-start-wrap">

            {/* ── Back link ─────────────────────────────────────────── */}
            <Link href="/dashboard" className="lesson-back">
                <FontAwesomeIcon icon={['fas', 'chevron-left']} style={{ fontSize: '12px' }} />
                Back to Learn
            </Link>

            {/* ── Centered card ─────────────────────────────────────── */}
            <div className="quiz-start-center">
                <DefaultCard className="quiz-start-card p-8">

                    {/* Quiz icon */}
                    <div className="quiz-start-icon">
                        <TestIcon size={26} />
                    </div>

                    {/* Title */}
                    <h1 className="quiz-start-title">{QUIZ.title}</h1>

                    {/* Stats row */}
                    <div className="quiz-start-stats pt-2 pb-12">
                        <div className="quiz-start-stat">
                            <span className="quiz-start-stat-value">{QUIZ.questions}</span>
                            <span className="quiz-start-stat-label">Questions</span>
                        </div>
                        <div className="quiz-start-stat">
                            <span className="quiz-start-stat-value">{QUIZ.toPass}</span>
                            <span className="quiz-start-stat-label">To Pass</span>
                        </div>
                        <div className="quiz-start-stat">
                            <span className="quiz-start-stat-value">{QUIZ.attempts}</span>
                            <span className="quiz-start-stat-label">Attempts</span>
                        </div>
                    </div>

                    {/* Start button */}
                    <button className="quiz-start-btn">
                        Start Quiz
                        <FontAwesomeIcon icon={['fas', 'arrow-right']} style={{ fontSize: '14px' }} />
                    </button>

                </DefaultCard>
            </div>

        </div>
    );
}