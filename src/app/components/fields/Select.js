import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SelectionBox(props) {
  const {
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
  } = props;

  return (
    <>
      <label className="py-1 text-sm">{label}</label>
      <div className={`${extra} form-grp relative`}>
        <select
          id={id}
          name={id}
          required={required}
          value={value}
          onChange={onChange}
          style={style}
          disabled={disabled}
          className={`position-relative ${extraClasses}`}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {isFontAwsome && (
          <FontAwesomeIcon className="absolute right-3 top-4" icon={`fa-solid ${fontAwsomeIcon}`} />
        )}
      </div>
    </>
  );
}

export default SelectionBox;
