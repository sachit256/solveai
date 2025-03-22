import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Brain } from 'lucide-react';
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
  console.log('Chrome runtime available:', typeof window.chrome?.runtime !== 'undefined');
  console.log('Chrome sendMessage available:', typeof window.chrome?.runtime?.sendMessage !== 'undefined');
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

  const notifyExtension = async (userData: UserData) => {
    try {
      console.log('=== Extension Communication Debug ===');
      debugChromeRuntime();
      console.log('Attempting to notify extension with data:', userData);
      
      // Check if Chrome runtime is available
      if (typeof window.chrome === 'undefined' || !window.chrome?.runtime?.sendMessage) {
        console.error('Chrome runtime not available - are you running this in Chrome with the extension installed?');
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
          access_token: access_token
        }
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
          error
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
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
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
      const { data: subscriptionData, error: subscriptionError } = await supabase
        .from('subscriptions')
        .select('plan_id')
        .eq('user_id', authData.user.id)
        .single();

      if (subscriptionError && !subscriptionError.message.includes('No rows found')) {
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
        subscriptionStatus: subscriptionStatus
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
              subscriptionStatus: subscriptionStatus
            }
          }
        });
      }

      window.location.href = 'http://localhost:5173/student';
    } catch (err) {
      console.error('Sign in error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-50 to-white dark:from-gray-900 dark:to-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
        <div>
          <Link to="/" className="flex items-center justify-center gap-2 mb-8">
            <Brain className="w-10 h-10 text-primary-600" />
            <span className="text-2xl font-bold">SolveAI</span>
          </Link>
          <h2 className="text-3xl font-bold text-center">Welcome back</h2>
          <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
            Sign in to your account to continue
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};