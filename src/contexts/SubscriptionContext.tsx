import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface SubscriptionContextType {
  isSubscribed: boolean;
  currentPlan: string | null;
  loadingSubscription: boolean;
  processingPayment: boolean;
  handleSubscription: (planId: string, amount: number) => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<string | null>(null);
  const [loadingSubscription, setLoadingSubscription] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      checkSubscription();
    } else {
      setIsSubscribed(false);
      setCurrentPlan(null);
      setLoadingSubscription(false);
    }
  }, [user]);

  const checkSubscription = async () => {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user?.id);

      if (error) throw error;

      // Get the latest active subscription if any exists
      const activeSubscription = data?.find(sub => sub.status === 'active');
      setIsSubscribed(!!activeSubscription);
      setCurrentPlan(activeSubscription?.plan_id || null);
    } catch (error) {
      console.error('Error checking subscription:', error);
      setIsSubscribed(false);
      setCurrentPlan(null);
    } finally {
      setLoadingSubscription(false);
    }
  };

  const handleSubscription = async (planId: string, amount: number) => {
    if (!user) {
      navigate('/signin');
      return;
    }

    try {
      setProcessingPayment(true);
      // Validate inputs
      if (!planId || !amount || amount <= 0) {
        throw new Error('Invalid subscription parameters');
      }
      
      // Get the current session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        throw new Error('No active session');
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          amount,
          planId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create order');
      }

      const data = await response.json();
      if (!data?.id) {
        throw new Error('Invalid order response');
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        name: "SolveAI Premium",
        description: `Subscribe to ${planId} plan`,
        order_id: data.id,
        notes: {
          planId,
          userId: user.id
        },
        handler: async (response: any) => {
          try {
            // Get fresh session token
            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.access_token) {
              throw new Error('No active session');
            }

            const verifyResponse = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-payment`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.access_token}`
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                planId: planId,
                userId: user.id
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              toast.success('Payment successful! Your subscription is now active.');
              await checkSubscription();
            } else {
              toast.error(verifyData.error || 'Payment verification failed');
              throw new Error(verifyData.error || 'Payment verification failed');
            }
          }
          finally {
            setProcessingPayment(false);
          }
        },
        prefill: {
          email: user.email,
        },
        theme: {
          color: "#4F46E5",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        console.error('Payment failed:', response.error);
        setProcessingPayment(false);
      });
      rzp.open();
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Failed to create order. Please try again.');
      setProcessingPayment(false);
    }
  };

  return (
    <SubscriptionContext.Provider 
      value={{ 
        isSubscribed, 
        currentPlan, 
        loadingSubscription, 
        processingPayment,
        handleSubscription 
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};