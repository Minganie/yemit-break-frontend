import React, { useEffect, useState } from "react";
import ActionBlock from "./combat/ActionBlock";
import CombatLog from "./combat/CombatLog";
import StatusPane from "./combat/StatusPane";
import TitleBlock from "./combat/TitleBlock";
import http from "../services/httpService";
import config from "../config";
import { toast } from "react-toastify";

function FightCombat({
  stream,
  match,
  fights,
  toons: allToons,
  user,
  history,
}) {
  const [advancing, setAdvancing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [listening, setListening] = useState(false);
  const fight = fights.find((f) => f._id === match.params.id) || {};
  // console.log(fight);

  useEffect(() => {
    if (!listening && stream) {
      setListening(true);
      stream.addEventListener("fight-advance", (e) => {
        try {
          const { fight: response } = JSON.parse(e.data);
          if (fight._id === response._id) {
            toast.info(`Now on Round#${response.round} - ${response.phase}`);
            const audio = new Audio(config.base + "bongos.ogg");
            audio.type = "audio/ogg";
            audio.play();
          }
        } catch (e) {
          console.error(
            "Unexpected error while parsing advancing fight data:",
            e
          );
        }
      });
      stream.addEventListener("fight-delete", (e) => {
        try {
          const { deleted } = JSON.parse(e.data);
          if (deleted === match.params.id) {
            toast.warn(
              "A DM just concluded this fight. You have been automatically redirected."
            );
            history.replace("/");
          }
        } catch (e) {
          console.error(
            "Unexpected error while parsing deleted fight data:",
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

  const deleteFight = async () => {
    if (window.confirm("Delete this fight?")) {
      setDeleting(true);
      const fight = fights.find((f) => f._id === match.params.id) || {};
      try {
        const response = await http.post(
          config.api + `fights/${fight._id}/delete`
        );
        history.replace("/");
      } catch (e) {
        toast.error("Oh noes! Can't delete the fight! Bug Mel on Discord!");
        console.error("Unexpected error while deleting fight:", e);
      }
    } else {
      console.log("do nothing");
    }
  };

  const { toons: fightToonIds, enemies, round, phase, name } = fight;
  let toons = [];
  let toonIds = fightToonIds || [];
  if (allToons) toons = allToons.filter((t) => toonIds.includes(t._id));
  fight.toonObjects = toons;
  if (fight && fight.attacks) {
    for (const attack of fight.attacks) {
      const toon = toons.find((t) => {
        return t._id === attack.to;
      });
      const enemy = enemies.find((e) => {
        return e._id === attack.from;
      });
      attack.toon = toon;
      attack.enemy = enemy;
    }
  }

  return (
    <React.Fragment>
      <TitleBlock
        name={name}
        round={round}
        phase={phase}
        user={user}
        onAdvance={advanceFight}
        onDelete={deleteFight}
        advancing={advancing}
        deleting={deleting}
      />
      <StatusPane fight={fight} user={user} />
      {<ActionBlock user={user} fight={fight} />}
      {<CombatLog stream={stream} />}
    </React.Fragment>
  );
}

export default FightCombat;
