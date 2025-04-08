
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "@/components/ui/sonner";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database for demo purposes
const MOCK_USERS = [
  {
    id: '1',
    email: 'demo@example.com',
    name: 'Demo User',
    password: 'password123'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in via localStorage
    const storedUser = localStorage.getItem('emailUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user', error);
        localStorage.removeItem('emailUser');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API request delay
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    // Find user in our mock database
    const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('emailUser', JSON.stringify(userWithoutPassword));
      toast.success("Logged in successfully");
    } else {
      toast.error("Invalid email or password");
      throw new Error('Invalid email or password');
    }
    
    setLoading(false);
  };

  const signup = async (name: string, email: string, password: string) => {
    // Simulate API request delay
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    // Check if user already exists
    if (MOCK_USERS.some(u => u.email === email)) {
      toast.error("User with this email already exists");
      setLoading(false);
      throw new Error('User with this email already exists');
    }

    // Create new user
    const newUser = {
      id: `${MOCK_USERS.length + 1}`,
      email,
      name,
      password
    };

    // Add to mock database (in a real app, this would be a proper API call)
    MOCK_USERS.push(newUser);

    // Log user in
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('emailUser', JSON.stringify(userWithoutPassword));
    
    toast.success("Account created successfully");
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('emailUser');
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
