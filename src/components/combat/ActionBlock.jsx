import React from "react";
import Support from "./Support";

function ActionBlock({ phase, toons, user, fight }) {
  const myToons = (toons || []).filter((toon) => {
    return toon.user === user._id;
  });
  switch (phase) {
    case "Support":
      return <Support toons={toons} myToons={myToons} fight={fight} />;
    case "Action":
      return <div>Here there be offenses</div>;
    case "Defense":
    default:
      return <div>Here there be defenses</div>;
  }
}

export default ActionBlock;
