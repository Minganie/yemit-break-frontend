import React from "react";
import Statuses from "./Statuses";

function ToonLine({ toon, phase, toons, attacks }) {
  const { armor, main_hand, off_hand, trait } = toon;
  const hp = 40 + armor.hp + main_hand.hp + off_hand.hp + trait.hp;
  let ready = false;
  const myAttacks = attacks
    ? attacks.filter((a) => {
        return a.to === toon._id;
      })
    : null;
  switch (phase) {
    case "Support":
      ready = toon.quickAction !== null;
      break;
    case "Action":
      ready = toon.action !== null;
      break;
    case "Defense":
      ready = myAttacks === null || myAttacks.length === 0;
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
    <div className="columns is-multiline my-3">
      <div className="column is-2 py-0">{drawReadySign(ready)}</div>
      <div className="column is-8 py-0">{toon.name}</div>
      <div className="column is-2 py-0">{`${toon.current_hp}/${hp}`}</div>
      <div className="column is-10 is-offset-2 py-0">
        <Statuses toons={toons} statuses={toon.statuses} attacks={myAttacks} />
      </div>
    </div>
  );
}

export default ToonLine;
