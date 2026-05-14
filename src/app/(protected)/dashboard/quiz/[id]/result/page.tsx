'use client'

import { DefaultCard } from '@/app/components/cards';
import { CongratulationCapIcon } from '@/app/components/icons';
// src/app/(protected)/dashboard/quiz/[id]/result/page.tsx
// Quiz Result Page — Pass state (matches Figma)
// Fail state handled via state/props when API integrated

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

// ── Mock result data (replaced by API in Phase 2) ─────────────────────────────
const RESULT = {
    passed:       true,
    score:        90,
    correct:      9,
    total:        10,
    passmark:     80,
    quizTitle:    'Beginner',
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function QuizResultPage() {
    const { passed, score, correct, total, passmark } = RESULT;

    return (
        <div className="quiz-result-wrap">

            {/* ── Back link ─────────────────────────────────────────── */}
            <Link href="/dashboard" className="lesson-back">
                <FontAwesomeIcon icon={['fas', 'chevron-left']} style={{ fontSize: '12px' }} />
                Back to Learn
            </Link>

            {/* ── Centered card ─────────────────────────────────────── */}
            <div className="quiz-result-center">

                <DefaultCard className="quiz-result-card p-8">
                    {/* Emoji */}
                    <span className="quiz-result-emoji">
                        {passed ? <CongratulationCapIcon size={60} /> : '❌'}
                    </span>

                    {/* Title + subtitle */}
                    <div className="quiz-result-header">
                        <h1 className="quiz-result-title">
                            {passed ? 'Congratulations!' : 'Not Quite There'}
                        </h1>
                        <p className="quiz-result-subtitle">
                            {passed
                                ? `You passed the ${RESULT.quizTitle} quiz! Next level unlocked`
                                : `You scored ${score}%. You need ${passmark}% to pass. Try again!`
                            }
                        </p>
                    </div>

                    {/* Score box */}
                    <div className="quiz-result-score-box mt-16">

                        {/* Score percentage */}
                        <p className="quiz-result-score">{score}%</p>
                        <p className="quiz-result-correct">{correct} / {total} correct</p>

                        {/* Progress bar */}
                        <div className="quiz-result-bar-wrap">
                            <progress
                                className={`quiz-result-bar ${passed ? 'quiz-result-bar--pass' : 'quiz-result-bar--fail'}`}
                                value={score}
                                max={100}
                            />
                            {/* Pass marker line */}
                            <div
                                className="quiz-result-bar-marker"
                                style={{ left: `${passmark}%` }}
                            />
                        </div>

                        {/* Bar labels */}
                        <div className="quiz-result-bar-labels">
                            <span>0%</span>
                            <span>Pass:{passmark}%</span>
                            <span>100%</span>
                        </div>

                    </div>

                    {/* CTA button */}
                    {passed ? (
                        <Link href="/dashboard/learn" className="quiz-result-btn quiz-result-btn--pass">
                            Continue Next Level
                        </Link>
                    ) : (
                        <div className="quiz-result-actions">
                            <Link href="/dashboard/learn" className="quiz-result-btn quiz-result-btn--back">
                                Back to Lessons
                            </Link>
                            <button className="quiz-result-btn quiz-result-btn--retry">
                                Try Again
                            </button>
                        </div>
                    )}

                </DefaultCard>
            </div>

        </div>
    );
}