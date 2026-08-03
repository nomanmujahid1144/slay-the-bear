// src/components/PremiumRoute.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';
import { Plan } from '@/constants/enums';

export function PremiumRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { user, isAuthenticated, isLoading, refreshUser } = useAuthStore();
    const [checking, setChecking] = useState(true);

    // Refetch profile on mount — plan may have changed since login (e.g. new subscription)
    useEffect(() => {
        refreshUser().finally(() => setChecking(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (checking || isLoading) return;
        if (!isAuthenticated) {
            router.push('/login');
        } else if (user?.plan !== Plan.PREMIUM) {
            router.push('/pricing');
        }
    }, [isAuthenticated, isLoading, checking, user, router]);

    if (isLoading || checking) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    if (!isAuthenticated || user?.plan !== Plan.PREMIUM) {
        return null;
    }

    return <>{children}</>;
}