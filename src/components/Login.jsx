import React, { Component } from "react";
import * as yup from "yup";
import auth from "../services/authService";
import Input from "./Input";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: { email: "", password: "" },
  };

  schema = yup.object().shape({
    email: yup.string().email().required().label("Email"),
    password: yup.string().required().min(5).max(25).label("Password"),
  });

  validate = () => {
    return this.schema
      .validate(this.state, { abortEarly: false })
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
    if (Object.keys(errors).length === 0) {
      const serverSaid = await auth.login(
        this.state.email,
        this.state.password
      );
      window.location = "/";
    }
  };
  handleChange = async ({ currentTarget: input }) => {
    const state = { ...this.state };
    state[input.name] = input.value;
    const errorMessage = await this.validateProperty(input.name, input.value);
    if (errorMessage) state.errors[input.name] = errorMessage;
    else delete state.errors[input.name];
    this.setState(state);
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Login</h1>
        <Input
          type="text"
          name="email"
          label="Email"
          placeholder="your.email@gmail.com"
          value={this.state.email}
          onChange={this.handleChange}
          error={this.state.errors && this.state.errors.email}
        />
        <Input
          type="password"
          name="password"
          label="Password"
          placeholder="*****"
          value={this.state.password}
          onChange={this.handleChange}
          error={this.state.errors && this.state.errors.password}
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={Object.keys(this.state.errors).length > 0}
        >
          Save
        </button>
      </form>
    );
  }
}

export default Login;
