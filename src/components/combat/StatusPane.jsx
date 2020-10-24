import React from "react";
import ToonList from "./ToonList";
import EnemyList from "./EnemyList";

function StatusPane(props) {
  return (
    <div className="columns">
      <div className="column has-background-success-light">
        <ToonList toons={props.toons} phase={props.phase} />
      </div>
      <div className="column has-background-danger-light">
        <EnemyList
          enemies={props.enemies}
          toons={props.toons}
          phase={props.phase}
          attacks={props.fight.attacks}
          user={props.user}
        />
      </div>
    </div>
  );
}

export default StatusPane;
