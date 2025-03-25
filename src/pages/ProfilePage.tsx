import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Calendar, Crown, User, Pencil, Loader2, Shield, ArrowRight, UserCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from '../contexts/SubscriptionContext';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

export const ProfilePage = () => {
  const { user } = useAuth();
  const { currentPlan, loadingSubscription } = useSubscription();
  const [userData, setUserData] = useState<{ first_name?: string; last_name?: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: ''
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        setLoading(true);
        try {
          const { data, error } = await supabase
            .from('users')
            .select('first_name, last_name')
            .eq('id', user.id)
            .single();

          if (error) {
            console.error('Error fetching user data:', error);
            toast.error('Failed to load profile data');
            return;
          }
          
          setUserData(data);
          setFormData({
            first_name: data?.first_name || '',
            last_name: data?.last_name || ''
          });
        } catch (error) {
          console.error('Error in fetchUserData:', error);
          toast.error('Failed to load profile data');
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase
        .from('users')
        .update(formData)
        .eq('id', user?.id);

      if (error) throw error;

      setUserData(formData);
      setEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <UserCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Please sign in to view your profile.</p>
        </motion.div>
      </div>
    );
  }

  const createdAt = new Date(user.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const getPlanDetails = (planId: string | null) => {
    switch (planId) {
      case 'premium':
        return {
          name: 'Premium Plan',
          color: 'text-[rgb(79,70,229)]',
          bgColor: 'bg-[rgb(79,70,229)]/10 dark:bg-[rgb(79,70,229)]/20',
          icon: <Crown className="w-5 h-5" />
        };
      case 'team':
        return {
          name: 'Team Plan',
          color: 'text-[rgb(79,70,229)]',
          bgColor: 'bg-[rgb(79,70,229)]/10 dark:bg-[rgb(79,70,229)]/20',
          icon: <Crown className="w-5 h-5" />
        };
      default:
        return {
          name: 'Free Plan',
          color: 'text-gray-600 dark:text-gray-400',
          bgColor: 'bg-gray-100 dark:bg-gray-800',
          icon: <User className="w-5 h-5" />
        };
    }
  };

  const planDetails = getPlanDetails(currentPlan);

  return (
    <div className="min-h-screen relative pt-16">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[rgb(79,70,229)]/5 via-transparent to-transparent dark:from-[rgb(79,70,229)]/10" />
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-[rgb(79,70,229)]/10 to-transparent rounded-full blur-3xl dark:from-[rgb(79,70,229)]/20" />
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-tl from-[rgb(79,70,229)]/10 to-transparent rounded-full blur-3xl dark:from-[rgb(79,70,229)]/20" />
        
        {/* Additional decorative elements */}
        <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-[rgb(79,70,229)]/10 rounded-full blur-xl dark:bg-[rgb(79,70,229)]/20" />
        <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-[rgb(79,70,229)]/10 rounded-full blur-xl dark:bg-[rgb(79,70,229)]/20" />
      </div>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="py-12 relative"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center bg-white/30 dark:bg-gray-800/30 rounded-full px-6 py-3 mb-8 backdrop-blur-sm"
            >
              <Shield className="w-5 h-5 text-[rgb(79,70,229)] mr-3" />
              <span className="text-sm font-medium">Account Settings</span>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 pb-20"
      >
        <div className="max-w-3xl mx-auto">
          <motion.div 
            variants={itemVariants}
            className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-8 backdrop-blur-sm relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[rgb(79,70,229)]/5 to-transparent dark:from-[rgb(79,70,229)]/10 rounded-2xl" />
            
            <div className="relative">
              <div className="flex items-center gap-6 mb-8">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="w-20 h-20 bg-[rgb(79,70,229)]/10 dark:bg-[rgb(79,70,229)]/20 rounded-full flex items-center justify-center relative group"
                >
                  <div className="absolute inset-0 bg-[rgb(79,70,229)]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-3xl font-semibold text-[rgb(79,70,229)] relative">
                    {loading ? '...' : (userData?.first_name?.charAt(0)?.toUpperCase() || user.email?.charAt(0).toUpperCase())}
                  </span>
                </motion.div>
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-[rgb(79,70,229)] to-purple-600 bg-clip-text text-transparent">
                      {loading ? (
                        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                      ) : (
                        userData && (userData.first_name || userData.last_name) ? 
                          `${userData.first_name || ''} ${userData.last_name || ''}`.trim() : 
                          'My Profile'
                      )}
                    </h1>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setEditing(!editing)}
                      className="p-2 hover:bg-[rgb(79,70,229)]/10 dark:hover:bg-[rgb(79,70,229)]/20 rounded-full transition-colors"
                    >
                      <Pencil className="w-4 h-4 text-[rgb(79,70,229)]" />
                    </motion.button>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Manage your account settings and preferences
                  </p>
                </div>
              </div>

              {editing ? (
                <motion.form 
                  variants={itemVariants}
                  onSubmit={handleSubmit} 
                  className="space-y-6 mb-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name</label>
                      <input
                        type="text"
                        value={formData.first_name}
                        onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-[rgb(79,70,229)] transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name</label>
                      <input
                        type="text"
                        value={formData.last_name}
                        onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-[rgb(79,70,229)] transition-all duration-200"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="px-6 py-3 bg-[rgb(79,70,229)] hover:bg-[rgb(79,70,229)]/90 text-white rounded-lg font-medium flex items-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        'Save Changes'
                      )}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setEditing(false)}
                      className="px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg font-medium"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </motion.form>
              ) : (
                <motion.div variants={containerVariants} className="space-y-6">
                  <motion.div 
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start gap-4 p-6 bg-white/50 dark:bg-gray-900/50 rounded-xl backdrop-blur-sm relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[rgb(79,70,229)]/5 to-transparent dark:from-[rgb(79,70,229)]/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="p-3 bg-[rgb(79,70,229)]/10 dark:bg-[rgb(79,70,229)]/20 rounded-lg">
                      <Mail className="w-6 h-6 text-[rgb(79,70,229)]" />
                    </div>
                    <div className="relative">
                      <h3 className="font-medium mb-1">Email Address</h3>
                      <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start gap-4 p-6 bg-white/50 dark:bg-gray-900/50 rounded-xl backdrop-blur-sm relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[rgb(79,70,229)]/5 to-transparent dark:from-[rgb(79,70,229)]/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="p-3 bg-[rgb(79,70,229)]/10 dark:bg-[rgb(79,70,229)]/20 rounded-lg">
                      <Calendar className="w-6 h-6 text-[rgb(79,70,229)]" />
                    </div>
                    <div className="relative">
                      <h3 className="font-medium mb-1">Member Since</h3>
                      <p className="text-gray-600 dark:text-gray-400">{createdAt}</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start gap-4 p-6 bg-white/50 dark:bg-gray-900/50 rounded-xl backdrop-blur-sm relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[rgb(79,70,229)]/5 to-transparent dark:from-[rgb(79,70,229)]/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className={`p-3 rounded-lg ${planDetails.bgColor}`}>
                      {planDetails.icon}
                    </div>
                    <div className="relative flex-grow">
                      <h3 className="font-medium mb-1">Subscription Status</h3>
                      {loadingSubscription ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span className="text-gray-600 dark:text-gray-400">Loading subscription...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <span className={planDetails.color}>{planDetails.name}</span>
                          {currentPlan !== 'premium' && currentPlan !== 'team' && (
                            <motion.a 
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              href="/pricing" 
                              className="inline-flex items-center px-4 py-2 bg-[rgb(79,70,229)]/10 hover:bg-[rgb(79,70,229)]/20 text-[rgb(79,70,229)] rounded-lg font-medium gap-2 transition-colors"
                            >
                              Upgrade Plan
                              <ArrowRight className="w-4 h-4" />
                            </motion.a>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};