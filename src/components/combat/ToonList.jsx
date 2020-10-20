import React from "react";
import ToonLine from "./ToonLine";

function ToonList({ toons, phase }) {
  toons = toons || [];
  return (
    <React.Fragment>
      <h3 className="title is-3">Us</h3>
      {toons.map((toon) => {
        return (
          <ToonLine key={toon._id} toon={toon} phase={phase} toons={toons} />
        );
      })}
    </React.Fragment>
  );
}

export default ToonList;
