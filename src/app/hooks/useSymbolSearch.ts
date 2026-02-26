// src/app/hooks/useSymbolSearch.ts

import { useState, useCallback, useRef } from 'react';
import axios from 'axios';
import env from '@/config/env';
import type { ChangeEvent } from 'react';

export interface SymbolSuggestion {
    symbol: string;
    name: string;
    type: string;
    region: string;
}

const MIN_QUERY_LENGTH = 2;
const DEBOUNCE_MS = 350;

export function useSymbolSearch() {
    const [suggestions, setSuggestions] = useState<SymbolSuggestion[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const search = useCallback((keyword: string) => {
        // Clear previous timer on every keystroke
        if (debounceTimer.current) clearTimeout(debounceTimer.current);

        if (keyword.length < MIN_QUERY_LENGTH) {
            setSuggestions([]);
            setIsSearching(false);
            return;
        }

        setIsSearching(true);

        debounceTimer.current = setTimeout(async () => {
            try {
                const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${encodeURIComponent(keyword)}&apikey=${env.ALPHA_VANTAGE_API_KEY}`;
                const { data } = await axios.get(url, {
                    headers: { 'User-Agent': 'axios' },
                });

                const matches = data['bestMatches'] ?? [];
                const symbols: SymbolSuggestion[] = matches.map((item: Record<string, string>) => ({
                    symbol: item['1. symbol'],
                    name:   item['2. name'],
                    type:   item['3. type'],
                    region: item['4. region'],
                }));

                setSuggestions(symbols);
            } catch {
                setSuggestions([]);
            } finally {
                setIsSearching(false);
            }
        }, DEBOUNCE_MS);
    }, []);

    const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        search(e.target.value);
    }, [search]);

    const clearSuggestions = useCallback(() => {
        setSuggestions([]);
        setIsSearching(false);
        if (debounceTimer.current) clearTimeout(debounceTimer.current);
    }, []);

    return { suggestions, isSearching, handleSearch, clearSuggestions };
}