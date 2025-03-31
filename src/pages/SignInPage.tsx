import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Mail, Lock, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

// Type declarations for Chrome extension API
declare global {
  interface Window {
    chrome?: {
      runtime?: {
        sendMessage?: (
          extensionId: string,
          message: any,
          options?: any
        ) => Promise<any>;
      };
    };
  }
  const chrome: Window['chrome'];
}

// Extension ID for development and production
const EXTENSION_ID = 'ipkfbbjjlklmccnlhebanolgjhhjdidg'; // Replace with your actual extension ID

// Debug function to check extension availability
const debugChromeRuntime = () => {
  console.log('Chrome object available:', typeof window.chrome !== 'undefined');
  console.log(
    'Chrome runtime available:',
    typeof window.chrome?.runtime !== 'undefined'
  );
  console.log(
    'Chrome sendMessage available:',
    typeof window.chrome?.runtime?.sendMessage !== 'undefined'
  );
  console.log('Using Extension ID:', EXTENSION_ID);
  console.log('Current URL:', window.location.href);
  console.log('Current Origin:', window.location.origin);
};

interface UserData {
  email: string;
  subscriptionStatus?: string;
  id: string;
}

interface AuthUser {
  email: string | null;
  id?: string;
  subscriptionStatus?: string;
  [key: string]: any; // Allow for additional properties
}

export const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const notifyExtension = async (userData: UserData) => {
    try {
      console.log('=== Extension Communication Debug ===');
      debugChromeRuntime();
      console.log('Attempting to notify extension with data:', userData);

      // Check if Chrome runtime is available
      if (
        typeof window.chrome === 'undefined' ||
        !window.chrome?.runtime?.sendMessage
      ) {
        console.error(
          'Chrome runtime not available - are you running this in Chrome with the extension installed?'
        );
        return;
      }

      // Get the current session
      const { data: sessionData } = await supabase.auth.getSession();
      const access_token = sessionData?.session?.access_token;

      console.log('Sending message to extension...');
      // Try to send message to extension
      const response = await window.chrome.runtime.sendMessage(EXTENSION_ID, {
        type: 'SIGNIN_SUCCESS',
        userData: {
          email: userData.email,
          subscriptionStatus: userData.subscriptionStatus || 'free',
          userId: userData.id,
          access_token: access_token,
        },
      });

      console.log('Raw extension response:', response);

      if (response?.success) {
        console.log('Successfully notified extension');
      } else {
        console.warn('Extension notification failed:', response);
      }
    } catch (error) {
      // Check if this is an "Extension context invalidated" error
      if (error instanceof Error) {
        console.error('Extension communication error:', {
          message: error.message,
          stack: error.stack,
          error,
        });
      } else {
        console.error('Unknown extension error:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Sign in with Supabase auth
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (authError) {
        throw authError;
      }

      console.log('Auth data:', authData);

      if (!authData.user) {
        throw new Error('No user data returned from auth');
      }

      if (!authData.user.email) {
        throw new Error('No email found in user data');
      }

      // Check subscription status using Supabase client
      const { data: subscriptionData, error: subscriptionError } =
        await supabase
          .from('subscriptions')
          .select('plan_id')
          .eq('user_id', authData.user.id)
          .single();

      if (
        subscriptionError &&
        !subscriptionError.message.includes('No rows found')
      ) {
        console.error('Error fetching subscription:', subscriptionError);
      }

      const subscriptionStatus = subscriptionData?.plan_id || 'free';
      console.log('Subscription status:', subscriptionStatus);

      // Get the current session for access token
      const { data: sessionData } = await supabase.auth.getSession();
      const access_token = sessionData?.session?.access_token;

      if (!access_token) {
        throw new Error('No access token found in session');
      }

      // Notify extension with complete user data
      await notifyExtension({
        email: authData.user.email,
        id: authData.user.id,
        subscriptionStatus: subscriptionStatus,
      });

      // Store session data in Chrome storage
      if (window.chrome?.runtime?.sendMessage) {
        await window.chrome.runtime.sendMessage(EXTENSION_ID, {
          type: 'STORE_SESSION',
          session: {
            access_token: access_token,
            refresh_token: sessionData?.session?.refresh_token,
            user: {
              id: authData.user.id,
              email: authData.user.email,
              subscriptionStatus: subscriptionStatus,
            },
          },
        });
      }

      window.location.href = 'https://www.brainlyai.in/student';
    } catch (err) {
      console.error('Sign in error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[rgb(79,70,229)]/5 via-transparent to-transparent dark:from-[rgb(79,70,229)]/10" />
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-[rgb(79,70,229)]/10 to-transparent rounded-full blur-3xl dark:from-[rgb(79,70,229)]/20" />
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-tl from-[rgb(79,70,229)]/10 to-transparent rounded-full blur-3xl dark:from-[rgb(79,70,229)]/20" />

        {/* Additional decorative elements */}
        <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-[rgb(79,70,229)]/10 rounded-full blur-xl dark:bg-[rgb(79,70,229)]/20" />
        <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-[rgb(79,70,229)]/10 rounded-full blur-xl dark:bg-[rgb(79,70,229)]/20" />
      </div>

      <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-md w-full space-y-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl relative"
        >
          <motion.div variants={itemVariants}>
            <Link
              to="/"
              className="flex items-center justify-center gap-2 mb-8 group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-[rgb(79,70,229)]/20 rounded-xl blur-xl group-hover:bg-[rgb(79,70,229)]/30 transition-all duration-300" />
                <Brain className="w-10 h-10 text-[rgb(79,70,229)] relative" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[rgb(79,70,229)] to-purple-600 bg-clip-text text-transparent">
                BrainlyAi
              </span>
            </Link>
            <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-[rgb(79,70,229)] to-purple-600 bg-clip-text text-transparent">
              Welcome back
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400">
              Sign in to your account to continue
            </p>
          </motion.div>

          <motion.form
            variants={itemVariants}
            className="mt-8 space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email address
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full pl-10 pr-4 py-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-[rgb(79,70,229)] transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full pl-10 pr-4 py-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-[rgb(79,70,229)] transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 p-3 rounded-lg"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[rgb(79,70,229)] hover:bg-[rgb(79,70,229)]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(79,70,229)] disabled:opacity-50 transition-all duration-200 gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>

            <motion.div variants={itemVariants} className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="font-medium text-[rgb(79,70,229)] hover:text-[rgb(79,70,229)]/90 transition-colors duration-200"
                >
                  Sign up
                </Link>
              </p>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
};
