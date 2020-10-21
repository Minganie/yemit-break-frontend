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
import Dictionary from "../Dictionary";

class App extends Component {
  state = {
    stream: null,
    user: null,
    allToons: new Dictionary([]),
    myToons: [],
    fights: new Dictionary([]),
  };

  async componentDidMount() {
    const state = {};
    state.user = auth.getCurrentUser();
    state.fights = new Dictionary(await http.get(config.api + "fights"));
    state.allToons = new Dictionary(await http.get(config.api + "toons"));
    if (state.user) {
      const myToons = await http.get(config.api + "users/me/toons");
      state.myToons = myToons.map((t) => {
        return t._id;
      });
    }
    state.stream = new EventSource(config.api + "events");
    state.stream.onopen = () => {
      console.info("App is listening to server events");
    };
    state.stream.addEventListener("fight-created", (e) => {
      try {
        const { fight } = JSON.parse(e.data);
        const fights = this.state.fights.clone();
        fights.upsert(fight);
        this.setState({ fights });
        toast.info("A DM just added a fight");
      } catch (e) {
        console.error("Unexpected error while parsing created fight data:", e);
      }
    });
    state.stream.addEventListener("fight-advance", (e) => {
      try {
        const { fight, toons } = JSON.parse(e.data);
        const fights = this.state.fights.clone();
        fights.upsert(fight);
        const allToons = this.state.allToons.clone();
        for (const toon of toons) {
          allToons.upsert(toon);
        }
        this.setState({ fights, allToons });
      } catch (e) {
        console.error(
          "Unexpected error while parsing advancing fight data:",
          e
        );
      }
    });
    state.stream.addEventListener("action-taken", (e) => {
      try {
        const action = JSON.parse(e.data);
        const allToons = this.state.allToons.clone();
        const fights = this.state.fights.clone();
        if (action.toons) {
          for (const toon of action.toons) {
            allToons.upsert(toon);
          }
        }
        if (action.fight) {
          fights.upsert(action.fight);
        }
        this.setState({ allToons, fights });
      } catch (e) {
        console.error("Unexpected error while parsing action data:", e);
      }
    });
    state.stream.addEventListener("mob-acted", (e) => {
      console.log("A mob acted");
      try {
        const action = JSON.parse(e.data);
        console.log(action);
        const fights = this.state.fights.clone();
        if (action.fight) {
          fights.upsert(action.fight);
        }
        this.setState({ fights });
      } catch (e) {
        console.error("Unexpected error while parsing mob action data:", e);
      }
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
          fights={this.state.fights.values()}
          toons={this.state.allToons.filter((toon) => {
            return this.state.myToons.includes(toon._id);
          })}
          stream={this.state.stream}
        />
        <div className="container">
          <Switch>
            <Route path="/my-toon/:id?" component={ToonEditor} />
            <Route
              path="/all-toons"
              render={(props) => {
                return (
                  <ToonLister toons={this.state.allToons.values()} {...props} />
                );
              }}
            />
            <Route
              path="/fight/:id"
              render={(props) => {
                return (
                  <FightCombat
                    user={this.state.user}
                    fights={this.state.fights.values()}
                    toons={this.state.allToons.values()}
                    stream={this.state.stream}
                    {...props}
                  />
                );
              }}
            />
            <Route
              path="/fight"
              render={(props) => {
                return (
                  <FightCreator
                    toons={this.state.allToons.values()}
                    {...props}
                  />
                );
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
