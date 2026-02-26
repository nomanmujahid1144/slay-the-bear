// src/app/components/skeletons/cards/CardSkeleton.tsx

import { Skeleton } from '../base/Skeleton';

interface CardSkeletonProps {
    lines?: number;
    showAvatar?: boolean;
    showImage?: boolean;
}

export function CardSkeleton({
    lines = 3,
    showAvatar = false,
    showImage = false,
}: CardSkeletonProps) {
    return (
        <div className="p-4 border border-gray-100 rounded-lg space-y-3">
            {showImage && (
                <Skeleton className="w-full h-40" rounded="md" />
            )}
            {showAvatar && (
                <div className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10" rounded="full" />
                    <div className="flex flex-col gap-1.5 flex-1">
                        <Skeleton className="w-1/2 h-3" />
                        <Skeleton className="w-1/3 h-2" />
                    </div>
                </div>
            )}
            <div className="space-y-2">
                {Array.from({ length: lines }).map((_, i) => (
                    <Skeleton
                        key={i}
                        className={`h-3 ${i === lines - 1 ? 'w-2/3' : 'w-full'}`}
                    />
                ))}
            </div>
        </div>
    );
}