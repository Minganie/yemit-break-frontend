import React from "react";

function Attacks({ attacks }) {
  return (
    <React.Fragment>
      {attacks.map((attack) => {
        return (
          <p
            key={attack._id}
          >{`[${attack.roll}+${attack.bonus}] to ${attack.toon.name}`}</p>
        );
      })}
    </React.Fragment>
  );
}

export default Attacks;
