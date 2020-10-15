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
    <div className="card m-2 float-left" style={{ width: "18rem" }}>
      <img
        className="card-img-top"
        src={`images/${gender.toLowerCase()}/${race
          .toLowerCase()
          .replace("'", "")
          .replace(" ", "")}.png`}
        alt="Portrait"
      />
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <ul className="pagination">
          <li className="page-item mx-1">
            <img
              src={`images/trait/${trait.name}.png`}
              title={trait.name}
              alt={trait.name}
            />
          </li>
          <li className="page-item mx-1">
            <img
              src={`images/armor/${armor.name}.png`}
              title={armor.name + " Armor"}
              alt={armor.name + " Armor"}
            />
          </li>
          <li className="page-item mx-1">
            <img
              src={`images/weapon/${main_hand.name}.png`}
              title={`Main hand: ${main_hand.name}`}
              alt={main_hand.name}
            />
          </li>
          {off_hand.name !== "Empty" && (
            <li className="page-item mx-1">
              <img
                src={`images/weapon/${off_hand.name}.png`}
                title={`Off hand: ${off_hand.name}`}
                alt={off_hand.name}
              />
            </li>
          )}
        </ul>
        {Object.keys(stats).map((key) => {
          return (
            <div key={key} className="row my-2">
              <div className="col-6">{key}</div>
              <div className="col-6">{stats[key]}</div>
            </div>
          );
        })}
        <div className="row my-2">
          <div className="col-6">Hp</div>
          <div className="col-6">
            {current_hp}/{hp}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Toon;
