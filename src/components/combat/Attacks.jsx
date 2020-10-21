import React from "react";

function Attacks({ attacks }) {
  console.log(attacks);
  return (
    <React.Fragment>
      {attacks.map((attack) => {
        return (
          <p
            key={attack._id}
          >{`[${attack.roll}+${attack.bonus}] to ${attack.to}`}</p>
        );
      })}
    </React.Fragment>
  );
}

export default Attacks;
