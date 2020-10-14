import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";

import Navbar from "./Navbar";
import Fight from "./Fight";
import Login from "./Login";
import ToonEditor from "./ToonEditor";
import ToonLister from "./ToonLister";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/my-toon" component={ToonEditor} />
          <Route path="/all-toons" component={ToonLister} />
          <Route path="/fight" component={Fight} />
          <Route path="/login" component={Login} />
          <Route path="/" exact component={ToonLister} />
          <Redirect to="/all-toons" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
