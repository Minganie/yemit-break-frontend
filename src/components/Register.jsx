import React from "react";
import Form from "./form/Form";
import * as yup from "yup";
import common from "../yemit-break-common/common.json";
import auth from "../services/authService";
import Input from "./form/Input";

class Register extends Form {
  state = {
    title: "Register",
    buttonLabel: "Register",
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

  renderBody() {
    return (
      <React.Fragment>
        <Input
          type="text"
          name="email"
          label="Email"
          value={this.state.data.email}
          onChange={this.handleChange}
          placeholder="your.email@gmail.com"
          error={this.state.errors.email}
        />
        <Input
          type="password"
          name="password"
          label="Password"
          value={this.state.data.password}
          onChange={this.handleChange}
          placeholder="*****"
          error={this.state.errors.password}
        />
        <Input
          type="password"
          name="password_confirmation"
          label="Confirm Password"
          value={this.state.data.password_confirmation}
          onChange={this.handleChange}
          placeholder="*****"
          error={this.state.errors.password_confirmation}
        />
      </React.Fragment>
    );
  }
}

export default Register;
