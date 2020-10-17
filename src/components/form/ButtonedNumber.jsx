import React from "react";

function ButtonedNumber({ id, label, value, onChange, max }) {
  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <div className="field has-addons">
        <div className="control">
          <button
            type="button"
            name={id}
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
            id={id}
            name={id}
            className="input"
            value={value}
            readOnly
          />
        </div>
        <div className="control">
          <button
            type="button"
            name={id}
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
