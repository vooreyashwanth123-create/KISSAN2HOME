import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { INITIAL_USERS } from '../data/initialData';

interface AuthContextType {
  currentUser: User | null;
  users: User[];
  login: (email: string, role: UserRole) => boolean;
  signup: (userData: Partial<User>) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  updateUserVerification: (userId: string, status: 'verified' | 'rejected') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('k2h_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('k2h_current_user');
    if (savedUser) return JSON.parse(savedUser);
    // Default to Ramesh Patel (Farmer) for accessible immediate demo
    return INITIAL_USERS[0];
  });

  useEffect(() => {
    localStorage.setItem('k2h_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('k2h_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('k2h_current_user');
    }
  }, [currentUser]);

  const login = (email: string, role: UserRole): boolean => {
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.role === role);
    if (found) {
      setCurrentUser(found);
      return true;
    }
    // Quick demo login fallback for convenient evaluation
    const defaultForRole = users.find(u => u.role === role);
    if (defaultForRole) {
      setCurrentUser(defaultForRole);
      return true;
    }
    return false;
  };

  const signup = (userData: Partial<User>) => {
    const newUser: User = {
      id: `user_${Date.now()}`,
      name: userData.name || 'New User',
      email: userData.email || 'user@kissan2home.com',
      phone: userData.phone || '+91 90000 00000',
      role: userData.role || 'FARMER',
      avatar: userData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      location: userData.location || 'Pune, Maharashtra',
      verificationStatus: userData.role === 'FARMER' ? 'pending' : 'verified',
      farmDetails: userData.farmDetails,
      deliveryDetails: userData.deliveryDetails
    };

    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchRole = (role: UserRole) => {
    const targetUser = users.find(u => u.role === role);
    if (targetUser) {
      setCurrentUser(targetUser);
    }
  };

  const updateUserVerification = (userId: string, status: 'verified' | 'rejected') => {
    setUsers(prev =>
      prev.map(u => (u.id === userId ? { ...u, verificationStatus: status } : u))
    );
    if (currentUser?.id === userId) {
      setCurrentUser(prev => (prev ? { ...prev, verificationStatus: status } : null));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        login,
        signup,
        logout,
        switchRole,
        updateUserVerification
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
