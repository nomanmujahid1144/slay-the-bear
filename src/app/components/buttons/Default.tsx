import type { MouseEvent, FormEvent } from "react";

interface DefaultButtonProps {
    type?: 'button' | 'submit' | 'reset';
    text: string;
    loadingText?: string;
    extras?: string;
    disabled?: boolean;
    loading?: boolean;
    onClick?: (e: MouseEvent<HTMLButtonElement> | FormEvent<HTMLButtonElement>) => void | Promise<void>;
}

export const DefaultButton = ({ type = 'button', text, extras, disabled, loading, loadingText, onClick }: DefaultButtonProps) => {
    return (
        <button
            type={type}
            disabled={disabled || loading}
            onClick={onClick}
            className={`btn btn-two ${extras ?? ''} w-100 justify-content-center ${disabled || loading ? 'disabled cursor-not-allowed' : ''}`}
        >
            {loading ? loadingText : text}
        </button>
    );
};