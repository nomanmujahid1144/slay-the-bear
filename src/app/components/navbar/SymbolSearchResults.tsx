// src/app/components/navbar/SymbolSearchResults.tsx

import Link from 'next/link';
import type { SymbolSuggestion } from '@/app/hooks/useSymbolSearch';

interface SymbolSearchResultsProps {
    suggestions: SymbolSuggestion[];
    isSearching: boolean;
    onSelect: () => void;
}

export function SymbolSearchResults({
    suggestions,
    isSearching,
    onSelect,
}: SymbolSearchResultsProps) {
    if (isSearching) {
        return (
            <ul className="absolute bg-white z-10 rounded-lg p-3 w-full shadow-md">
                <li className="px-2 py-2 text-sm text-gray-400 animate-pulse">
                    Searching...
                </li>
            </ul>
        );
    }

    if (suggestions.length === 0) return null;

    return (
        <ul className="absolute bg-white z-10 rounded-lg p-3 w-full shadow-md max-h-72 overflow-y-auto">
            {suggestions.map((suggestion) => (
                <li key={suggestion.symbol}>
                    <Link
                        href={`/symbols?tvwidgetsymbol=${suggestion.symbol}`}
                        onClick={onSelect}
                        className="flex items-center justify-between gap-2 px-2 py-2 rounded hover:bg-gray-50 transition-colors"
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">
                                {suggestion.symbol}
                            </span>
                            <span className="text-sm text-gray-700 truncate max-w-[180px]">
                                {suggestion.name}
                            </span>
                        </div>
                        <span className="text-xs text-gray-400 whitespace-nowrap">
                            {suggestion.region}
                        </span>
                    </Link>
                </li>
            ))}
        </ul>
    );
}