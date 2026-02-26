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
                userService.getProfile(),
                // Artificial delay so skeleton renders for at least INIT_DELAY_MS
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