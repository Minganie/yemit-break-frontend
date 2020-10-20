import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
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
import config from "../config";
import http from "../services/httpService";

class App extends Component {
  state = {
    stream: null,
    user: null,
    allToons: [],
    myToons: [],
    fights: [],
  };

  async componentDidMount() {
    const state = {};
    state.user = auth.getCurrentUser();
    state.fights = await http.get(config.api + "fights");
    state.allToons = await http.get(config.api + "toons");
    if (state.user) {
      state.myToons = await http.get(config.api + "users/me/toons");
    }
    state.stream = new EventSource(config.api + "events");
    state.stream.onopen = () => {
      console.info("App is listening to server events");
    };
    state.stream.addEventListener("fight-created", async (e) => {
      const fights = await http.get(config.api + "fights");
      this.setState({ fights });
    });
    this.setState(state);
  }

  componentWillUnmount() {
    if (this.state.stream) this.state.stream.close();
  }

  render() {
    return (
      <div className="App">
        <ToastContainer />
        <Navbar
          user={this.state.user}
          fights={this.state.fights}
          toons={this.state.myToons}
          stream={this.state.stream}
        />
        <div className="container">
          <Switch>
            <Route path="/my-toon/:id?" component={ToonEditor} />
            <Route
              path="/all-toons"
              render={(props) => {
                return <ToonLister toons={this.state.allToons} {...props} />;
              }}
            />
            <Route
              path="/fight/:id"
              render={(props) => {
                return (
                  <FightCombat
                    fights={this.state.fights}
                    toons={this.state.allToons}
                    {...props}
                  />
                );
              }}
            />
            <Route
              path="/fight"
              render={(props) => {
                return <FightCreator toons={this.state.allToons} {...props} />;
              }}
            />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Redirect to="/all-toons" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
