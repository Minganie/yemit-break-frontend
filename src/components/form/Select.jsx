import React from "react";

function Select({
  id,
  label,
  value,
  options,
  onChange,
  disabled = false,
  constraint = (o) => {
    return true;
  },
  constraintMessage = (o) => {
    return null;
  },
}) {
  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <div className="control">
        <div className="select">
          <select
            value={value}
            id={id}
            name={id}
            onChange={({ currentTarget: me }) => {
              onChange(me.name, me.value);
            }}
            disabled={disabled}
          >
            <option value="" disabled={true}>
              Pick one...
            </option>
            {options.map((option) => {
              return (
                <option
                  key={option._id}
                  value={option._id}
                  disabled={!constraint(option)}
                  title={constraintMessage(option)}
                >
                  {option.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
}

export default Select;
