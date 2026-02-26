// src/components/PremiumRoute.tsx

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';
import { Plan } from '@/constants/enums';

export function PremiumRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { user, isAuthenticated, isLoading } = useAuthStore();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login');
        } else if (!isLoading && isAuthenticated && user?.plan !== Plan.PREMIUM) {
            router.push('/pricing');
        }
    }, [isAuthenticated, isLoading, user, router]);

    if (isLoading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    if (!isAuthenticated || user?.plan !== Plan.PREMIUM) {
        return null;
    }

    return <>{children}</>;
}