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
    return null;
  }

  checkChange = (e) => {
    if (this.props.type === "password")
      this.setState({ caps: e.getModifierState("CapsLock") });
  };

  render() {
    return (
      <div className="field">
        <label className="label" htmlFor={this.props.name}>
          {this.props.label}
        </label>
        <div className="control has-icons-left">
          <input
            type={this.props.type}
            className="input"
            id={this.props.name}
            name={this.props.name}
            value={this.props.value}
            onKeyPress={this.checkChange}
            onChange={({ currentTarget: me }) => {
              this.props.onChange(me.name, me.value);
            }}
            placeholder={this.props.placeholder}
          />
          {this.renderIcons()}
        </div>
        {this.state.caps && (
          <p className="help has-text-warning-dark has-background-warning">
            "CAPS lock is on!"
          </p>
        )}
        {this.props.error && (
          <p className="help is-danger">{this.props.error}</p>
        )}
      </div>
    );
  }
}

export default Input;
