
import { useState, useEffect } from 'react';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Check for active session on load
    const storedUser = localStorage.getItem('dtech_current_user');
    if (storedUser) {
      setAuthState({
        user: JSON.parse(storedUser),
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = (email: string, password: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const usersRaw = localStorage.getItem('dtech_users');
        const users = usersRaw ? JSON.parse(usersRaw) : [];
        
        const foundUser = users.find((u: any) => u.email === email && u.password === password);

        if (foundUser) {
          const { password, ...userWithoutPassword } = foundUser;
          localStorage.setItem('dtech_current_user', JSON.stringify(userWithoutPassword));
          setAuthState({
            user: userWithoutPassword,
            isAuthenticated: true,
            isLoading: false,
          });
          resolve();
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 800); // Fake network delay
    });
  };

  const register = (name: string, email: string, password: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const usersRaw = localStorage.getItem('dtech_users');
        const users = usersRaw ? JSON.parse(usersRaw) : [];

        if (users.find((u: any) => u.email === email)) {
          reject(new Error('User already exists'));
          return;
        }

        const newUser = {
          id: Date.now().toString(),
          name,
          email,
          password, // In a real app, never store plain text passwords!
          role: 'admin'
        };

        users.push(newUser);
        localStorage.setItem('dtech_users', JSON.stringify(users));
        
        // Auto login after register
        const { password: _, ...userWithoutPassword } = newUser;
        localStorage.setItem('dtech_current_user', JSON.stringify(userWithoutPassword));
        setAuthState({
          user: userWithoutPassword as User,
          isAuthenticated: true,
          isLoading: false,
        });
        
        resolve();
      }, 800);
    });
  };

  const logout = () => {
    localStorage.removeItem('dtech_current_user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return {
    ...authState,
    login,
    register,
    logout
  };
};
