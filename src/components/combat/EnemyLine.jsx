import React from "react";

import Attacks from "./Attacks";

function EnemyLine({ enemy, phase, attacks, isDm }) {
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
      <div className="column is-2 py-0">
        {drawReadySign(phase === "Defense" ? enemy.action : true)}
      </div>
      <div className="column is-8 py-0">{enemy.name}</div>
      {isDm && (
        <div className="column is-2 py-0">{`${enemy.current_hp}/${enemy.hp}`}</div>
      )}
      <div className="column is-10 is-offset-2 py-0">
        <Attacks attacks={attacks} />
      </div>
    </div>
  );
}

export default EnemyLine;
