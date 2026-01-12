import { api } from '../../services/api/apiBase';
import { create } from 'zustand';

interface User {
  id: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  hydrate: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  loading: false,

  login: async (email, password) => {
    set({ loading: true });
    try {
      const { data } = await api.post('auth/login', {
        email,
        password,
      });
      console.log('🚀 ~ data:', data);

      localStorage.setItem('token', data.access_token);

      set({
        token: data.access_token,
        user: data.user,
      });
    } finally {
      set({ loading: false });
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },

  register: async (name: string, email: string, password: string) => {
    set({ loading: true });
    try {
      const { data } = await api.post('/auth/register', {
        name,
        email,
        password,
      });
      console.log('🚀 ~ data:', data);

      localStorage.setItem('token', data.access_token);

      set({
        token: data.access_token,
        user: data.user,
      });
    } finally {
      set({ loading: false });
    }
  },

  hydrate: () => {
    const token = localStorage.getItem('token');
    if (token) {
      set({ token });
    }
  },
}));
