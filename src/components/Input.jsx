import React from "react";

function Input({ type, name, label, placeholder, value, onChange, error }) {
  return (
    <div className="form-group my-2">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        type={type}
        className="form-control"
        id={name}
        name={name}
        placeholder={placeholder || ""}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default Input;
