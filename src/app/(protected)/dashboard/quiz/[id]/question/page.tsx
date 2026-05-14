'use client'

// src/app/(protected)/dashboard/quiz/[id]/question/page.tsx
// Quiz Question Page — matches Figma design
// Shows question, 4 answer options A-D, confirm button

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { DefaultCard } from '@/app/components/cards';

// ── Types ──────────────────────────────────────────────────────────────────────
interface Option {
    id:     string;
    letter: 'A' | 'B' | 'C' | 'D';
    text:   string;
}

// ── Mock data (replaced by API in Phase 2) ────────────────────────────────────
const QUESTION = {
    id:           '1',
    total:        10,
    current:      1,
    level:        'Beginner',
    progress:     10, // 1/10 = 10%
    text:         'What does a stock represent?',
    options: [
        { id: '1', letter: 'A', text: 'A loan to a company'          },
        { id: '2', letter: 'B', text: 'Ownership share in a company' },
        { id: '3', letter: 'C', text: 'A government bond'            },
        { id: '4', letter: 'D', text: 'A savings account'            },
    ] as Option[],
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function QuizQuestionPage() {
    const [selected, setSelected] = useState<string | null>(null);

    return (
        <div className="quiz-q-wrap">

            {/* ── Back link ─────────────────────────────────────────── */}
            <Link href="/dashboard" className="lesson-back">
                <FontAwesomeIcon icon={['fas', 'chevron-left']} style={{ fontSize: '12px' }} />
                Exit Quiz
            </Link>

            {/* ── Question card ─────────────────────────────────────── */}
            <div className="quiz-q-center">
                <DefaultCard className="quiz-q-card p-8">

                    {/* Header row: question count + level badge */}
                    <div className="quiz-q-header">
                        <span className="quiz-q-count">
                            Question {QUESTION.current} of {QUESTION.total}
                        </span>
                        <span className="quiz-q-level-badge">{QUESTION.level}</span>
                    </div>

                    {/* Progress bar */}
                    <progress
                        className="quiz-q-progress"
                        value={QUESTION.progress}
                        max={100}
                    />

                    {/* Question text */}
                    <h2 className="quiz-q-text">{QUESTION.text}</h2>

                    {/* Answer options */}
                    <div className="quiz-q-options">
                        {QUESTION.options.map((option) => (
                            <button
                                key={option.id}
                                type="button"
                                onClick={() => setSelected(option.id)}
                                className={`quiz-q-option ${selected === option.id ? 'quiz-q-option--selected' : ''}`}
                            >
                                <span className={`quiz-q-option-letter ${selected === option.id ? 'quiz-q-option-letter--selected' : ''}`}>
                                    {option.letter}.
                                </span>
                                <span className="quiz-q-option-text">{option.text}</span>
                            </button>
                        ))}
                    </div>

                    {/* Confirm button */}
                    <button
                        className="quiz-q-confirm-btn"
                        disabled={!selected}
                    >
                        Confirm Answer
                    </button>

                </DefaultCard>
            </div>

        </div>
    );
}