import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import type { ChangeEvent, KeyboardEvent, FormEvent, CSSProperties } from "react";

interface InputFieldProps {
    id?: string;
    label?: string;
    type?: string;
    placeholder?: string;
    value?: string | number;
    extra?: string;
    extraClasses?: string;
    style?: CSSProperties;
    disabled?: boolean;
    required?: boolean;
    isVisible?: boolean;
    isFontAwsome?: boolean;
    fontAwsomeIcon?: IconProp;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onInput?: (e: FormEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
    isPasswordVisible?: () => void;
    step?: string | number;
    name?: string;
    min?: string | number;
    max?: string | number;
}

function InputField({
    label,
    id,
    extra,
    extraClasses,
    style,
    type,
    placeholder,
    isVisible,
    disabled,
    required,
    value,
    onChange,
    onInput,
    onKeyDown,
    isPasswordVisible,
    isFontAwsome,
    fontAwsomeIcon,
    step,
    name,
    min,
    max,
}: InputFieldProps) {

    const handleVisible = () => {
        if (isPasswordVisible) isPasswordVisible();
    };

    return (
        <>
            {label && (
                <label className="py-1 text-sm" htmlFor={id}>
                    {label}
                </label>
            )}
            <div className={`${extra ?? ''} form-grp relative`}>
                <input
                    disabled={disabled}
                    type={type}
                    id={id}
                    name={name ?? id}
                    required={required}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    onInput={onInput}
                    style={style}
                    step={step}
                    min={min}
                    max={max}
                    className={`position-relative ${extraClasses ?? ''}`}
                />
                {isFontAwsome && fontAwsomeIcon && (
                    <FontAwesomeIcon className="absolute right-3 top-4" icon={fontAwsomeIcon} />
                )}
                {isVisible && (
                    <span className="visible-icon cursor-pointer" onClick={handleVisible}>
                        {type === 'password' ? (
                            <FontAwesomeIcon icon={['fas', 'eye-slash']} />
                        ) : (
                            <FontAwesomeIcon icon={['fas', 'eye']} />
                        )}
                    </span>
                )}
            </div>
        </>
    );
}

export default InputField;