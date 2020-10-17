import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import auth from "../services/authService";
import Navbar from "./navbar/Navbar";
import FightCombat from "./FightCombat";
import FightCreator from "./FightCreator";
import Register from "./Register";
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
            <Route path="/my-toon/:id?" component={ToonEditor} />
            <Route path="/all-toons" component={ToonLister} />
            <Route path="/fight/:id" component={FightCombat} />
            <Route path="/fight" component={FightCreator} />
            <Route path="/register" component={Register} />
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
