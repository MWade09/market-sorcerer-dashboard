
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { toast } from "@/components/ui/sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Safely access environment variables with custom names
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_CRYPTOBOT_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_CRYPTOBOT_ANON_KEY;

// Debug environment variables
console.log("Supabase URL available:", !!supabaseUrl);
console.log("Supabase Anon Key available:", !!supabaseAnonKey);
console.log("All env vars:", Object.keys(import.meta.env).filter(key => key.startsWith('VITE_')));

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
  showSupabaseConfigError: boolean;
  closeSupabaseConfigError: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSupabaseConfigError, setShowSupabaseConfigError] = useState(false);
  const navigate = useNavigate();

  const closeSupabaseConfigError = () => {
    setShowSupabaseConfigError(false);
  };

  useEffect(() => {
    // Check if Supabase is properly configured
    if (!supabaseUrl || !supabaseAnonKey) {
      setIsLoading(false);
      setShowSupabaseConfigError(true);
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
    }).catch(error => {
      console.error("Error getting session:", error);
      setIsLoading(false);
      toast.error("Authentication error", {
        description: "Error retrieving your session. Please try again.",
      });
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
      setShowSupabaseConfigError(true);
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
      setShowSupabaseConfigError(true);
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
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        login, 
        signup, 
        logout, 
        isLoading, 
        showSupabaseConfigError, 
        closeSupabaseConfigError 
      }}
    >
      {children}
      <Dialog open={showSupabaseConfigError} onOpenChange={setShowSupabaseConfigError}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supabase Configuration Required</DialogTitle>
            <DialogDescription>
              To use authentication features, you need to configure your Supabase integration with Lovable.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p>Please follow these steps:</p>
            <ol className="list-decimal ml-5 space-y-2">
              <li>Click the Supabase button in the top navigation menu</li>
              <li>Connect to your Supabase project or create a new one</li>
              <li>Ensure the environment variables are properly configured</li>
              <li>The following variables need to be set:
                <ul className="list-disc ml-5 mt-2">
                  <li>VITE_SUPABASE_URL or VITE_CRYPTOBOT_URL</li>
                  <li>VITE_SUPABASE_ANON_KEY or VITE_CRYPTOBOT_ANON_KEY</li>
                </ul>
              </li>
            </ol>
          </div>
          <DialogFooter>
            <Button onClick={closeSupabaseConfigError}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
