// src/components/PremiumRoute.js - CREATE

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';

export function PremiumRoute({ children }) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    } else if (!isLoading && isAuthenticated && user?.plan !== 'premium') {
      router.push('/pricing');
    }
  }, [isAuthenticated, isLoading, user, router]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated || user?.plan !== 'premium') {
    return null;
  }

  return <>{children}</>;
}