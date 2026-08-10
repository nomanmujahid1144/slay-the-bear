// src/stores/useAuthStore.ts

import { create } from 'zustand';
import { authService } from '@/services/auth.service';
import { userService } from '@/services/user.service';
import type { LoginRequest } from '@/types/auth';
import type { UserProfile } from '@/types/user/user.types';

const INIT_DELAY_MS = 600; // Enough to show skeleton without feeling sluggish

interface AuthState {
    user: UserProfile | null;
    isAuthenticated: boolean;
    isLoading: boolean;

    initialize: () => Promise<void>;
    refreshUser: () => Promise<void>;
    login: (credentials: LoginRequest) => Promise<void>;
    logout: () => Promise<void>;
    setUser: (user: UserProfile) => void;
    clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,

initialize: async () => {
        try {
            const [{ data }] = await Promise.all([
                userService.getProfile(true),   // ← silent — just checking auth status, not a user action
                new Promise((resolve) => setTimeout(resolve, INIT_DELAY_MS)),
            ]);
            set({
                user: data.data ?? null,
                isAuthenticated: true,
                isLoading: false,
            });
        } catch {
            set({
                user: null,
                isAuthenticated: false,
                isLoading: false,
            });
        }
    },

    // Silent refetch — no delay, no loading flash. Use after actions that
    // change the user server-side (e.g. subscribing to a plan) so the
    // store reflects the DB instead of the stale snapshot from login/initialize.
    refreshUser: async () => {
        try {
            const { data } = await userService.getProfile(true);
            set({
                user: data.data ?? null,
                isAuthenticated: true,
            });
        } catch {
            // Silent — keep whatever we had rather than kicking the user out
        }
    },

    login: async (credentials: LoginRequest) => {
        const { data } = await authService.login(credentials);
        set({
            user: data.data?.user ?? null,
            isAuthenticated: true,
        });
    },

    logout: async () => {
        await authService.logout();
        set({ user: null, isAuthenticated: false });
    },

    setUser: (user: UserProfile) => set({ user, isAuthenticated: true }),

    clearUser: () => set({ user: null, isAuthenticated: false }),
}));