import React from "react";
import EnemyLine from "./EnemyLine";

function EnemyList({ enemies, phase, toons, attacks }) {
  enemies = enemies || [];
  attacks = attacks ? [...attacks] : [];
  toons = toons || [];
  for (const attack of attacks) {
    const toon = toons.find((t) => {
      return (t._id = attack.to);
    });
    attack.to = toon.name;
  }
  return (
    <React.Fragment>
      <h3 className="title is-3">Them</h3>
      {enemies.map((enemy) => {
        return (
          <EnemyLine
            key={enemy._id}
            enemy={enemy}
            phase={phase}
            attacks={attacks.filter((a) => {
              return a.from === enemy._id;
            })}
          />
        );
      })}
    </React.Fragment>
  );
}

export default EnemyList;
