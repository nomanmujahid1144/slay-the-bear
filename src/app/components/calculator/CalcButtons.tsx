// src/app/components/calculator/CalcButtons.tsx
// Reusable submit + reset button pair for all calculators

interface CalcButtonsProps {
    submitText: string;
    loadingText?: string;
    loading?: boolean;
    disabled?: boolean;
    onReset: () => void;
}

export function CalcButtons({
    submitText,
    loadingText = 'Calculating...',
    loading = false,
    disabled = false,
    onReset,
}: CalcButtonsProps) {
    return (
        <div className="flex flex-col md:flex-row-reverse justify-center items-center gap-2 pt-2">
            <button
                type="submit"
                disabled={disabled || loading}
                className="btn btn-two w-full md:w-auto justify-center"
            >
                {loading ? loadingText : submitText}
            </button>
            <button
                type="button"
                onClick={onReset}
                disabled={loading}
                className="btn btn-two w-full md:w-auto justify-center"
            >
                Reset
            </button>
        </div>
    );
}