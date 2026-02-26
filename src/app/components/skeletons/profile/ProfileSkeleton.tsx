// src/app/components/skeletons/profile/ProfileSkeleton.tsx

import { Skeleton } from '../base/Skeleton';

export function ProfileSkeleton() {
    return (
        <div className="space-y-6">
            {/* Avatar + name header */}
            <div className="flex items-center gap-4">
                <Skeleton className="w-20 h-20" rounded="full" />
                <div className="flex flex-col gap-2">
                    <Skeleton className="w-40 h-4" />
                    <Skeleton className="w-28 h-3" />
                    <Skeleton className="w-20 h-3" />
                </div>
            </div>
            {/* Form fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                        <Skeleton className="w-24 h-3" rounded="sm" />
                        <Skeleton className="w-full h-10" rounded="md" />
                    </div>
                ))}
            </div>
        </div>
    );
}