// src/app/components/calculator/result/CalcResultGrid.tsx

interface CalcResultGridProps {
    items: Array<{
        label: string;
        value: string;
        highlight?: boolean;
    }>;
    cols?: 2 | 3 | 4;
}

// Always 2 per row on mobile, respects cols prop on md+
const colClass: Record<number, string> = {
    2: 'col-6',
    3: 'col-6 col-md-4',
    4: 'col-6 col-md-3',
};

export function CalcResultGrid({ items, cols = 2 }: CalcResultGridProps) {
    return (
        <div className="row g-2 mb-3">
            {items.map((item) => (
                <div key={item.label} className={colClass[cols]}>
                    <div
                        className="contact-info-item flex-column gap-1 h-100"
                        style={{
                            padding: '12px 14px',
                            ...(item.highlight ? { borderColor: '#28a745' } : {}),
                        }}
                    >
                        <span style={{ fontSize: '0.78rem', opacity: 0.6, lineHeight: 1.3 }}>
                            {item.label}
                        </span>
                        <span
                            style={{
                                fontSize: '1rem',
                                fontWeight: 700,
                                color: item.highlight ? '#28a745' : 'var(--tg-primary-color)',
                                marginTop: '4px',
                            }}
                        >
                            {item.value}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}