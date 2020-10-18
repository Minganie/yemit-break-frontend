import React from "react";

function MultiSelect({ id, label, value, options, onChange }) {
  const handleChange = ({ currentTarget: sel }) => {
    const array = Array.prototype.slice
      .call(sel.selectedOptions)
      .map((o) => o.value);
    onChange(id, array);
  };
  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <div className="control">
        <div className="select">
          <select multiple={true} value={value} onChange={handleChange}>
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

export default MultiSelect;
