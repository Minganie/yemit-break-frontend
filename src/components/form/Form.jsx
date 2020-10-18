import React, { Component } from "react";
import * as yup from "yup";

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
        const regex = /\[\d+\]/;
        let msg = e.message;
        if (e.path && e.path.match(regex) && !e.message.match(regex)) {
          msg = e.path + " " + e.message;
        }
        return msg;
      });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const errors = await this.validate();
    this.setState({ errors });
    if (Object.keys(this.state.errors).length === 0) {
      await this.doSubmit();
    }
  };

  handleChange = async (key, value) => {
    const state = { ...this.state };
    state.data[key] = value;
    const errorMessage = await this.validateProperty(key, value);
    if (errorMessage) {
      state.errors[key] = errorMessage;
    } else delete state.errors[key];
    this.setState(state);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1 className="title is-1">{this.state.title}</h1>
        {this.renderBody()}
        <button
          type="submit"
          className="button is-primary"
          disabled={Object.keys(this.state.errors).length > 0}
        >
          {this.state.buttonLabel}
        </button>
      </form>
    );
  }
}

export default Form;
