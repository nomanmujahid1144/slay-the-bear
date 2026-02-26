// src/app/hooks/useCalculator.ts
// Generic hook for all calculators — handles loading state + artificial delay

import { useState } from 'react';

const CALC_DELAY_MS = 600;

interface UseCalculatorReturn<TResult> {
    result: TResult | null;
    loading: boolean;
    calculate: (fn: () => Promise<TResult>) => Promise<void>;
    reset: (initialForm?: () => void) => void;
}

export function useCalculator<TResult>(): UseCalculatorReturn<TResult> {
    const [result, setResult] = useState<TResult | null>(null);
    const [loading, setLoading] = useState(false);

    const calculate = async (fn: () => Promise<TResult>) => {
        setResult(null);
        setLoading(true);
        try {
            const [data] = await Promise.all([
                fn(),
                new Promise((resolve) => setTimeout(resolve, CALC_DELAY_MS)),
            ]);
            setResult(data);
        } catch {
            // Error handled by errorHandler in axios interceptor
        } finally {
            setLoading(false);
        }
    };

    const reset = (clearForm?: () => void) => {
        setResult(null);
        clearForm?.();
    };

    return { result, loading, calculate, reset };
}