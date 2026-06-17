// store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState } from '@/types/auth';
import { DUMMY_USERS } from '@/data/dummyUser';
import { useCartStore } from './cart/useCartStore';

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,


      login: (email: string, password: string): boolean => {
        const foundUser = DUMMY_USERS.find(
          u => u.email === email && u.password === password
        );

        if (foundUser) {
          const { password: _, ...userWithoutPassword } = foundUser;

          const token = btoa(
            `${foundUser.id}:${foundUser.role}:${Date.now()}`
          );

          set({
            user: userWithoutPassword,
            token,
            isAuthenticated: true
          });

          useCartStore.getState()
            .initializeCart(foundUser.id);

          return true;
        }

        return false;
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false
        });
      },

      getUserRole: () => {
        const { user } = get();
        return user?.role || null;
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);