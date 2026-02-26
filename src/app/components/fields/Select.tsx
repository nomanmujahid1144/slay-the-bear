import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import type { ChangeEvent, CSSProperties } from "react";

interface SelectOption {
    value: string | number;
    label: string;
}

interface SelectionBoxProps {
    id?: string;
    label?: string;
    options: SelectOption[];
    value?: string | number;
    extra?: string;
    extraClasses?: string;
    style?: CSSProperties;
    disabled?: boolean;
    required?: boolean;
    isFontAwsome?: boolean;
    fontAwsomeIcon?: IconProp;
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

function SelectionBox({
    label,
    id,
    extra,
    extraClasses,
    style,
    options,
    value,
    onChange,
    required,
    isFontAwsome,
    fontAwsomeIcon,
    disabled,
}: SelectionBoxProps) {
    return (
        <>
            {label && (
                <label className="py-1 text-sm" htmlFor={id}>
                    {label}
                </label>
            )}
            <div className={`${extra ?? ''} form-grp relative`}>
                <select
                    id={id}
                    name={id}
                    required={required}
                    value={value}
                    onChange={onChange}
                    style={style}
                    disabled={disabled}
                    className={`position-relative ${extraClasses ?? ''}`}
                >
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {isFontAwsome && fontAwsomeIcon && (
                    <FontAwesomeIcon
                        className="absolute right-3 top-4"
                        icon={fontAwsomeIcon}
                    />
                )}
            </div>
        </>
    );
}

export default SelectionBox;