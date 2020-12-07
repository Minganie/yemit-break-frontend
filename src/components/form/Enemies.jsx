import React from "react";
import Enemy from "./Enemy";

function Enemies({ enemies, onChange, errors }) {
  const regex = /^\[(\d+)\]\.(\w+)\s(.+)$/;
  const match = errors && errors.match(regex);
  const errorIndex = parseInt(match && match[1], 10);
  const key = match && match[2];
  const msg = match && match[3];

  const zip = enemies.map((enemy, index) => {
    const error = errorIndex === index ? { [key]: msg } : null;
    return { enemy, error, index };
  });

  const handleChange = (key, value, index) => {
    const clone = [...enemies];
    clone[index][key] = value;
    onChange("enemies", clone);
  };

  const addEnemy = () => {
    const clone = [...enemies];
    clone.push({ name: "", dc: 0, ab: 0, hp: 1 });
    onChange("enemies", clone);
  };

  const removeEnemy = (index) => {
    const clone = [...enemies];
    clone.splice(index, 1);
    onChange("enemies", clone);
  };

  return (
    <React.Fragment>
      {zip.map((zipped) => {
        const { index, enemy, error } = zipped;
        return (
          <Enemy
            key={index}
            index={index}
            enemy={enemy}
            error={error}
            onChange={handleChange}
            onRemove={removeEnemy}
          />
        );
      })}
      <div className="field">
        <button type="button" className="button is-primary" onClick={addEnemy}>
          Add an enemy
        </button>
      </div>
    </React.Fragment>
  );
}

export default Enemies;
