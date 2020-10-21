import React, { useEffect, useState } from "react";
import CombatLog from "./combat/CombatLog";
import ToonList from "./combat/ToonList";
import EnemyList from "./combat/EnemyList";
import http from "../services/httpService";
import config from "../config";
import { toast } from "react-toastify";

function FightCombat({ stream, match, fights, toons: propToons, user }) {
  const [advancing, setAdvancing] = useState(false);
  const [listening, setListening] = useState(false);
  const fight = fights.find((f) => f._id === match.params.id) || {};

  useEffect(() => {
    if (!listening && stream) {
      setListening(true);
      stream.addEventListener("fight-advance", (e) => {
        try {
          const { fight: response } = JSON.parse(e.data);
          if (fight._id === response._id)
            toast.info(`Now on Round#${response.round} - ${response.phase}`);
        } catch (e) {
          console.error(
            "Unexpected error while parsing advancing fight data:",
            e
          );
        }
      });
    }
  });

  const advanceFight = async () => {
    setAdvancing(true);
    const fight = fights.find((f) => f._id === match.params.id) || {};
    try {
      const response = await http.post(config.api + `fights/${fight._id}/next`);
      setAdvancing(false);
    } catch (e) {
      toast.error("Oh noes! Can't advance to next phase! Bug Mel on Discord!");
      console.error("Unexpected error while advancing phases:", e);
    }
  };

  const { toons: fightToonIds, enemies, round, phase, name } = fight;
  let toons = [];
  let toonIds = fightToonIds || [];
  if (propToons) toons = propToons.filter((t) => toonIds.includes(t._id));

  return (
    <React.Fragment>
      <div className="columns mt-1">
        <div className="column is-three-quarters">
          <h1 className="title is-1">{name}</h1>
          <h2 className="title">{`Round ${round} - ${phase}`}</h2>
        </div>
        <div className="column">
          {user && user.permissions.includes("DM") && (
            <button
              type="button"
              onClick={advanceFight}
              className={`button is-danger ${advancing ? "is-loading" : ""}`}
              disabled={advancing}
            >
              Next phase
            </button>
          )}
        </div>
      </div>

      <div className="columns">
        <div className="column has-background-success-light">
          <ToonList toons={toons} phase={phase} />
        </div>
        <div className="column has-background-danger-light">
          <EnemyList
            enemies={enemies}
            toons={toons}
            phase={phase}
            attacks={fight.attacks}
          />
        </div>
      </div>
      <div>Here's the actions</div>
      <CombatLog stream={stream} />
    </React.Fragment>
  );
}

export default FightCombat;
