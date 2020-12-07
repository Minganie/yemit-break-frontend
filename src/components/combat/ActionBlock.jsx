import React from "react";
import Support from "./Support";
import Offense from "./Offense";
import Defense from "./Defense";

function ActionBlock({ user, fight }) {
  const myToons = (fight.toonObjects || []).filter((toon) => {
    return user ? toon.user === user._id : false;
  });
  switch (fight.phase) {
    case "Support":
      return <Support myToons={myToons} fight={fight} />;
    case "Action":
      return <Offense myToons={myToons} fight={fight} />;
    case "Defense":
    default:
      return <Defense user={user} myToons={myToons} fight={fight} />;
  }
}

export default ActionBlock;
