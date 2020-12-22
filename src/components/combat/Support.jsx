import React from "react";
import SupportToon from "./SupportToon";
import config from "../../config";
import http from "../../services/httpService";

function Support({ fight, myToons }) {
  const toons = fight.toonObjects || [];

  const handleSubmit = async (data) => {
    let url = config.api + "fights/" + fight._id + "/support/";
    switch (data.name) {
      case "Cover":
        url += "cover";
        break;
      case "Inspire Offense":
        url += "inspire";
        break;
      case "Inspire Guard":
        url += "guard";
        break;
      case "Harry":
        url += "harry";
        break;
      case "Pass":
        url += "pass";
        break;
      case "Parry":
      default:
        url += "parry";
        break;
    }
    try {
      await http.post(url, data);
    } catch (e) {
      throw e;
    }
  };

  return (
    <React.Fragment>
      {myToons.map((toon) => {
        return (
          <SupportToon
            key={toon._id}
            toons={toons}
            myToon={toon}
            onSubmit={handleSubmit}
          />
        );
      })}
    </React.Fragment>
  );
}

export default Support;
