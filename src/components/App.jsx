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
        const fights = [...this.state.fights, fight];
        this.setState({ fights });
        toast.info("A DM just added a fight");
      } catch (e) {
        console.error("Unexpected error while parsing created fight data:", e);
      }
    });
    state.stream.addEventListener("fight-delete", (e) => {
      try {
        const { fights, toons } = JSON.parse(e.data);
        this.setState({ fights, allToons: toons });
        toast.info("A DM just concluded a fight");
      } catch (e) {
        console.error("Unexpected error while parsing deleted fight data:", e);
      }
    });
    state.stream.addEventListener("fight-advance", (e) => {
      console.log("Got a fight-advance event");
      try {
        const { fight, toons } = JSON.parse(e.data);
        const fights = [...this.state.fights];
        const i = fights.findIndex((f) => {
          return f._id === fight._id;
        });
        fights[i] = fight;
        const allToons = [...this.state.allToons];
        for (const toon of toons) {
          const i = allToons.findIndex((t) => {
            return t._id === toon._id;
          });
          allToons[i] = toon;
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
      console.log("Got an action-taken event");
      try {
        const action = JSON.parse(e.data);
        const allToons = [...this.state.allToons];
        const fights = [...this.state.fights];
        if (action.toons) {
          for (const toon of action.toons) {
            const i = allToons.findIndex((t) => {
              return t._id === toon._id;
            });
            allToons[i] = toon;
          }
        }
        if (action.fight) {
          const i = fights.findIndex((f) => {
            return f._id === action.fight._id;
          });
          fights[i] = action.fight;
        }
        this.setState({ allToons, fights });
      } catch (e) {
        console.error("Unexpected error while parsing action data:", e);
      }
    });
    state.stream.addEventListener("mob-acted", (e) => {
      console.log("Got a mob-acted event");
      try {
        const action = JSON.parse(e.data);
        const fights = [...this.state.fights];
        if (action.fight) {
          const i = fights.findIndex((f) => {
            return f._id === action.fight._id;
          });
          fights[i] = action.fight;
        }
        this.setState({ fights });
      } catch (e) {
        console.error("Unexpected error while parsing mob action data:", e);
      }
    });
    state.stream.addEventListener("toon-created", (e) => {
      console.log("Got a toon-created event");
      try {
        const { toon } = JSON.parse(e.data);
        const stateSplice = {};
        stateSplice.allToons = [...this.state.allToons, toon];
        if (this.state.user) {
          if (toon.user === this.state.user._id)
            stateSplice.myToons = [...this.state.myToons, toon._id];
        }
        this.setState(stateSplice);
      } catch (e) {
        console.error("Unexpected error while parsing toon created data:", e);
      }
    });
    state.stream.addEventListener("toon-updated", (e) => {
      console.log("Got a toon-updated event");
      try {
        const { toon } = JSON.parse(e.data);
        const allToons = [...this.state.allToons];
        const i = allToons.findIndex((t) => {
          return t._id === toon._id;
        });
        allToons[i] = toon;
        this.setState({ allToons });
      } catch (e) {
        console.error("Unexpected error while parsing toon updated data:", e);
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
          fights={this.state.fights}
          toons={this.state.allToons.filter((toon) => {
            return this.state.myToons.includes(toon._id);
          })}
          stream={this.state.stream}
        />
        <div className="main container">
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
                    user={this.state.user}
                    fights={this.state.fights}
                    toons={this.state.allToons}
                    stream={this.state.stream}
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
