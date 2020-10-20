import React from "react";
import EnemyLine from "./EnemyLine";

function EnemyList({ enemies, phase, toons }) {
  enemies = enemies || [];
  return (
    <React.Fragment>
      <h3 className="title is-3">Them</h3>
      {enemies.map((enemy) => {
        return (
          <EnemyLine
            key={enemy._id}
            enemy={enemy}
            phase={phase}
            toons={toons}
          />
        );
      })}
    </React.Fragment>
  );
}

export default EnemyList;
