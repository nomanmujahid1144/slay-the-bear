// src/hooks/useMarketWebSocket.ts

'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import type { Quote } from '@/types/markets';

interface UseMarketWebSocketProps {
    symbols: string[];
    onQuoteUpdate?: (quote: Quote) => void;
    enabled?: boolean;
}

interface WebSocketMessage {
    type: 'connected' | 'subscribed' | 'unsubscribed' | 'quote' | 'error';
    message?: string;
    symbols?: string[];
    data?: any;
}

export function useMarketWebSocket({
    symbols,
    onQuoteUpdate,
    enabled = true
}: UseMarketWebSocketProps) {
    const ws = useRef<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const reconnectTimeout = useRef<NodeJS.Timeout | undefined>(undefined);
    const reconnectAttempts = useRef(0);
    const maxReconnectAttempts = 5;
    const isConnecting = useRef(false); // Prevent multiple simultaneous connections

    // Get WebSocket URL from environment
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:5000/ws/markets';

    /**
     * Connect to WebSocket
     */
    const connect = useCallback(() => {
        if (!enabled || symbols.length === 0) return;
        
        // Prevent multiple simultaneous connection attempts
        if (isConnecting.current) {
            console.log('[WebSocket] Already connecting, skipping...');
            return;
        }

        try {
            isConnecting.current = true;
            
            // Create WebSocket connection
            ws.current = new WebSocket(wsUrl);

            // Connection opened
            ws.current.onopen = () => {
                console.log('✅ WebSocket connected');
                setIsConnected(true);
                setError(null);
                reconnectAttempts.current = 0;
                isConnecting.current = false; // Reset flag

                // FIXED: Wait for connection to be fully ready before sending
                setTimeout(() => {
                    if (ws.current && ws.current.readyState === WebSocket.OPEN && symbols.length > 0) {
                        ws.current.send(JSON.stringify({
                            type: 'subscribe',
                            symbols
                        }));
                    }
                }, 100);
            };

            // Listen for messages
            ws.current.onmessage = (event) => {
                try {
                    const message: WebSocketMessage = JSON.parse(event.data);

                    switch (message.type) {
                        case 'connected':
                            console.log('📡', message.message);
                            break;

                        case 'subscribed':
                            console.log('✅ Subscribed to:', message.symbols);
                            break;

                        case 'quote':
                            if (message.data && onQuoteUpdate) {
                                onQuoteUpdate(message.data);
                            }
                            break;

                        case 'error':
                            console.error('WebSocket error:', message.message);
                            setError(message.message || 'Unknown error');
                            break;
                    }
                } catch (error) {
                    console.error('Error parsing WebSocket message:', error);
                }
            };

            // Connection closed
            ws.current.onclose = () => {
                console.log('❌ WebSocket disconnected');
                setIsConnected(false);
                isConnecting.current = false; // Reset flag

                // Attempt to reconnect
                if (reconnectAttempts.current < maxReconnectAttempts) {
                    const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000);
                    console.log(`🔄 Reconnecting in ${delay / 1000}s...`);

                    reconnectTimeout.current = setTimeout(() => {
                        reconnectAttempts.current += 1;
                        connect();
                    }, delay);
                } else {
                    setError('Failed to connect after multiple attempts');
                }
            };

            // Connection error
            ws.current.onerror = (error) => {
                console.error('WebSocket error:', error);
                setError('Connection error');
                isConnecting.current = false; // Reset flag
            };

        } catch (error) {
            console.error('Error creating WebSocket:', error);
            setError('Failed to create connection');
            isConnecting.current = false; // Reset flag
        }
    }, [symbols, enabled, wsUrl, onQuoteUpdate]);

    /**
     * Disconnect from WebSocket
     */
    const disconnect = useCallback(() => {
        if (reconnectTimeout.current) {
            clearTimeout(reconnectTimeout.current);
        }

        if (ws.current) {
            // Unsubscribe from symbols
            if (ws.current.readyState === WebSocket.OPEN && symbols.length > 0) {
                try {
                    ws.current.send(JSON.stringify({
                        type: 'unsubscribe',
                        symbols
                    }));
                } catch (e) {
                    // Ignore if send fails
                }
            }

            ws.current.close();
            ws.current = null;
        }

        setIsConnected(false);
    }, [symbols]);

    /**
     * Subscribe to new symbols
     */
    const subscribe = useCallback((newSymbols: string[]) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify({
                type: 'subscribe',
                symbols: newSymbols
            }));
        }
    }, []);

    /**
     * Unsubscribe from symbols
     */
    const unsubscribe = useCallback((symbolsToRemove: string[]) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify({
                type: 'unsubscribe',
                symbols: symbolsToRemove
            }));
        }
    }, []);

    // Connect on mount, disconnect on unmount
    useEffect(() => {
        connect();

        return () => {
            disconnect();
        };
    }, [connect, disconnect]);

    // FIXED: Update subscription when symbols change - with readyState check
    useEffect(() => {
        if (isConnected && ws.current && ws.current.readyState === WebSocket.OPEN) {
            // Resubscribe with new symbols
            setTimeout(() => {
                if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                    ws.current.send(JSON.stringify({
                        type: 'subscribe',
                        symbols
                    }));
                }
            }, 50);
        }
    }, [symbols, isConnected]);

    return {
        isConnected,
        error,
        subscribe,
        unsubscribe,
        reconnect: connect
    };
}