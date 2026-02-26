// src/app/components/calculator/result/CalcResultPrimary.tsx
// The big highlighted primary metric — e.g. "Bond Price: $1,081.11"

interface CalcResultPrimaryProps {
    label: string;
    value: string;
}

export function CalcResultPrimary({ label, value }: CalcResultPrimaryProps) {
    return (
        <div
            className="d-flex justify-content-between align-items-center p-3 mb-4"
            style={{
                border: '1px solid var(--tg-primary-color)',
                borderRadius: '6px',
                background: 'rgba(41, 191, 240, 0.06)',
            }}
        >
            <span style={{ fontWeight: 600 }}>{label}</span>
            <span
                style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: 'var(--tg-primary-color)',
                }}
            >
                {value}
            </span>
        </div>
    );
}