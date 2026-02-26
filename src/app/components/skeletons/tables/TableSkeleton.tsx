// src/app/components/skeletons/tables/TgTableSkeleton.tsx
// Matches TgTable structure — thead + n body rows + optional tfoot

interface TgTableSkeletonProps {
    rows?: number;
    cols?: number;
    showFooter?: boolean;
}

export function TgTableSkeleton({
    rows = 3,
    cols = 3,
    showFooter = false,
}: TgTableSkeletonProps) {
    return (
        <div className="tg-table-wrap">
            <table className="tg-table">
                <thead>
                    <tr>
                        {Array.from({ length: cols }).map((_, i) => (
                            <th key={i} style={{ textAlign: i === cols - 1 ? 'right' : 'left' }}>
                                <SkeletonBar width={i === 0 ? '60%' : '40%'} height="10px" />
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: rows }).map((_, rowIdx) => (
                        <tr key={rowIdx}>
                            {Array.from({ length: cols }).map((_, colIdx) => (
                                <td
                                    key={colIdx}
                                    style={{ textAlign: colIdx === cols - 1 ? 'right' : 'left' }}
                                >
                                    <SkeletonBar
                                        width={colIdx === 0 ? '55%' : colIdx === cols - 1 ? '30%' : '45%'}
                                        height="13px"
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
                {showFooter && (
                    <tfoot>
                        <tr>
                            {Array.from({ length: cols }).map((_, i) => (
                                <td key={i} style={{ textAlign: i === cols - 1 ? 'right' : 'left' }}>
                                    <SkeletonBar width={i === 0 ? '35%' : '30%'} height="13px" />
                                </td>
                            ))}
                        </tr>
                    </tfoot>
                )}
            </table>
        </div>
    );
}

interface SkeletonBarProps {
    width: string;
    height: string;
}

function SkeletonBar({ width, height }: SkeletonBarProps) {
    return (
        <div
            style={{
                width,
                height,
                borderRadius: '4px',
                background: 'var(--tg-border-color, #e8e8e8)',
                opacity: 0.5,
                animation: 'calcPulse 1.4s ease-in-out infinite',
                display: 'inline-block',
            }}
        />
    );
}