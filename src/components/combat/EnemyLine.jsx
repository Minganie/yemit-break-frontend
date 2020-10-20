import React from "react";

function EnemyLine({ enemy, phase, toons }) {
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
      <div className="column is-2">
        {drawReadySign(phase === "Defense" ? enemy.action : true)}
      </div>
      <div className="column">{enemy.name}</div>
      <div className="column"> {`${enemy.current_hp}/${enemy.hp}`}</div>
    </div>
  );
}

export default EnemyLine;
