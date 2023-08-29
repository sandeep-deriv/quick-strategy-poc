import classNames from "classnames";
import React from "react";

export default function CustomInput({
  type,
  name,
  label,
  value,
  error,
  options,
  handleInputChange,
}) {
  const handleChange = (e) => {
    handleInputChange(e);
  };

  const getInput = () => {
    switch (type) {
      case "text":
      case "number":
        return (
          <input
            key={type + name}
            name={name}
            type={type}
            value={value ?? ''}
            onChange={handleChange}
            placeholder={label}
            className="input__text"
          />
        );
      case "select":
        return (
          <select
            key={type + name}
            value={value ?? ''}
            onChange={handleChange}
            className="input__select"
            name={name}
          >
            {options.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              );
            })}
          </select>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className={classNames("input", { input__error: error })}>
        <span className="input__label">{label}</span>
        {getInput()}
        <span className="input__error__msg">{error}</span>
      </div>
    </>
  );
}
