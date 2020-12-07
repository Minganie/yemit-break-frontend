import React from "react";
import ToonList from "./ToonList";
import EnemyList from "./EnemyList";

function StatusPane(props) {
  const { fight, user } = props;
  const { toonObjects: toons, enemies, attacks } = fight;
  return (
    <div className="columns">
      <div className="column has-background-success-light">
        <ToonList toons={toons} phase={fight.phase} attacks={attacks} />
      </div>
      <div className="column has-background-danger-light">
        <EnemyList
          enemies={enemies}
          toons={toons}
          phase={fight.phase}
          attacks={attacks}
          user={user}
        />
      </div>
    </div>
  );
}

export default StatusPane;
