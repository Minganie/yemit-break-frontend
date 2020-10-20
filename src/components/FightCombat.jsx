import React, { Component } from "react";
import ToonList from "./combat/ToonList";
import EnemyList from "./combat/EnemyList";

class FightCombat extends Component {
  render() {
    const fight =
      this.props.fights.find((f) => f._id === this.props.match.params.id) || {};
    const { toons: toonIds, enemies, round, phase, name } = fight;
    let toons = [];
    if (this.props.toons)
      toons = this.props.toons.filter((t) => toonIds.includes(t._id));
    return (
      <React.Fragment>
        <div className="columns">
          <div className="column is-three-quarters">
            <h1 className="title is-1">{name}</h1>
            <h2 className="title">{`Phase ${phase} - Round ${round}`}</h2>
          </div>
          <div className="column">
            <button type="button" className="button is-danger">
              Next phase
            </button>
          </div>
        </div>

        <div className="columns">
          <div className="column has-background-success-light">
            <ToonList toons={toons} phase={phase} />
          </div>
          <div className="column has-background-danger-light">
            <EnemyList enemies={enemies} />
          </div>
        </div>
        <div>Here's the actions</div>
        <div>Here's the log</div>
      </React.Fragment>
    );
  }
}

export default FightCombat;
