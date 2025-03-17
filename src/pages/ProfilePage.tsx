import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from '../contexts/SubscriptionContext';
import { supabase } from '../lib/supabase';
import { User, Mail, Calendar, Crown, Loader2, Pencil } from 'lucide-react';
import toast from 'react-hot-toast';

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
      await fetchUserData();
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
        <p className="text-gray-600 dark:text-gray-400">Please sign in to view your profile.</p>
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
          color: 'text-primary-600 dark:text-primary-400',
          bgColor: 'bg-primary-100 dark:bg-primary-900',
          icon: <Crown className="w-5 h-5" />
        };
      case 'team':
        return {
          name: 'Team Plan',
          color: 'text-purple-600 dark:text-purple-400',
          bgColor: 'bg-purple-100 dark:bg-purple-900',
          icon: <Crown className="w-5 h-5" />
        };
      default:
        return {
          name: 'Free Plan',
          color: 'text-gray-600 dark:text-gray-400',
          bgColor: 'bg-gray-100 dark:bg-gray-900',
          icon: <User className="w-5 h-5" />
        };
    }
  };

  const planDetails = getPlanDetails(currentPlan);

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
              <span className="text-3xl font-semibold text-primary-600 dark:text-primary-400">
                {loading ? '...' : (userData?.first_name?.charAt(0)?.toUpperCase() || user.email?.charAt(0).toUpperCase())}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-2xl font-bold">
                  {loading ? (
                    <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  ) : (
                    userData && (userData.first_name || userData.last_name) ? 
                      `${userData.first_name || ''} ${userData.last_name || ''}`.trim() : 
                      'My Profile'
                  )}
                </h1>
                <button
                  onClick={() => setEditing(!editing)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                >
                  <Pencil className="w-4 h-4" />
                </button>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your account settings and preferences
              </p>
            </div>
          </div>

          {editing ? (
            <form onSubmit={handleSubmit} className="space-y-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name</label>
                  <input
                    type="text"
                    value={formData.first_name}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <input
                    type="text"
                    value={formData.last_name}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
            <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <Mail className="w-6 h-6 text-gray-400 mt-1" />
              <div>
                <h3 className="font-medium mb-1">Email Address</h3>
                <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <Calendar className="w-6 h-6 text-gray-400 mt-1" />
              <div>
                <h3 className="font-medium mb-1">Member Since</h3>
                <p className="text-gray-600 dark:text-gray-400">{createdAt}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className={`p-2 rounded-lg ${planDetails.bgColor}`}>
                {planDetails.icon}
              </div>
              <div>
                <h3 className="font-medium mb-1">Subscription Status</h3>
                {loadingSubscription ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-gray-600 dark:text-gray-400">Loading subscription...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className={planDetails.color}>{planDetails.name}</span>
                    {currentPlan !== 'premium' && currentPlan !== 'team' && (
                      <a 
                        href="/pricing" 
                        className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                      >
                        Upgrade
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};