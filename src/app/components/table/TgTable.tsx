// src/app/components/table/TgTable.tsx
// Reusable themed table — works anywhere, auto dark mode via CSS

export interface TgTableColumn<T> {
    key: keyof T | string;
    label: string;
    align?: 'left' | 'right' | 'center';
    className?: string;
    render?: (row: T, index: number) => React.ReactNode;
}

interface TgTableProps<T> {
    columns: TgTableColumn<T>[];
    rows: T[];
    keyExtractor: (row: T, index: number) => string | number;
    footer?: React.ReactNode;       // <tfoot> content
    emptyText?: string;
    className?: string;
}

export function TgTable<T>({
    columns,
    rows,
    keyExtractor,
    footer,
    emptyText = 'No data yet.',
    className = '',
}: TgTableProps<T>) {
    return (
        <div className={`tg-table-wrap ${className}`}>
            <div style={{ overflowX: 'auto', width: '100%' }}>
                <table className="tg-table">
                    <thead>
                        <tr>
                            {columns.map((col) => (
                                <th
                                    key={String(col.key)}
                                    style={{ textAlign: col.align ?? 'left' }}
                                >
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length}>
                                    <div className="tg-table-empty">{emptyText}</div>
                                </td>
                            </tr>
                        ) : (
                            rows.map((row, index) => (
                                <tr key={keyExtractor(row, index)}>
                                    {columns.map((col) => (
                                        <td
                                            key={String(col.key)}
                                            className={col.className}
                                            style={{ textAlign: col.align ?? 'left' }}
                                        >
                                            {col.render
                                                ? col.render(row, index)
                                                : String((row as Record<string, unknown>)[String(col.key)] ?? '')}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                    {footer && <tfoot>{footer}</tfoot>}
                </table>
            </div>
        </div>
    );
}