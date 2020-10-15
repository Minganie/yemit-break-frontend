import React from "react";
import Form from "./Form";
import * as yup from "yup";
import common from "../yemit-break-common/common.json";
import auth from "../services/authService";

class Register extends Form {
  state = {
    data: {
      email: "",
      password: "",
      password_confirmation: "",
    },
    errors: { email: "", password: "", password_confirmation: "" },
  };

  schema = yup.object({
    email: yup.string().email().required().label("Email"),
    password: yup
      .string()
      .matches(
        new RegExp(common.regexes.password),
        "Password must be between 5 and 25 characters"
      )
      .label("Password"),
    password_confirmation: yup
      .string()
      .required()
      .label("Password Confirmation"),
  });

  validateProperty = (name, value) => {
    if (name === "password_confirmation") {
      return Promise.resolve(
        value === this.state.data.password ? null : "Passwords must match"
      );
    } else {
      return yup
        .reach(this.schema, name)
        .validate(value)
        .then((valid) => {
          return null;
        })
        .catch((e) => {
          return e.message;
        });
    }
  };

  async doSubmit() {
    if (Object.keys(this.state.errors).length === 0) {
      const logged = await auth.register(this.state.data);
      if (logged) window.location = "/";
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Register</h1>
        {this.renderInput("text", "email", {
          placeholder: "your.email@gmail.com",
        })}
        {this.renderInput("password", "password", { placeholder: "*****" })}
        {this.renderInput("password", "password_confirmation", {
          label: "Confirm Password",
          placeholder: "*****",
        })}
        {this.renderButton("Register")}
      </form>
    );
  }
}

export default Register;
