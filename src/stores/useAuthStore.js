// src/stores/useAuthStore.js - CREATE

import { create } from 'zustand';
import { authService } from '@/services/auth.service';
import { userService } from '@/services/user.service';

export const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  // Initialize auth state on app load
  initialize: async () => {
    try {
      const { data } = await userService.getProfile();
      set({ 
        user: data.data, 
        isAuthenticated: true, 
        isLoading: false 
      });
    } catch (error) {
      set({ 
        user: null, 
        isAuthenticated: false, 
        isLoading: false 
      });
    }
  },

  // Login
  login: async (credentials) => {
    const { data } = await authService.login(credentials);
    set({ 
      user: data.data.user, 
      isAuthenticated: true 
    });
    return data;
  },

  // Logout
  logout: async () => {
    await authService.logout();
    set({ 
      user: null, 
      isAuthenticated: false 
    });
  },

  // Update user data
  setUser: (user) => set({ 
    user, 
    isAuthenticated: true 
  }),

  // Clear user data
  clearUser: () => set({ 
    user: null, 
    isAuthenticated: false 
  }),

  // Update user subscription
  updateSubscription: (subscription) => set((state) => ({
    user: state.user ? { ...state.user, ...subscription } : null
  })),
}));