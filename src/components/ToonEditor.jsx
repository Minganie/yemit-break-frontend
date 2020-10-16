import React from "react";
import * as yup from "yup";
import "bootstrap/dist/css/bootstrap.css";
import Form from "./Form";
import ButtonedNumber from "./ButtonedNumber";

class ToonEditor extends Form {
  state = {
    data: {},
    errors: {},
  };

  schema = yup.object().shape({});

  async doSubmit() {
    if (Object.keys(this.state.errors).length === 0) {
      console.log("submitting...");
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInput("text", "name", {
          placeholder: "Zename Ofzetoon...",
        })}
        <ButtonedNumber id="physical" label="Physical" />
        <ButtonedNumber id="magical" label="Magical" />
        <ButtonedNumber id="leadership" label="Leadership" />
        <div className="form-group my-2">
          <label htmlFor="trait">Trait</label>
          <select className="form-control" id="trait" name="trait">
            <option>Resonant</option>
            <option>Glass Canon</option>
          </select>
        </div>
        <div className="form-group my-2">
          <label htmlFor="armor">Armor</label>
          <select className="form-control" id="armor" name="armor">
            <option>None</option>
            <option>Light</option>
          </select>
        </div>
        <div className="form-group my-2">
          <label htmlFor="main">Main Hand</label>
          <select className="form-control" id="main" name="main">
            <option>Grimoire</option>
            <option>Staff</option>
          </select>
        </div>
        <div className="form-group my-2">
          <label htmlFor="off">Off Hand</label>
          <select className="form-control" id="off" name="off">
            <option>Empty</option>
            <option>Unarmed</option>
          </select>
        </div>
        {this.renderButton("Save")}
      </form>
    );
  }
}

export default ToonEditor;
