import React from "react";
import * as yup from "yup";
import "bootstrap/dist/css/bootstrap.css";
import common from "../yemit-break-common/common.json";
import Form from "./Form";
import ButtonedNumber from "./ButtonedNumber";
import httpService from "../services/httpService";
import config from "../config";
import Select from "./Select";

class ToonEditor extends Form {
  state = {
    data: {
      name: "",
      physical: 0,
      magical: 0,
      leadership: 0,
      trait: "",
      armor: "",
      main_hand: "",
      off_hand: "",
    },
    errors: {
      name: "",
    },
    traits: [],
    armors: [],
    weapons: [],
  };

  schema = yup.object().shape({
    name: yup
      .string()
      .matches(
        new RegExp(common.regexes.toon),
        "Toon name must only contain letters, digits, or -_' and must be 3 to 50 characters long"
      )
      .required(),
    physical: yup.number().integer().required().min(0).max(4),
    magical: yup.number().integer().required().min(0).max(4),
    leadership: yup.number().integer().required().min(0).max(4),
    trait: yup.string().required(),
    armor: yup.string().required(),
    main_hand: yup.string().required(),
    off_hand: yup.string().required(),
  });

  async componentDidMount() {
    try {
      this.setState({ traits: await httpService.get(config.api + "traits") });
      this.setState({ armors: await httpService.get(config.api + "armors") });
      this.setState({ weapons: await httpService.get(config.api + "weapons") });
    } catch (e) {
      console.error(
        "Unexpected error occurred while trying to fetch Traits, Armors and Weapons in the Toon Editor",
        e
      );
    }
  }

  async doSubmit() {
    if (Object.keys(this.state.errors).length === 0) {
      console.log("submitting...");
    }
  }

  handleDecrement = async ({ currentTarget: btn }) => {
    const state = { ...this.state };
    state.data[btn.name] = state.data[btn.name] - 1;
    const errorMessage = await this.validateProperty(
      btn.name,
      state.data[btn.name]
    );
    if (errorMessage) state.errors[btn.name] = errorMessage;
    else delete state.errors[btn.name];
    this.setState(state);
  };

  handleIncrement = async ({ currentTarget: btn }) => {
    const state = { ...this.state };
    state.data[btn.name] = state.data[btn.name] + 1;
    const errorMessage = await this.validateProperty(
      btn.name,
      state.data[btn.name]
    );
    if (errorMessage) state.errors[btn.name] = errorMessage;
    else delete state.errors[btn.name];
    this.setState(state);
  };

  render() {
    const { physical, magical, leadership } = this.state.data;
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInput("text", "name", {
          placeholder: "Zename Ofzetoon...",
        })}
        <div className="form-row my-2">
          <div className="col-6">
            <div
              className={`text-center alert ${
                physical + magical + leadership === 6
                  ? "alert-success"
                  : "alert-danger"
              }`}
            >
              {`Attributes: ${physical + magical + leadership}/6`}
            </div>
          </div>
        </div>
        <ButtonedNumber
          id="physical"
          value={physical}
          label="Physical"
          onDecrement={this.handleDecrement}
          onIncrement={this.handleIncrement}
          max={physical + magical + leadership}
        />
        <ButtonedNumber
          id="magical"
          value={magical}
          label="Magical"
          onDecrement={this.handleDecrement}
          onIncrement={this.handleIncrement}
          max={physical + magical + leadership}
        />
        <ButtonedNumber
          id="leadership"
          value={leadership}
          label="Leadership"
          onDecrement={this.handleDecrement}
          onIncrement={this.handleIncrement}
          max={physical + magical + leadership}
        />
        <Select
          id="trait"
          label="Trait"
          value={this.state.data.trait}
          options={this.state.traits}
          onChange={this.handleChange}
        />
        <Select
          id="armor"
          label="Armor"
          value={this.state.data.armor}
          options={this.state.armors}
          onChange={this.handleChange}
        />
        <Select
          id="main_hand"
          label="Main Hand"
          value={this.state.data.main_hand}
          options={this.state.weapons}
          onChange={this.handleChange}
        />
        <Select
          id="off_hand"
          label="Off Hand"
          value={this.state.data.off_hand}
          options={this.state.weapons}
          onChange={this.handleChange}
        />
        {this.renderButton("Save")}
      </form>
    );
  }
}

export default ToonEditor;
