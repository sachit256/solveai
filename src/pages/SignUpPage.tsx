import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName.trim(),
            last_name: lastName.trim()
          }
        }
      });
      
      if (signUpError) throw signUpError;
      
      if (authData?.user) {
        const { error: profileError } = await supabase
          .from('users')
          .insert([{
            id: authData.user.id,
            first_name: firstName.trim(),
            last_name: lastName.trim()
          }]);
      }
      
      navigate('/');
    } catch (err) {
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
            <Link to="/" className="flex items-center justify-center gap-2 mb-8 group">
              <div className="relative">
                <div className="absolute inset-0 bg-[rgb(79,70,229)]/20 rounded-xl blur-xl group-hover:bg-[rgb(79,70,229)]/30 transition-all duration-300" />
                <Brain className="w-10 h-10 text-[rgb(79,70,229)] relative" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[rgb(79,70,229)] to-purple-600 bg-clip-text text-transparent">
                BrainlyAi
              </span>
            </Link>
            <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-[rgb(79,70,229)] to-purple-600 bg-clip-text text-transparent">
              Create your account
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400">
              Join thousands of students using BrainlyAi
            </p>
          </motion.div>

          <motion.form 
            variants={itemVariants}
            className="mt-8 space-y-6" 
            onSubmit={handleSubmit}
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium">
                    First Name
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="block w-full pl-10 pr-4 py-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-[rgb(79,70,229)] transition-all duration-200"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium">
                    Last Name
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="block w-full pl-10 pr-4 py-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-[rgb(79,70,229)] transition-all duration-200"
                    />
                  </div>
                </div>
              </div>
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
                  Creating account...
                </>
              ) : (
                <>
                  Create account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>

            <motion.div 
              variants={itemVariants}
              className="text-center"
            >
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link
                  to="/signin"
                  className="font-medium text-[rgb(79,70,229)] hover:text-[rgb(79,70,229)]/90 transition-colors duration-200"
                >
                  Sign in
                </Link>
              </p>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
};