import React from "react";
import ToonLine from "./ToonLine";

function ToonList({ toons, phase, attacks }) {
  toons = toons || [];
  return (
    <React.Fragment>
      <h3 className="title is-3">Us</h3>
      {toons.map((toon) => {
        return (
          <ToonLine
            key={toon._id}
            toon={toon}
            phase={phase}
            toons={toons}
            attacks={attacks}
          />
        );
      })}
    </React.Fragment>
  );
}

export default ToonList;
