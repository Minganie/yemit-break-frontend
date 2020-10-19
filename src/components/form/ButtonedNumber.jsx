import React from "react";

function ButtonedNumber({ name, value, onChange, max, options }) {
  options = options || {};
  return (
    <div className="field">
      <label className="label" htmlFor={name}>
        {options.label || name[0].toUpperCase() + name.slice(1)}
      </label>
      <div className="field has-addons">
        <div className="control">
          <button
            type="button"
            name={name}
            className="button is-primary"
            disabled={value === 0}
            onClick={({ currentTarget: me }) => {
              onChange(me.name, value - 1);
            }}
          >
            -
          </button>
        </div>
        <div className="control">
          <input
            type="text"
            id={name}
            name={name}
            className="input"
            value={value}
            readOnly
          />
        </div>
        <div className="control">
          <button
            type="button"
            name={name}
            className="button is-primary"
            disabled={value === 4 || max === 6}
            onClick={({ currentTarget: me }) => {
              onChange(me.name, value + 1);
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default ButtonedNumber;
