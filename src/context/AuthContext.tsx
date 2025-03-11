
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
import { supabase } from "@/integrations/supabase/client";

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
  const location = useLocation();

  const closeSupabaseConfigError = () => {
    setShowSupabaseConfigError(false);
  };

  // Handle auth code in URL on page load
  useEffect(() => {
    const handleAuthRedirect = async () => {
      if (location.hash && location.hash.includes('access_token')) {
        console.log('Detected auth redirect with hash');
        setIsLoading(true);
        
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error processing auth redirect:', error);
          toast.error('Authentication error', {
            description: 'There was an error verifying your account.',
          });
        } else if (data.session) {
          console.log('Auth redirect successful, user logged in');
          toast.success('Account verified!', {
            description: 'Your account has been verified successfully.',
          });
          navigate('/');
        }
        
        setIsLoading(false);
      }
    };

    handleAuthRedirect();
  }, [location, navigate]);

  useEffect(() => {
    console.log("AuthProvider mounted");
    
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
        console.log("Auth state changed:", event);
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
      
      if (data.user) {
        toast.success("Signup successful!", {
          description: "Please check your email for verification.",
        });
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
