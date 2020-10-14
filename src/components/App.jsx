import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import auth from "../services/authService";
import Navbar from "./Navbar";
import Fight from "./Fight";
import Login from "./Login";
import Logout from "./Logout";
import ToonEditor from "./ToonEditor";
import ToonLister from "./ToonLister";

class App extends Component {
  state = {};

  componentDidMount() {
    this.setState({ user: auth.getCurrentUser() });
  }

  render() {
    return (
      <div className="App">
        <ToastContainer />
        <Navbar user={this.state.user} />
        <div className="container">
          <Switch>
            <Route path="/my-toon" component={ToonEditor} />
            <Route path="/all-toons" component={ToonLister} />
            <Route path="/fight" component={Fight} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={ToonLister} />
            <Redirect to="/all-toons" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
