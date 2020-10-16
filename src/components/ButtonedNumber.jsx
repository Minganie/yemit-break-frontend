import React from "react";

function ButtonedNumber({ id, label, value, onDecrement, onIncrement, max }) {
  return (
    <div className="form-row my-2">
      <div className="col-3">
        <label htmlFor={id}>{label}</label>
      </div>
      <div className="col-3 btn-group">
        <button
          type="button"
          name={id}
          className="btn btn-primary float-right"
          disabled={value === 0}
          onClick={onDecrement}
        >
          -
        </button>
        <input
          type="text"
          id={id}
          name={id}
          className="form-control text-center"
          value={value}
          readOnly
        />
        <button
          type="button"
          name={id}
          className="btn btn-primary float-left"
          disabled={value === 4 || max === 6}
          onClick={onIncrement}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default ButtonedNumber;
