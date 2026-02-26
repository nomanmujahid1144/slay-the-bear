// src/app/(protected)/layout.tsx

'use client';

import { ProtectedRoute } from '@/app/components/guards/ProtectedRoute';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    return <ProtectedRoute>{children}</ProtectedRoute>;
}