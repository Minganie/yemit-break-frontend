import React from "react";
import { toast } from "react-toastify";
import Form from "./form/Form";
import Input from "./form/Input";
import * as yup from "yup";
import common from "../yemit-break-common/common.json";
import http from "../services/httpService";
import config from "../config";
import Enemies from "./form/Enemies";
import MultiSelect from "./form/MultiSelect";

class FightCreator extends Form {
  state = {
    title: "Fight",
    buttonLabel: "Create",
    data: {
      name: "",
      toons: [],
      enemies: [{ name: "", dc: 0, ab: 0, hp: 0 }],
    },
    toons: [],
    errors: { name: "", enemies: "", toons: "" },
  };

  schema = yup.object().shape({
    name: yup
      .string()
      .required()
      .matches(
        new RegExp(common.regexes.fight),
        "Can only contain letters, digits, space, parentheses and -_'"
      ),
    toons: yup.array().of(yup.string()).required(),
    enemies: yup
      .array()
      .of(
        yup.object().shape({
          name: yup
            .string()
            .matches(
              new RegExp(common.regexes.toon),
              "Can only contain letters, digits or the characters -_' and must be 3 to 50 characters long"
            )
            .required(),
          dc: yup.number().positive().integer().required(),
          ab: yup.number().positive().integer().required(),
          hp: yup.number().positive().integer().required(),
        })
      )
      .required(),
  });

  async componentDidMount() {
    try {
      const toons = await http.get(config.api + "toons");
      this.setState({ toons });
    } catch (e) {
      console.error(
        "Unexpected error while fetching toon list in fight creator",
        e
      );
    }
  }

  async doSubmit() {
    const fight = await http.post(config.api + "fights", this.state.data);
    toast.success("Fight created!");
    this.props.history.replace("/fight/" + fight._id);
  }

  renderBody() {
    const { data: fight, errors } = this.state;
    /*type, name, value, onChange, options, error*/
    return (
      <React.Fragment>
        <Input
          type="text"
          name="name"
          value={fight.title}
          onChange={this.handleChange}
          error={errors.name}
        />
        <MultiSelect
          name="toons"
          options={{ label: "Participating toons" }}
          value={fight.toons}
          list={this.state.toons}
          onChange={this.handleChange}
          error={errors.toons}
        />
        <div style={{ height: "10rem" }} />
        <Enemies
          onChange={this.handleChange}
          enemies={fight.enemies}
          errors={errors.enemies}
        />
      </React.Fragment>
    );
  }
}

export default FightCreator;
