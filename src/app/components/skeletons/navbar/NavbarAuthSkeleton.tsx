// src/app/components/skeletons/navbar/NavbarAuthSkeleton.tsx

import { Skeleton } from '../base/Skeleton';

export function NavbarAuthSkeleton() {
    return (
        <div className="flex items-center gap-2">
            {/* Avatar */}
            <Skeleton className="w-11 h-11" rounded="full" />
            {/* Name lines */}
            <div className="flex flex-col gap-1.5">
                <Skeleton className="w-24 h-3" />
                <Skeleton className="w-16 h-2" />
            </div>
        </div>
    );
}