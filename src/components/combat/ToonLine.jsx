import React from "react";
import Statuses from "./Statuses";

function ToonLine({ toon, phase, toons }) {
  const { armor, main_hand, off_hand, trait } = toon;
  const hp = 40 + armor.hp + main_hand.hp + off_hand.hp + trait.hp;
  let ready = false;
  switch (phase) {
    case "Support":
      ready = toon.quickAction !== null;
      break;
    case "Action":
      ready = toon.action !== null;
      break;
    case "Defense":
      ready = false;
  }
  const drawReadySign = (ready) => {
    if (ready)
      return (
        <span className="icon is-small is-left" style={{ color: "green" }}>
          <i className="fas fa-check" />
        </span>
      );
    else
      return (
        <span className="icon is-small is-left" style={{ color: "red" }}>
          <i className="fas fa-exclamation" />
        </span>
      );
  };
  return (
    <div className="columns">
      <div className="column is-2">{drawReadySign(ready)}</div>
      <div className="column">
        {toon.name}
        <Statuses toons={toons} statuses={toon.statuses} />
      </div>
      <div className="column"> {`${toon.current_hp}/${hp}`}</div>
    </div>
  );
}

export default ToonLine;
