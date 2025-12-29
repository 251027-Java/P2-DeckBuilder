import { create } from 'zustand';
import { User } from '../types/User';
import authService from '../services/authService';
import toast from 'react-hot-toast';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string, email: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: authService.getCurrentUser(),
  isAuthenticated: authService.isAuthenticated(),
  isLoading: false,
  error: null,

  login: async (username, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.login({ username, password });
      set({ 
        user: response.user, 
        isAuthenticated: true, 
        isLoading: false 
      });
      toast.success(`Welcome back, ${response.user.username}!`);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  register: async (username, password, email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.register({ username, password, email });
      set({ 
        user: response.user, 
        isAuthenticated: true, 
        isLoading: false 
      });
      toast.success(`Welcome, ${response.user.username}!`);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  logout: () => {
    authService.logout();
    set({ user: null, isAuthenticated: false });
    toast.success('Logged out successfully');
  },

  clearError: () => set({ error: null }),

  checkAuth: () => {
    const user = authService.getCurrentUser();
    const isAuthenticated = authService.isAuthenticated();
    set({ user, isAuthenticated });
  },
}));