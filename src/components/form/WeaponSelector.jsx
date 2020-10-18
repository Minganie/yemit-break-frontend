import React from "react";
import Select from "./Select";

function WeaponSelector({ mainHand, offHand, weapons, onChange }) {
  const wholeMainHand = weapons.find((w) => w._id === mainHand);
  const wholeOffHand = weapons.find((w) => w._id === offHand);

  const empty = weapons.find((w) => w.name === "Empty");

  const offHandFilter = (w) => {
    if (wholeMainHand && wholeMainHand.hands === 2) return w.name === "Empty";
    else return w.hands < 2 && w.name !== "Empty";
  };

  const handleChange = (key, value) => {
    onChange(key, value);
    if (key === "main_hand") {
      const wholeMainHand = weapons.find((w) => w._id === value);
      if (wholeMainHand.hands === 2) onChange("off_hand", empty._id);
    }
  };

  return (
    <React.Fragment>
      {wholeMainHand && (
        <div className="field">
          <label className="label">Weapons</label>
          <div className="control">
            <input
              className={`input ${
                wholeMainHand.hands + wholeOffHand.hands === 2
                  ? "is-success"
                  : "is-danger"
              }`}
              value={`${wholeMainHand.hands + wholeOffHand.hands}/2`}
              disabled={true}
              readOnly={true}
            />
          </div>
          {mainHand.hands + offHand.hands < 2 && (
            <p className="help is-danger">You have unused hands!</p>
          )}
        </div>
      )}
      <Select
        id="main_hand"
        label="Main Hand"
        value={wholeMainHand && wholeMainHand._id}
        options={weapons.filter((w) => w.name !== "Empty")}
        onChange={handleChange}
      />
      <Select
        id="off_hand"
        label="Off Hand"
        value={wholeOffHand && wholeOffHand._id}
        options={weapons.filter(offHandFilter)}
        onChange={handleChange}
        disabled={wholeMainHand && wholeMainHand.hands === 2}
      />
    </React.Fragment>
  );
}

export default WeaponSelector;
