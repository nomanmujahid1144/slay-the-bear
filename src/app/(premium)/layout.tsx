// src/app/(premium)/layout.tsx

'use client';

import { PremiumRoute } from '@/app/components/guards/PremiumRoute';

export default function PremiumLayout({ children }: { children: React.ReactNode }) {
    return <PremiumRoute>{children}</PremiumRoute>;
}