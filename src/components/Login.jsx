import React from "react";
import * as yup from "yup";
import auth from "../services/authService";
import common from "../yemit-break-common/common.json";
import Form from "./Form";

class Login extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: { email: "", password: "" },
  };

  schema = yup.object().shape({
    email: yup.string().email().required().label("Email"),
    password: yup
      .string()
      .matches(
        new RegExp(common.regexes.password),
        "Password must be between 5 and 25 characters"
      )
      .label("Password"),
  });

  async doSubmit() {
    if (Object.keys(this.state.errors).length === 0) {
      const logged = await auth.login(
        this.state.data.email,
        this.state.data.password
      );
      if (logged) window.location = "/";
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Login</h1>
        {this.renderInput("text", "email", {
          placeholder: "your.email@gmail.com",
        })}
        {this.renderInput("password", "password", { placeholder: "*****" })}
        {this.renderButton("Login")}
      </form>
    );
  }
}

export default Login;
