import React, { Component } from "react";

class Input extends Component {
  state = {
    caps: false,
  };

  checkChange = (e) => {
    if (this.props.type === "password")
      this.setState({ caps: e.getModifierState("CapsLock") });
  };

  render() {
    return (
      <div className="form-group my-2">
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <input
          type={this.props.type}
          className="form-control"
          id={this.props.name}
          name={this.props.name}
          label={this.props.label}
          value={this.props.value}
          onKeyPress={this.checkChange}
          onChange={this.props.onChange}
          placeholder={this.props.placeholder}
        />
        {this.state.caps && (
          <div className="alert alert-warning">"CAPS lock is on!"</div>
        )}
        {this.props.error && (
          <div className="alert alert-danger">{this.props.error}</div>
        )}
      </div>
    );
  }
}

export default Input;
