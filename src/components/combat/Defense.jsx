import React from "react";
import DefenseToon from "./DefenseToon";
import DefenseEnemy from "./DefenseEnemy";
import config from "../../config";
import http from "../../services/httpService";

function Defense({ fight, myToons, user }) {
  const toons = fight.toonObjects || [];
  const myToonIds = myToons.map((toon) => {
    return toon._id;
  });
  const myAttacks =
    fight && fight.attacks
      ? fight.attacks.filter((attack) => {
          return myToonIds.includes(attack.to);
        })
      : [];
  const isADm = user && user.permissions && user.permissions.includes("DM");

  const handleSubmit = async (data) => {
    let url = config.api + "fights/" + fight._id + "/defense/";
    switch (data.name) {
      case "Mob Attack":
        url += "mob-attack";
        break;
      case "Tank Buster":
        url += "mob-tank-buster";
        break;
      default:
        url += "resolve";
        break;
    }
    try {
      console.log("Posting", data, "to", url);
      await http.post(url, data);
    } catch (e) {
      console.error("Unexpected error while posting mob action:", e);
    }
  };

  return (
    <React.Fragment>
      {myAttacks.map((attack) => {
        return (
          <DefenseToon
            key={attack._id}
            attack={attack}
            onSubmit={handleSubmit}
          />
        );
      })}
      {isADm &&
        fight &&
        fight.enemies &&
        fight.enemies.map((enemy) => {
          return (
            <DefenseEnemy
              key={enemy._id}
              enemy={enemy}
              toons={toons}
              onSubmit={handleSubmit}
            />
          );
        })}
    </React.Fragment>
  );
}

export default Defense;
