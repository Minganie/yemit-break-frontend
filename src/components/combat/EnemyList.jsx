import React from "react";
import EnemyLine from "./EnemyLine";

function EnemyList({ enemies, phase, attacks, user }) {
  enemies = enemies || [];
  attacks = attacks || [];

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
            isDm={user && user.permissions && user.permissions.includes("DM")}
          />
        );
      })}
    </React.Fragment>
  );
}

export default EnemyList;
