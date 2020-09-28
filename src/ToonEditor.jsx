import React from "react";
import "bootstrap/dist/css/bootstrap.css";

function ToonEditor(props) {
  const nameId = "name";
  const physicalId = "physical";
  const magicalId = "magical";
  const leadershipId = "leadership";
  const traitId = "trait";
  const main = "main_hand";
  const off = "off_hand";
  const armor = "armor";
  return (
    <form>
      <div className="form-group my-2">
        <label for={nameId}>Name</label>
        <input
          type="text"
          className="form-control"
          id={nameId}
          name={nameId}
          placeholder="Enter your toon's name"
        />
      </div>
      <div className="form-row my-2">
        <div className="col">
          <label htmlFor={physicalId}>Physical</label>
        </div>
        <div className="col">
          <button type="button" className="btn btn-primary">
            -
          </button>
        </div>
        <div className="col">
          <input
            type="number"
            id={physicalId}
            name={physicalId}
            className="form-control"
            readOnly
          />
        </div>
        <div className="col">
          <button type="button" className="btn btn-primary">
            +
          </button>
        </div>
      </div>
      <div className="form-row my-2">
        <div className="col">
          <label htmlFor={magicalId}>Magical</label>
        </div>
        <div className="col">
          <button type="button" className="btn btn-primary">
            -
          </button>
        </div>
        <div className="col">
          <input
            type="number"
            id={magicalId}
            name={magicalId}
            className="form-control"
            readOnly
          />
        </div>
        <div className="col">
          <button type="button" className="btn btn-primary">
            +
          </button>
        </div>
      </div>
      <div className="form-row my-2">
        <div className="col">
          <label htmlFor={leadershipId}>Leadership</label>
        </div>
        <div className="col">
          <button type="button" className="btn btn-primary">
            -
          </button>
        </div>
        <div className="col">
          <input
            type="number"
            id={leadershipId}
            name={leadershipId}
            className="form-control"
            readOnly
          />
        </div>
        <div className="col">
          <button type="button" className="btn btn-primary">
            +
          </button>
        </div>
      </div>
      <div className="form-group my-2">
        <label for={traitId}>Trait</label>
        <select className="form-control" id={traitId} name={traitId}>
          <option>Resonant</option>
          <option>Glass Canon</option>
        </select>
      </div>
      <div className="form-group my-2">
        <label htmlFor={armor}>Armor</label>
        <select className="form-control" id={armor} name={armor}>
          <option>None</option>
          <option>Light</option>
        </select>
      </div>
      <div className="form-group my-2">
        <label htmlFor={main}>Main Hand</label>
        <select className="form-control" id={main} name={main}>
          <option>Grimoire</option>
          <option>Staff</option>
        </select>
      </div>
      <div className="form-group my-2">
        <label htmlFor={off}>Off Hand</label>
        <select className="form-control" id={off} name={off}>
          <option>Empty</option>
          <option>Unarmed</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        Save
      </button>
    </form>
  );
}

export default ToonEditor;
