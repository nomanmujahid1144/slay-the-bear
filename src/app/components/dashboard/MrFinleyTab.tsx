'use client'

// src/app/components/dashboard/MrFinleyTab.tsx
// Mr. Finley Tab — Empty state + Chat state
// Toggle via hasMessages state
// AI integration handled in Phase 2

import { useState } from 'react';
import Image from 'next/image';
import {
    AttachmentIcon, ChainIcon, ExampleBulbIcon,
    ExploreIcon, FileEditIcon, GalaryIcon, MessageSendIcon, MicrophoneIcon, PaperClipIcon, QuizMeIcon,
    StarIcon
} from '../icons';
import { DefaultCard } from '../cards';

// ── Types ──────────────────────────────────────────────────────────────────────
interface Message {
    id: string;
    role: 'ai' | 'user';
    text: string;
    timestamp: string;
}

// ── Quick action chips ─────────────────────────────────────────────────────────
const QUICK_ACTIONS = [
    { id: '1', label: 'Explain a concept', icon: <ExploreIcon size={12} /> },
    { id: '2', label: 'Show me examples', icon: <ExampleBulbIcon size={15} /> },
    { id: '3', label: 'Quiz me', icon: <QuizMeIcon size={12} /> },
    { id: '4', label: 'Related lessons', icon: <ChainIcon size={12} /> },
];

// ── Suggested questions (bottom of chat) ──────────────────────────────────────
const SUGGESTED = [
    'What is compound interest?',
    'Explain ETFs simply',
    'How do dividends work?',
    "What's a bear market?",
    'Should I invest in crypto?',
];

// ── Mock messages (replaced by real AI in Phase 2) ────────────────────────────
const MOCK_MESSAGES: Message[] = [
    {
        id: '1', role: 'ai', timestamp: '09:40',
        text: "Hey there! I'm Mr. Finley, your personal financial guide. Ask me anything about investing, markets, or your lessons — I'm here to help you slay the bear! 🐻",
    },
    {
        id: '2', role: 'user', timestamp: '09:10',
        text: "What's the difference between a stock and a bond?",
    },
    {
        id: '3', role: 'ai', timestamp: '09:40',
        text: "Great question! A stock represents ownership in a company — when the company grows, your investment can grow too. A bond is more like a loan you give to a company or government; they pay you back with interest over time. Stocks carry more risk but higher potential reward. Bonds are more stable but lower return. Think of stocks as the accelerator and bonds as the safety net in your portfolio!",
    },
    {
        id: '4', role: 'user', timestamp: '09:10',
        text: 'How do I start building a portfolio with just $500?',
    },
    {
        id: '5', role: 'ai', timestamp: '09:40',
        text: "Love the initiative! With $500, here's a solid starter approach: First, open a brokerage account (many have no minimums). Then consider low-cost index ETFs like SPY or VTI — they give you instant diversification across hundreds of companies. Allocate maybe 80% to a broad market ETF and 20% to bonds or a dividend ETF. Keep costs low, stay consistent, and don't panic when the market dips. Time in the market beats timing the market!",
    },
];

// ── Component ─────────────────────────────────────────────────────────────────
export const MrFinleyTab = () => {
    const [hasMessages, setHasMessages] = useState(true);
    const [inputValue, setInputValue] = useState('');

    // Demo: clicking send toggles to chat view
    const handleSend = () => {
        if (inputValue.trim()) setHasMessages(true);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // ── EMPTY STATE ────────────────────────────────────────────
    if (!hasMessages) {
        return (
            <div className="finley-wrap">
                <div className="finley-empty">

                    {/* Avatar */}
                    <div className="finley-empty-avatar-wrap">
                        <Image
                            src="/assets/img/profile_online.png"
                            alt="Mr. Finley"
                            width={57}
                            height={57}
                            className="finley-empty-avatar"
                        />
                        <span className="finley-empty-dot" />
                    </div>

                    {/* Greeting */}
                    <div className="finley-empty-greeting">
                        <p className="finley-greeting-top">Good Morning, Masud A.</p>
                        <p className="finley-greeting-bottom">
                            HOW Can I{' '}
                            <span className="finley-greeting-highlight">Assist You Today?</span>
                        </p>
                    </div>

                    {/* Input box */}
                    <div className="finley-input-box">
                        <textarea
                            className="finley-input"
                            placeholder="Ask me anything about..."
                            rows={2}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <div className="finley-input-footer">
                            <button className="finley-attach-btn shadow-xs" aria-label="Attach">
                                <AttachmentIcon size={12} />
                            </button>
                            <div className="finley-chips">
                                {QUICK_ACTIONS.map((action) => (
                                    <button key={action.id} className="finley-chip shadow-xs">
                                        {action.icon}
                                        {action.label}
                                    </button>
                                ))}
                            </div>
                            <button className="finley-voice-btn-outer" onClick={handleSend} aria-label="Send">
                                <div className="finley-voice-btn">
                                    <MicrophoneIcon size={16} />
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Today's Tip */}
                    <div className="finley-tip-section">
                        <p className="finley-tip-label">To Cay's Tip</p>
                        <div className="finley-tip-card">
                            <FileEditIcon size={16} />
                            <p className="finley-tip-title">Finley Says</p>
                            <p className="finley-tip-text">
                                Invest in yourself; every lesson grows like interest over time.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        );
    }

    // ── CHAT STATE ─────────────────────────────────────────────
    return (
        <DefaultCard className="finley-chat-layout !p-4">

            {/* ── Main chat area ────────────────────────────────── */}
            <div className="finley-chat-main">

                {/* Chat header */}
                <div className="finley-chat-header">
                    <div className="finley-chat-header-left">
                        <div className="finley-chat-avatar-wrap">
                            <Image
                                src="/assets/img/profile_online.png"
                                alt="Mr. Finley"
                                width={40}
                                height={40}
                                className="finley-chat-avatar"
                            />
                            <span className="finley-chat-dot" />
                        </div>
                        <div>
                            <p className="finley-chat-name">Mr. Finley</p>
                            <p className="finley-chat-status">Online</p>
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <div className="finley-messages">
                    {MOCK_MESSAGES.map((msg) => (
                        <div key={msg.id}>
                            <div className={`finley-msg-row finley-msg-row--${msg.role}`}>
                                <div className={`finley-msg-bubble finley-msg-bubble--${msg.role}`}>
                                    <p className="finley-msg-text">{msg.text}</p>
                                </div>
                                {msg.role === 'ai' && (
                                    <button className="finley-msg-reaction">😊</button>
                                )}
                            </div>
                            <p className={`finley-msg-time finley-msg-time--${msg.role}`}>
                                {msg.timestamp}
                                {msg.role === 'user' && ' ✓✓'}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Suggested questions */}
                <div className="finley-suggested">
                    {SUGGESTED.map((q, i) => (
                        <button key={i} className="finley-suggested-chip">{q}</button>
                    ))}
                </div>

                {/* Chat input bar */}
                <div className="finley-chat-input-bar">
                    <button className="finley-chat-input-icon" aria-label="Image">
                        <GalaryIcon size={25} />
                    </button>
                    <button className="finley-chat-input-icon" aria-label="Refresh">
                        <PaperClipIcon size={25} />
                    </button>
                    <input
                        type="text"
                        className="finley-chat-input"
                        placeholder="Send Your Message ..."
                    />
                    <button className="finley-chat-send-btn" aria-label="Send">
                        <MessageSendIcon size={18} />
                    </button>
                </div>

            </div>

            {/* ── Right sidebar ─────────────────────────────────── */}
            <DefaultCard className="finley-chat-sidebar !p-5">
                <div className='flex flex-col justify-between h-full'>
                    <div>
                        {/* Quick Actions */}
                        <div className="finley-sidebar-section">
                            <p className="finley-sidebar-title">QUICK ACTIONS</p>
                            <div className="finley-sidebar-actions">
                                {QUICK_ACTIONS.map((action) => (
                                    <button key={action.id} className="finley-sidebar-action">
                                        <span className='finley-sidebar-action-icon'>
                                            {action.icon}
                                        </span>
                                        {action.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Today's Tip */}
                        <div className="finley-sidebar-section">
                            <p className="finley-sidebar-title">TODAY'S TIP</p>
                            <div className="finley-sidebar-tip">
                                <p className="finley-sidebar-tip-title">
                                    <StarIcon size={20} />
                                    Finley Says
                                </p>
                                <p className="finley-sidebar-tip-text">
                                    "The best investment you can make is in yourself. Every lesson you complete compounds over time, just like interest!"
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Session Stats */}
                    <div className="finley-sidebar-section">
                        <p className="finley-sidebar-title">SESSION STATS</p>
                        <div className="finley-sidebar-stats">
                            <div className="finley-sidebar-stat">
                                <span className="finley-sidebar-stat-label">Questions Asked</span>
                                <span className="finley-sidebar-stat-value">2</span>
                            </div>
                            <div className="finley-sidebar-stat">
                                <span className="finley-sidebar-stat-label">Topics Covered</span>
                                <span className="finley-sidebar-stat-value">4</span>
                            </div>
                        </div>
                    </div>
                </div>

            </DefaultCard>

        </DefaultCard>
    );
};