import React, { Component } from "react";
import * as yup from "yup";
import common from "../yemit-break-common/common.json";
import Form from "./form/Form";
import ButtonedNumber from "./form/ButtonedNumber";
import httpService from "../services/httpService";
import config from "../config";
import Select from "./form/Select";
import ToonCard from "./ToonCard";
import WeaponSelector from "./form/WeaponSelector";
import Input from "./form/Input";
import { toast } from "react-toastify";

class ToonEditor extends Form {
  state = {
    title: "",
    buttonLabel: "Save",
    data: {
      _id: "",
      name: "",
      gender: "",
      race: "",
      physical: 0,
      magical: 0,
      leadership: 0,
      trait: "",
      armor: "",
      main_hand: "",
      off_hand: "",
      current_hp: 40,
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
        "ToonCard name must only contain letters, digits, or -_' and must be 3 to 50 characters long"
      )
      .required(),
    gender: yup.string().required(),
    race: yup.string().required(),
    physical: yup.number().integer().required().min(0).max(4),
    magical: yup.number().integer().required().min(0).max(4),
    leadership: yup.number().integer().required().min(0).max(4),
    trait: yup.string().required(),
    armor: yup.string().required(),
    main_hand: yup.string().required(),
    off_hand: yup.string().required(),
  });

  genders = [
    { _id: "Male", value: "Male", name: "Male" },
    { _id: "Female", value: "Female", name: "Female" },
  ];
  races = [
    {
      _id: "Miqo'te",
      value: "Miqo'te",
      name: "Miqo'te",
    },
    {
      _id: "Hyur",
      value: "Hyur",
      name: "Hyur",
    },
    {
      _id: "Roegadyn",
      value: "Roegadyn",
      name: "Roegadyn",
    },
    {
      _id: "Elezen",
      value: "Elezen",
      name: "Elezen",
    },
    {
      _id: "Au Ra",
      value: "Au Ra",
      name: "Au Ra",
    },
    {
      _id: "Viera",
      value: "Viera",
      name: "Viera",
    },
    {
      _id: "Hrothgar",
      value: "Hrothgar",
      name: "Hrothgar",
    },
  ];

  getStateReadyToon(toon) {
    return {
      _id: toon._id,
      is_new: false,
      name: toon.name,
      gender: toon.gender,
      race: toon.race,
      physical: toon.physical,
      magical: toon.magical,
      leadership: toon.leadership,
      trait: toon.trait._id,
      armor: toon.armor._id,
      main_hand: toon.main_hand._id,
      off_hand: toon.off_hand._id,
      current_hp: toon.current_hp,
    };
  }

  async fetchToon() {
    if (this.props.match.params.id) {
      const toon = await httpService.get(
        config.api + "toons/" + this.props.match.params.id
      );
      return this.getStateReadyToon(toon);
    } else {
      return Promise.resolve({
        _id: "",
        is_new: true,
        name: "",
        gender: "Female",
        race: "Miqo'te",
        physical: 0,
        magical: 0,
        leadership: 0,
        trait: this.state.traits.find((t) => t.name === "Balanced")._id,
        armor: this.state.armors.find((a) => a.name === "None")._id,
        main_hand: this.state.weapons.find((w) => w.name === "Unarmed")._id,
        off_hand: this.state.weapons.find((w) => w.name === "Unarmed")._id,
        current_hp: 40,
      });
    }
  }

  async componentDidMount() {
    try {
      const state = {};
      state.traits = await httpService.get(config.api + "traits");
      state.armors = await httpService.get(config.api + "armors");
      state.weapons = await httpService.get(config.api + "weapons");
      this.setState(state);
      this.setState({ data: await this.fetchToon(), errors: {} });
    } catch (e) {
      console.error(
        "Unexpected error occurred while trying to fetch Traits, Armors and Weapons in the Toon Editor",
        e
      );
    }
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.setState({ data: await this.fetchToon() });
    }
  }

  async doSubmit() {
    const { data: toon } = this.state;
    try {
      if (toon.is_new) {
        const resp = await httpService.post(`${config.api}toons/`, toon);
        this.setState({ data: this.getStateReadyToon(resp) });
        if (resp) toast.success("Created!");
      } else {
        const resp = await httpService.put(
          `${config.api}toons/${toon._id}`,
          toon
        );
        this.setState({ data: this.getStateReadyToon(resp) });
        if (resp) toast.success("Saved!");
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const {
      _id,
      name,
      gender,
      race,
      physical,
      magical,
      leadership,
      trait: traitId,
      armor: armorId,
      main_hand: mhId,
      off_hand: ohId,
      current_hp,
    } = this.state.data;
    const wholeTrait = this.state.traits.find((t) => {
      if (traitId) {
        return t._id === traitId;
      } else return t.name === "Balanced";
    });
    const wholeArmor = this.state.armors.find((a) => {
      if (armorId) {
        return a._id === armorId;
      } else return a.name === "None";
    });
    const mainHand = this.state.weapons.find((w) => {
      if (mhId) {
        return w._id === mhId;
      } else return w.name === "Empty";
    });
    const offHand = this.state.weapons.find((w) => {
      if (ohId) {
        return w._id === ohId;
      } else return w.name === "Empty";
    });
    return (
      <div className="columns is-vcentered">
        <div className="column">{Form.prototype.render.call(this)}</div>
        <div className="column">
          {mainHand && (
            <ToonCard
              _id={_id}
              name={name}
              gender={gender}
              race={race}
              physical={physical}
              magical={magical}
              leadership={leadership}
              trait={wholeTrait}
              armor={wholeArmor}
              main_hand={mainHand}
              off_hand={offHand}
              current_hp={current_hp}
            />
          )}
        </div>
      </div>
    );
  }

  renderBody() {
    const { physical, magical, leadership } = this.state.data;
    return (
      <React.Fragment>
        <Input
          type="text"
          name="name"
          label="Name"
          value={this.state.data.name}
          onChange={this.handleChange}
          placeholder="Zename Ofzetoon..."
          error={this.state.errors.name}
        />
        <Select
          id="gender"
          label="Gender"
          value={this.state.data.gender}
          options={this.genders}
          onChange={this.handleChange}
        />
        <Select
          id="race"
          label="Species"
          value={this.state.data.race}
          options={this.races}
          onChange={this.handleChange}
        />
        <div className="field">
          <label className="label">Attributes</label>
          <div className="control">
            <input
              className={`input ${
                physical + magical + leadership === 6
                  ? "is-success"
                  : "is-danger"
              }`}
              value={`${physical + magical + leadership}/6`}
              disabled={true}
              readOnly={true}
            />
          </div>
          {physical + magical + leadership < 6 && (
            <p className="help is-danger">You have unused attribute points!</p>
          )}
        </div>
        <ButtonedNumber
          id="physical"
          value={physical}
          label="Physical"
          onChange={this.handleChange}
          max={physical + magical + leadership}
        />
        <ButtonedNumber
          id="magical"
          value={magical}
          label="Magical"
          onChange={this.handleChange}
          max={physical + magical + leadership}
        />
        <ButtonedNumber
          id="leadership"
          value={leadership}
          label="Leadership"
          onChange={this.handleChange}
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
          constraint={(a) => {
            return a.physical <= this.state.data.physical;
          }}
          constraintMessage={(a) => {
            return `Physical of ${a.physical} required to wear this`;
          }}
        />
        <WeaponSelector
          mainHand={this.state.data.main_hand}
          offHand={this.state.data.off_hand}
          weapons={this.state.weapons}
          onChange={this.handleChange}
        />
      </React.Fragment>
    );
  }
}

export default ToonEditor;
