import React, { Component } from "react";
import ToonCard from "./ToonCard";

function ToonLister({ toons }) {
  return (
    <React.Fragment>
      {toons.map((toon) => {
        return <ToonCard key={toon._id} {...toon} />;
      })}
    </React.Fragment>
  );
}

export default ToonLister;
