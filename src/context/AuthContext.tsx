'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { apiClient, getAuthToken, setAuthTokens, clearAuthTokens } from '@/lib/api';
import { ApiUserProfile, AuthTokens, LoginCredentials, RegisterData } from '@/types/api';

interface AuthContextType {
  user: ApiUserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ApiUserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const token = getAuthToken();
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const userData = await apiClient.get<ApiUserProfile>('/auth/me/', token);
      setUser(userData);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      clearAuthTokens();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      const tokens = await apiClient.post<AuthTokens>('/auth/login/', credentials);
      setAuthTokens(tokens.access, tokens.refresh);
      await refreshUser();
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }, [refreshUser]);

  const register = useCallback(async (data: RegisterData) => {
    try {
      const response = await apiClient.post<ApiUserProfile & { tokens: AuthTokens }>(
        '/auth/register/',
        data
      );
      if (response.tokens) {
        setAuthTokens(response.tokens.access, response.tokens.refresh);
      }
      await refreshUser();
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }, [refreshUser]);

  const logout = useCallback(() => {
    clearAuthTokens();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
