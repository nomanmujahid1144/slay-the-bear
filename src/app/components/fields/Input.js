// Custom components
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
    defaultValue,
    required,
    value,
    onChange,
    onInput,
    onKeyDown,
    isPasswordVisible
  } = props;

  const handleVisible = () => {
    isPasswordVisible();
  }

  return (
    <div className={`${extra} form-grp`}>
      <input
        disabled={disabled}
        type={type}
        id={id}
        name={id}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
        onKeyDown={onKeyDown}
        onInput={onInput}
        style={style}
        className={`position-relative ${extraClasses}`}
      />
      {isVisible ? 
        <span className="visible-icon cursor-pointer" onClick={handleVisible}>
          {type === 'password' ?
            <FontAwesomeIcon icon="fa-solid fa-eye-slash" size="1.5em" />
            :
            <FontAwesomeIcon icon="fa-solid fa-eye" size="1.5em" />}
      </span>
      :null}
    </div>
  );
}

export default InputField;
