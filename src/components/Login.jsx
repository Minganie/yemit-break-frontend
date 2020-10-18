import React from "react";
import * as yup from "yup";
import auth from "../services/authService";
import common from "../yemit-break-common/common.json";
import Form from "./form/Form";
import Input from "./form/Input";

class Login extends Form {
  state = {
    title: "Login",
    buttonLabel: "Login",
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
    const logged = await auth.login(
      this.state.data.email,
      this.state.data.password
    );
    if (logged) window.location = "/";
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
      </React.Fragment>
    );
  }
}

export default Login;
