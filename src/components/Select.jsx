import React from "react";

function Select({ id, label, value, options, onChange }) {
  return (
    <div className="form-group my-2">
      <label htmlFor={id}>{label}</label>
      <select
        className="form-control"
        value={value}
        id={id}
        name={id}
        onChange={onChange}
      >
        <option value="" disabled={true}>
          Pick one...
        </option>
        {options.map((option) => {
          return (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Select;
