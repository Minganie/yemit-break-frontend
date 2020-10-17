import React from "react";

function Select({ id, label, value, options, onChange }) {
  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <div className="control">
        <div className="select">
          <select value={value} id={id} name={id} onChange={onChange}>
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
      </div>
    </div>
  );
}

export default Select;
