import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from '../contexts/SubscriptionContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiresSubscription?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiresSubscription = false 
}) => {
  const { user, loading } = useAuth();
  const { isSubscribed, loadingSubscription } = useSubscription();

  if (loading || (requiresSubscription && loadingSubscription)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" />;
  }

  if (requiresSubscription && !isSubscribed) {
    return <Navigate to="/pricing" />;
  }

  return <>{children}</>;
};