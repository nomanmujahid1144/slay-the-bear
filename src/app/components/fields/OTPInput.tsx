// src/app/components/fields/OTPInput.tsx

'use client'

import { useEffect, useRef } from 'react';

interface OTPInputProps {
    value: string;
    onChange: (otp: string) => void;
    length?: number;
    disabled?: boolean;
}

export default function OTPInput({ value, onChange, length = 6, disabled = false }: OTPInputProps) {
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

    const focusInput = (index: number) => {
        inputsRef.current[index]?.focus();
    };

    // Focus first box on mount
    useEffect(() => {
        focusInput(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // When value is cleared externally (e.g. failed verify), refocus first box
    useEffect(() => {
        if (value === '') focusInput(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const handleChange = (index: number, digit: string) => {
        const clean = digit.replace(/\D/g, '');
        if (!clean) return;

        const next = value.split('');
        next[index] = clean[clean.length - 1]; // Keep last typed digit
        const newValue = next.join('').slice(0, length);
        onChange(newValue);

        // Auto-advance to next box
        if (index < length - 1) focusInput(index + 1);
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
            e.preventDefault();
            const next = value.split('');

            if (next[index]) {
                // Clear current box
                next[index] = '';
                onChange(next.join(''));
            } else if (index > 0) {
                // Current empty — clear previous box and jump back
                next[index - 1] = '';
                onChange(next.join(''));
                focusInput(index - 1);
            }
        } else if (e.key === 'ArrowLeft' && index > 0) {
            focusInput(index - 1);
        } else if (e.key === 'ArrowRight' && index < length - 1) {
            focusInput(index + 1);
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
        if (!pasted) return;

        onChange(pasted);
        // Focus the box after the last pasted digit
        focusInput(Math.min(pasted.length, length - 1));
    };

    return (
        <div className="d-flex gap-2 justify-content-center my-4">
            {Array.from({ length }).map((_, index) => (
                <input
                    key={index}
                    ref={(el) => { inputsRef.current[index] = el; }}
                    type="text"
                    inputMode="numeric"
                    autoComplete={index === 0 ? 'one-time-code' : 'off'}
                    maxLength={1}
                    value={value[index] ?? ''}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    onFocus={(e) => e.target.select()}
                    disabled={disabled}
                    className="form-control text-center fw-bold"
                    style={{
                        width: '52px',
                        height: '58px',
                        fontSize: '24px',
                        borderRadius: '10px',
                    }}
                />
            ))}
        </div>
    );
}