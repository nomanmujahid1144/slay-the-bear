// src/app/components/skeletons/base/Skeleton.tsx

interface SkeletonProps {
    className?: string;
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
    animate?: boolean;
}

const roundedMap = {
    none: '',
    sm:   'rounded-sm',
    md:   'rounded-md',
    lg:   'rounded-lg',
    full: 'rounded-full',
};

export function Skeleton({
    className = '',
    rounded = 'md',
    animate = true,
}: SkeletonProps) {
    return (
        <div
            className={`
                bg-gray-200 dark:bg-gray-700
                ${animate ? 'animate-pulse' : ''}
                ${roundedMap[rounded]}
                ${className}
            `}
        />
    );
}