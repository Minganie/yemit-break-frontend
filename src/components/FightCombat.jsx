import React, { useEffect, useState } from "react";
import ActionBlock from "./combat/ActionBlock";
import CombatLog from "./combat/CombatLog";
import StatusPane from "./combat/StatusPane";
import TitleBlock from "./combat/TitleBlock";
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
      <TitleBlock
        name={name}
        round={round}
        phase={phase}
        user={user}
        onClick={advanceFight}
        advancing={advancing}
      />
      <StatusPane
        toons={toons}
        phase={phase}
        enemies={enemies}
        fight={fight}
        user={user}
      />
      <ActionBlock phase={phase} toons={toons} user={user} fight={fight} />
      <CombatLog stream={stream} />
    </React.Fragment>
  );
}

export default FightCombat;
