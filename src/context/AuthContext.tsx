'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface User {
  email: string;
  name: string;
  phone: string;
  role: 'buyer' | 'seller' | 'admin';
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string; role?: User['role'] };
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  login: () => ({ success: false, error: '' }),
  logout: () => {},
  updateUser: () => {},
});

const MOCK_USERS: Record<string, { password: string; name: string; phone: string; role: User['role'] }> = {
  'test@example.com': { password: 'password123', name: 'Budi Santoso', phone: '081234567890', role: 'buyer' },
  'seller@example.com': { password: 'password123', name: 'Seller Kuat', phone: '081234567891', role: 'seller' },
  'admin@example.com': { password: 'password123', name: 'Admin ThriftHub', phone: '081234567892', role: 'admin' },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('thrifthub_user');
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch { /* ignore */ }
    }
  }, []);

  const login = useCallback((email: string, password: string) => {
    const emailKey = email.toLowerCase().trim();
    const mock = MOCK_USERS[emailKey];
    if (!mock || mock.password !== password) {
      return { success: false, error: 'Email atau password salah' };
    }
    const newUser: User = { email: emailKey, name: mock.name, phone: mock.phone, role: mock.role, avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}` };
    setUser(newUser);
    localStorage.setItem('thrifthub_user', JSON.stringify(newUser));
    return { success: true, role: mock.role };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('thrifthub_user');
  }, []);

  const updateUser = useCallback((data: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...data } : null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

