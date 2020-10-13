import React from "react";
import "./App.css";

import "./Navbar";
import Navbar from "./Navbar";
import ToonEditor from "./ToonEditor";

function App() {
  return (
    <div className="App">
      <Navbar />
      <ToonEditor />
    </div>
  );
}

export default App;
