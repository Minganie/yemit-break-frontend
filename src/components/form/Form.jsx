import React, { Component } from "react";
import * as yup from "yup";
import Input from "./Input";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    return this.schema
      .validate(this.state.data, { abortEarly: false })
      .then((valid) => {
        return {};
      })
      .catch((e) => {
        const errors = {};
        for (const error of e.inner) {
          errors[error.path] = error.message;
        }
        return errors;
      });
  };

  validateProperty = (name, value) => {
    return yup
      .reach(this.schema, name)
      .validate(value)
      .then((valid) => {
        return null;
      })
      .catch((e) => {
        return e.message;
      });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const errors = await this.validate();
    this.setState({ errors });
    await this.doSubmit();
  };

  handleChange = async ({ currentTarget: input }) => {
    const state = { ...this.state };
    state.data[input.name] = input.value;
    const errorMessage = await this.validateProperty(input.name, input.value);
    if (errorMessage) state.errors[input.name] = errorMessage;
    else delete state.errors[input.name];
    this.setState(state);
  };

  renderButton(label) {
    return (
      <button
        type="submit"
        className="button is-primary"
        disabled={Object.keys(this.state.errors).length > 0}
      >
        {label}
      </button>
    );
  }

  renderInput(type, name, options) {
    return (
      <Input
        type={type}
        name={name}
        label={options.label || name.charAt(0).toUpperCase() + name.slice(1)}
        placeholder={options.placeholder || ""}
        value={this.state.data[name]}
        onChange={this.handleChange}
        error={this.state.errors && this.state.errors[name]}
      />
    );
  }
}

export default Form;
