import React from "react";

function MultiSelect({ name, value, list, options, onChange }) {
  options = options || {};

  const handleChange = ({ currentTarget: sel }) => {
    const array = Array.prototype.slice
      .call(sel.selectedOptions)
      .map((o) => o.value);
    onChange(name, array);
  };

  return (
    <div className="field">
      <label className="label" htmlFor={name}>
        {(options && options.label) || name[0].toUpperCase() + name.slice(1)}
      </label>
      <div className="control">
        <div className="select is-multiple">
          <select
            id={name}
            name={name}
            multiple={true}
            value={value}
            onChange={handleChange}
          >
            {list.map((option) => {
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
