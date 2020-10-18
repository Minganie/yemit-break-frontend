import React, { Component } from "react";
import Input from "./Input";

function Enemy({ index, enemy, error, onChange }) {
  return (
    <div className="columns">
      <div className="column">
        <Input
          type="text"
          name="name"
          label="Name"
          value={enemy.name}
          onChange={(k, v) => {
            onChange(k, v, index);
          }}
          error={error && error.name}
        />
      </div>
      <div className="column">
        <Input
          type="number"
          name="dc"
          value={enemy.dc}
          label="DC"
          onChange={(k, v) => {
            onChange(k, v, index);
          }}
          error={error && error.dc}
        />
      </div>
      <div className="column">
        <Input
          type="number"
          name="ab"
          value={enemy.ab}
          label="AB"
          onChange={(k, v) => {
            onChange(k, v, index);
          }}
          error={error && error.ab}
        />
      </div>
      <div className="column">
        <Input
          type="number"
          name="hp"
          value={enemy.hp}
          label="HP"
          onChange={(k, v) => {
            onChange(k, v, index);
          }}
          error={error && error.hp}
        />
      </div>
    </div>
  );
}

export default Enemy;
