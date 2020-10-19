import React from "react";

function Select({
  name,
  value,
  list,
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
  options = options || {};

  return (
    <div className="field">
      <label className="label" htmlFor={name}>
        {options.label || name[0].toUpperCase() + name.slice(1)}
      </label>
      <div className="control">
        <div className="select">
          <select
            value={value}
            id={name}
            name={name}
            onChange={({ currentTarget: me }) => {
              onChange(me.name, me.value);
            }}
            disabled={disabled}
          >
            <option value="" disabled={true}>
              Pick one...
            </option>
            {list.map((option) => {
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
