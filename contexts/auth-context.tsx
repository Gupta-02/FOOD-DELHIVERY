'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, AuthState } from '@/types';
import { useLocalStorage } from '@/hooks/use-local-storage';

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_ERROR' }
  | { type: 'LOGOUT' }
  | { type: 'SIGNUP_START' }
  | { type: 'SIGNUP_SUCCESS'; payload: User }
  | { type: 'SIGNUP_ERROR' }
  | { type: 'LOAD_USER'; payload: User | null };

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, fullName: string) => Promise<boolean>;
  logout: () => void;
  loginAsGuest: () => void;
  updateProfile: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
    case 'SIGNUP_START':
      return { ...state, isLoading: true };
    
    case 'LOGIN_SUCCESS':
    case 'SIGNUP_SUCCESS':
      return {
        user: action.payload,
        isAuthenticated: true,
        isLoading: false
      };
    
    case 'LOGIN_ERROR':
    case 'SIGNUP_ERROR':
      return {
        user: null,
        isAuthenticated: false,
        isLoading: false
      };
    
    case 'LOGOUT':
      return {
        user: null,
        isAuthenticated: false,
        isLoading: false
      };
    
    case 'LOAD_USER':
      return {
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false
      };
    
    default:
      return state;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [storedUser] = useLocalStorage<User | null>('user', null);
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    dispatch({ type: 'LOAD_USER', payload: storedUser });
  }, [storedUser]);

  useEffect(() => {
    if (state.user) {
      localStorage.setItem('user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('user');
    }
  }, [state.user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    dispatch({ type: 'LOGIN_START' });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - in real app, validate against backend
    const users = JSON.parse(localStorage.getItem('registered-users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);
    
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      dispatch({ type: 'LOGIN_SUCCESS', payload: userWithoutPassword });
      return true;
    } else {
      dispatch({ type: 'LOGIN_ERROR' });
      return false;
    }
  };

  const signup = async (email: string, password: string, fullName: string): Promise<boolean> => {
    dispatch({ type: 'SIGNUP_START' });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user creation - in real app, send to backend
    const users = JSON.parse(localStorage.getItem('registered-users') || '[]');
    
    // Check if user already exists
    if (users.find((u: any) => u.email === email)) {
      dispatch({ type: 'SIGNUP_ERROR' });
      return false;
    }
    
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      fullName,
      createdAt: new Date(),
      isAnonymous: false
    };
    
    // Store user with password for mock authentication
    const userWithPassword = { ...newUser, password };
    users.push(userWithPassword);
    localStorage.setItem('registered-users', JSON.stringify(users));
    
    dispatch({ type: 'SIGNUP_SUCCESS', payload: newUser });
    return true;
  };

  const loginAsGuest = () => {
    const guestUser: User = {
      id: `guest-${Date.now()}`,
      email: '',
      fullName: 'Guest User',
      createdAt: new Date(),
      isAnonymous: true
    };
    
    dispatch({ type: 'LOGIN_SUCCESS', payload: guestUser });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const updateProfile = (userData: Partial<User>) => {
    if (state.user) {
      const updatedUser = { ...state.user, ...userData };
      dispatch({ type: 'LOGIN_SUCCESS', payload: updatedUser });
    }
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      signup,
      logout,
      loginAsGuest,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}