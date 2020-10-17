import React from "react";

function Toon({
  _id,
  name,
  gender,
  race,
  physical,
  magical,
  leadership,
  trait,
  armor,
  main_hand,
  off_hand,
  current_hp,
}) {
  const stats = {
    Smashing:
      physical * 100 + main_hand.smashing + off_hand.smashing + trait.smashing,
    Dodging:
      physical * 100 +
      armor.dodging +
      main_hand.dodging +
      off_hand.dodging +
      trait.smashing,
    Entropy:
      magical * 100 + main_hand.entropy + off_hand.entropy + trait.smashing,
    Harmony:
      magical * 100 + main_hand.harmony + off_hand.harmony + trait.smashing,
    Moxie:
      leadership * 100 + main_hand.harmony + off_hand.harmony + trait.smashing,
    Wit: leadership * 100 + trait.smashing,
  };
  const hp = 40 + armor.hp + main_hand.hp + off_hand.hp;
  return (
    <div className="card m-2" style={{ width: "18rem", float: "left" }}>
      <div className="card-image">
        <figure className="image">
          <img
            src={`images/${gender.toLowerCase()}/${race
              .toLowerCase()
              .replace("'", "")
              .replace(" ", "")}.png`}
            alt={`Portrait of ${name}`}
          />
        </figure>
      </div>
      <h1 className="card-header-title">{name}</h1>
      <div className="card-content">
        <div className="level">
          <div className="level-left">
            <img
              className="level-item"
              src={`images/trait/${trait.name}.png`}
              title={trait.name}
              alt={trait.name}
            />
            <img
              className="level-item"
              src={`images/armor/${armor.name}.png`}
              title={armor.name + " Armor"}
              alt={armor.name + " Armor"}
            />
            <img
              className="level-item"
              src={`images/weapon/${main_hand.name}.png`}
              title={`Main hand: ${main_hand.name}`}
              alt={main_hand.name}
            />
            {off_hand.name !== "Empty" && (
              <img
                className="level-item"
                src={`images/weapon/${off_hand.name}.png`}
                title={`Off hand: ${off_hand.name}`}
                alt={off_hand.name}
              />
            )}
          </div>
        </div>
        {Object.keys(stats).map((key) => {
          return (
            <div key={key} className="columns is-mobile">
              <div className="column my-1 py-0">{key}</div>
              <div className="column my-1 py-0">{stats[key]}</div>
            </div>
          );
        })}
        <div className="columns is-mobile">
          <div className="column">Hp</div>
          <div className="column">
            {current_hp}/{hp}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Toon;
