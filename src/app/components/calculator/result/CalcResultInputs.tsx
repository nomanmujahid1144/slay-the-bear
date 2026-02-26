// src/app/components/calculator/result/CalcResultInputs.tsx
// Collapsible "View inputs used" summary section

interface CalcResultInputsProps {
    items: Array<{
        label: string;
        value: string;
    }>;
}

export function CalcResultInputs({ items }: CalcResultInputsProps) {
    return (
        <details className="mt-2">
            <summary
                style={{
                    fontSize: '0.8rem',
                    opacity: 0.6,
                    cursor: 'pointer',
                    userSelect: 'none',
                }}
            >
                View inputs used
            </summary>
            <div className="row g-2 mt-2">
                {items.map((item) => (
                    <div key={item.label} className="col-6 col-md-3">
                        <div className="contact-info-item flex-column gap-1">
                            <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>
                                {item.label}
                            </span>
                            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                                {item.value}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </details>
    );
}