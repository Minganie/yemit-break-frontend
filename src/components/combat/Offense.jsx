import React from "react";
import OffenseToon from "./OffenseToon";
import config from "../../config";
import http from "../../services/httpService";

function Offense({ toons, fight, myToons }) {
  toons = toons || [];

  const handleSubmit = async (data) => {
    let url = config.api + "fights/" + fight._id + "/offense/";
    switch (data.name) {
      case "Attack":
        url += "attack";
        break;
      case "Heal":
        url += "heal";
        break;
      case "Precise Attack":
        url += "precise";
        break;
      default:
        url += "pass";
        break;
    }
    try {
      await http.post(url, data);
    } catch (e) {
      console.error("Unexpected error while posting toon action:", e);
    }
  };

  return (
    <React.Fragment>
      {myToons.map((toon) => {
        return (
          <OffenseToon
            toons={toons}
            myToon={toon}
            enemies={fight && fight.enemies}
            onSubmit={handleSubmit}
          />
        );
      })}
    </React.Fragment>
  );
}

export default Offense;
