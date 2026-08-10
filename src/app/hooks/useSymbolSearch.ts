// src/app/hooks/useSymbolSearch.ts

import { useState, useCallback, useRef } from 'react';
import { marketService } from '@/services/market.service';
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
        if (debounceTimer.current) clearTimeout(debounceTimer.current);

        if (keyword.length < MIN_QUERY_LENGTH) {
            setSuggestions([]);
            setIsSearching(false);
            return;
        }

        setIsSearching(true);

        debounceTimer.current = setTimeout(async () => {
            try {
                // indexes=false is fine here — we don't want raw index symbols
                // showing up next to real stocks/ETFs in the dropdown
                const { data } = await marketService.searchSymbols(keyword, false);
                const securities = data.data ?? [];

                // Backend returns { symbol, exchange, type, description } —
                // map to the shape this hook's consumers expect
                const symbols: SymbolSuggestion[] = securities.map((s) => ({
                    symbol: s.symbol,
                    name: s.description,
                    type: s.type,
                    region: s.exchange,
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