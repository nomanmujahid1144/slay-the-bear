// src/app/components/skeletons/calculator/CalcResultSkeleton.tsx
// Matches CalcResult structure exactly: message → primary → grid → inputs

interface CalcResultSkeletonProps {
    gridCols?: 2 | 3 | 4;
    gridRows?: 1 | 2;
    inputCols?: number;
}

const colClass: Record<number, string> = {
    2: 'col-md-6',
    3: 'col-md-4',
    4: 'col-md-3',
};

export function CalcResultSkeleton({
    gridCols = 2,
    gridRows = 1,
    inputCols = 4,
}: CalcResultSkeletonProps) {
    const gridItems = gridCols * gridRows;

    return (
        <div className="contact-form mt-4">

            {/* Message line */}
            <SkeletonBar width="75%" height="14px" className="mb-4" />

            {/* Primary metric */}
            <div
                className="d-flex justify-content-between align-items-center p-3 mb-4"
                style={{
                    border: '1px solid var(--tg-border-color, #e0e0e0)',
                    borderRadius: '6px',
                }}
            >
                <SkeletonBar width="30%" height="14px" />
                <SkeletonBar width="20%" height="28px" />
            </div>

            {/* Breakdown grid */}
            <div className="row g-3 mb-3">
                {Array.from({ length: gridItems }).map((_, i) => (
                    <div key={i} className={colClass[gridCols]}>
                        <div className="contact-info-item flex-column gap-2 h-100">
                            <SkeletonBar width="60%" height="11px" />
                            <SkeletonBar width="45%" height="18px" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Inputs row */}
            <div className="row g-2 mt-2">
                {Array.from({ length: inputCols }).map((_, i) => (
                    <div key={i} className="col-6 col-md-3">
                        <div className="contact-info-item flex-column gap-2">
                            <SkeletonBar width="70%" height="10px" />
                            <SkeletonBar width="50%" height="13px" />
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

// ── Internal primitive ────────────────────────────────────────────────────────

interface SkeletonBarProps {
    width: string;
    height: string;
    className?: string;
}

function SkeletonBar({ width, height, className = '' }: SkeletonBarProps) {
    return (
        <div
            className={className}
            style={{
                width,
                height,
                borderRadius: '4px',
                background: 'var(--tg-border-color, #e8e8e8)',
                opacity: 0.5,
                animation: 'calcPulse 1.4s ease-in-out infinite',
            }}
        />
    );
}