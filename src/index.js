import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "bulma/css/bulma.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";

String.prototype.capitalize = function () {
  return this[0].toUpperCase() + this.slice(1);
};

Array.prototype.sortWithFunction = function (smallerThan, ascending) {
  let needSwapping;
  if (ascending && ascending === "ascending") {
    needSwapping = (a, b) => {
      return !smallerThan(a, b);
    };
  } else {
    needSwapping = (a, b) => {
      return smallerThan(a, b);
    };
  }
  for (let i = 0; i < this.length - 1; i++) {
    for (let j = 0; j < this.length - 1 - i; j++) {
      if (needSwapping(this[j], this[j + 1])) {
        const tmp = this[j];
        this[j] = this[j + 1];
        this[j + 1] = tmp;
      }
    }
  }
  return this;
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
