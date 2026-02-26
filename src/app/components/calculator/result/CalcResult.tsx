// src/app/components/calculator/result/CalcResult.tsx
// Generic result wrapper — uses contact-form class for automatic dark mode

interface CalcResultProps {
    message: string;
    children: React.ReactNode;
}

export function CalcResult({ message, children }: CalcResultProps) {
    return (
        <div className="contact-form mt-4 p-0 md:p-5">
            {/* Summary message */}
            <p className="mb-4">{message}</p>
            {children}
        </div>
    );
}