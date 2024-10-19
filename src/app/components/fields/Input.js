import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function InputField(props) {
  const {
    label,
    id,
    extra,
    extraClasses,
    style,
    type,
    placeholder,
    variant,
    isVisible,
    state,
    disabled,
    required,
    value,
    onChange,
    onInput,
    onKeyDown,
    isPasswordVisible,
    isFontAwsome,
    fontAwsomeIcon,
  } = props;

  const handleVisible = () => {
    if (isPasswordVisible) {
      isPasswordVisible(); // Ensure this prop is passed and properly managed in the parent component
    }
  };

  return (
    <>
      {label && <label className="py-1 text-sm" htmlFor={id}>{label}</label>}
      <div className={`${extra} form-grp relative`}>
        <input
          disabled={disabled}
          type={type}
          id={id}
          name={id}
          required={required}
          placeholder={placeholder}
          value={value} // Controlled input should use `value`
          onChange={onChange} // Ensure this prop is passed correctly from parent
          onKeyDown={onKeyDown}
          onInput={onInput}
          style={style}
          className={`position-relative ${extraClasses}`}
        />
        {isFontAwsome && (
          <FontAwesomeIcon className="absolute right-3 top-4" icon={fontAwsomeIcon} />
        )}
        {isVisible && (
          <span className="visible-icon cursor-pointer" onClick={handleVisible}>
            {type === 'password' ? (
              <FontAwesomeIcon icon="fa-solid fa-eye-slash" size="1.5em" />
            ) : (
              <FontAwesomeIcon icon="fa-solid fa-eye" size="1.5em" />
            )}
          </span>
        )}
      </div>
    </>
  );
}

export default InputField;
