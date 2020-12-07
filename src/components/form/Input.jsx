import React, { Component } from "react";

class Input extends Component {
  state = {
    caps: false,
  };

  renderIcons() {
    if (this.props.type === "password")
      return (
        <span className="icon is-small is-left">
          <i className="fas fa-lock" />
        </span>
      );
    if (this.props.name === "email")
      return (
        <span className="icon is-small is-left">
          <i className="fas fa-envelope" />
        </span>
      );
    if (this.props.name === "name")
      return (
        <span className="icon is-small is-left">
          <i className="fas fa-id-card" />
        </span>
      );
    if (this.props.name === "roll")
      return (
        <span className="icon is-small is-left">
          <i className="fas fa-dice-two" />
        </span>
      );
    if (this.props.name === "buster")
      return (
        <span className="icon is-small is-left">
          <i className="fas fa-hammer" />
        </span>
      );
    return null;
  }

  checkChange = (e) => {
    if (this.props.type === "password")
      this.setState({ caps: e.getModifierState("CapsLock") });
  };

  render() {
    let { type, name, value, onChange, options, error } = this.props;
    options = options || {};
    return (
      <div className="field">
        <label className="label" htmlFor={name}>
          {options.label || name[0].toUpperCase() + name.slice(1)}
        </label>
        <div className="control has-icons-left">
          <input
            type={type}
            className="input"
            id={name}
            name={name}
            value={value}
            onKeyPress={this.checkChange}
            onChange={({ currentTarget: me }) => {
              onChange(me.name, me.value);
            }}
            placeholder={options.placeholder || ""}
          />
          {this.renderIcons()}
        </div>
        {this.state.caps && (
          <p className="help has-text-warning-dark has-background-warning">
            "CAPS lock is on!"
          </p>
        )}
        {error && <p className="help is-danger">{error}</p>}
      </div>
    );
  }
}

export default Input;
