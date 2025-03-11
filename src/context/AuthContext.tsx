
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { toast } from "@/components/ui/sonner";

// Safely access environment variables with custom names
const supabaseUrl = import.meta.env.VITE_CRYPTOBOT_URL;
const supabaseAnonKey = import.meta.env.VITE_CRYPTOBOT_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing. Please check your Supabase integration in Lovable.');
  // We'll provide a fallback client that will show proper error messages to users
}

// Initialize Supabase client
const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co', 
  supabaseAnonKey || 'placeholder-key'
);

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{success: boolean, error?: string}>;
  signup: (email: string, password: string, name: string) => Promise<{success: boolean, error?: string}>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if Supabase is properly configured
    if (!supabaseUrl || !supabaseAnonKey) {
      setIsLoading(false);
      toast.error("Authentication configuration error", {
        description: "Please check your Supabase integration in Lovable.",
      });
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        const userData = {
          id: data.session.user.id,
          email: data.session.user.email || '',
          name: data.session.user.user_metadata.name || '',
        };
        setUser(userData);
      }
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          const userData = {
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata.name || '',
          };
          setUser(userData);
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signup = async (email: string, password: string, name: string): Promise<{success: boolean, error?: string}> => {
    // Check if Supabase is properly configured
    if (!supabaseUrl || !supabaseAnonKey) {
      return { 
        success: false, 
        error: "Authentication is not properly configured. Please check Supabase integration." 
      };
    }

    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });
      
      if (error) {
        setIsLoading(false);
        return { success: false, error: error.message };
      }
      
      // Note: The user is not fully authenticated until they confirm their email
      if (data.user) {
        return { success: true };
      } else {
        return { success: false, error: 'An unknown error occurred' };
      }
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: 'An unexpected error occurred during signup' };
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<{success: boolean, error?: string}> => {
    // Check if Supabase is properly configured
    if (!supabaseUrl || !supabaseAnonKey) {
      return { 
        success: false, 
        error: "Authentication is not properly configured. Please check Supabase integration." 
      };
    }

    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        setIsLoading(false);
        return { success: false, error: error.message };
      }
      
      if (data.user) {
        return { success: true };
      } else {
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An unexpected error occurred during login' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
